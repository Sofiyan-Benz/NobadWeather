var express = require("express");
var router = express.Router();
var request = require("request");

var cityModel = require("../models/city");
var userModel = require("../models/user");

/* GET new home login page. */
router.get("/", function (req, res, next) {
    console.log("==> la page login est ok ");

    req.session.user = null;
    res.render("login");
});

/* GET cities page (ex home page) */
router.get("/cities", function (req, res, next) {
    if (!req.session.user) {
        res.redirect("/");
    } else {
        console.log("CITIES HERE");
        // Here, I do not want to get my data from a variable cityList but from my database. Therefore, I need to use find(), which will return my data.
        cityModel.find(function (err, citiesFromDataBase) {
            console.log(citiesFromDataBase);
            res.render("index", {
                cityList: citiesFromDataBase,
                user: req.session.user,
            });
        });
    }
});

/* POST add-city page. */
router.post("/add-city", function (req, res, next) {
    console.log("CITY ADDED : --->", req.body.addedCityFromFront);
    // We are using the ES6 new concatenation syntax. You could use the ES5 method as well --> "string"+variable+"string"
    request(
        `http://api.openweathermap.org/data/2.5/weather?q=${req.body.addedCityFromFront}&appid=fc07f13e149c30c7f3bc9c87c606a95f&units=metric&lang=fr`,
        function (error, response, body) {
            body = JSON.parse(body);
            console.log("STEP 1 | HERE IS THE BODY ---> ", body);
            // 1) Regarding citymodel, here, I want to pre-save by creating a new model in a variable called newCity
            var newCity = new cityModel({
                name: body.name,
                desc: body.weather[0].description,
                img: `http://openweathermap.org/img/w/${body.weather[0].icon}.png`,
                temp_min: body.main.temp_min,
                temp_max: body.main.temp_max,
                lon: body.coord.lon,
                lat: body.coord.lat,
            });
            // 2) Now, I can officially save my new variable newCity (which contains the data I want to save) in my database
            newCity.save(function (error, city) {
                console.log("STEP 2 | CITY SAVED ---> ", city);
                // 3) Once the city is saved, and the script is completed, I want to ask my database to give me all the cities (it will return "citiesFromDataBase" as I defined it). To do so, I can use find()
                cityModel.find(function (err, citiesFromDataBase) {
                    console.log(
                        "STEP 3 | CITIES FOUND IN DB ---> ",
                        citiesFromDataBase
                    );
                    res.render("index", {
                        cityList: citiesFromDataBase,
                        user: req.session.user,
                    });
                });
            });
        }
    );
});

router.post("/add-city", function (req, res, next) {
    console.log("CITY ADDED : --->", req.body.addedCityFromFront);
    // We are using the ES6 new concatenation syntax. You could use the ES5 method as well --> "string"+variable+"string"
    request(
        `http://api.openweathermap.org/data/2.5/weather?q=${req.body.addedCityFromFront}&appid=fc07f13e149c30c7f3bc9c87c606a95f&units=metric&lang=fr`,
        function (error, response, body) {
            body = JSON.parse(body);
            if (body.cod == "404" || body.cod == "400") {
                console.log("STEP 1 | HERE IS THE BODY ERROR --->", body);
                cityModel.find(function (err, citiesFromDataBase) {
                    console.log(
                        "STEP 2 | CITIES FOUND IN DB ---> ",
                        citiesFromDataBase
                    );
                    res.render("index", {
                        cityList: citiesFromDataBase,
                        user: req.session.user,
                    });
                });
            } else {
                console.log("STEP 1 | HERE IS THE BODY ---> ", body);
                var newCity = new cityModel({
                    name: body.name,
                    desc: body.weather[0].description,
                    img: `http://openweathermap.org/img/w/${body.weather[0].icon}.png`,
                    temp_min: body.main.temp_min,
                    temp_max: body.main.temp_max,
                });
                newCity.save(function (error, city) {
                    console.log("STEP 2 | CITY SAVED ---> ", city);
                    // 3) Once the city is saved, and the script is completed, I want to ask my database to give me all the cities (it will return "citiesFromDataBase" as I defined it). To do so, I can use find()
                    cityModel.find(function (err, citiesFromDataBase) {
                        console.log(
                            "STEP 3 | CITIES FOUND IN DB ---> ",
                            citiesFromDataBase
                        );
                        res.render("index", {
                            cityList: citiesFromDataBase,
                            user: req.session.user,
                        });
                    });
                });
            }
        }
    );
});

/* GET delete page. */
router.get("/delete-city", function (req, res, next) {
    console.log("STEP 4 | CITY DELETED ID ---> ", req.query.id);
    cityModel.deleteOne({ _id: req.query.id }, function (error) {
        console.log("STEP 5 | CITY SUCCESSFULLY DELETED");
        cityModel.find(function (err, citiesFromDataBase) {
            res.render("index", {
                cityList: citiesFromDataBase,
                user: req.session.user,
            });
        });
    });
});

module.exports = router;
