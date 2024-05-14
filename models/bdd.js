// Do not forget to store your new request module in a variable in order to use it
const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURL");

var user = "capsule";
var password = "azerty1";
var port = 24778;
var bddname = "weatherapp";

// useNewUrlParser
var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
};

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            dbName: "ClusterS",
            useNewUrlParser: true,
        });
        console.log("MongoDB Connected");
    } catch (err) {
        console.log(err.message);
        //Exit Process with failure
        process.exit(1);
    }
};

// mongoose.connect('mongodb+srv://dev:soflabs2024@cluster0.csqunwz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
// function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('connexion ok');
//   }
//  }
// )

module.exports = connectDB;
