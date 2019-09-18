var cities = document.getElementsByClassName('meteodescription');
console.log(cities);




var mymap = L.map('worldmap', 
      {
       center: [48.866667, 2.333333],
       zoom: 4
      }
      );

for (let i = 0; i < cities.length; i++) {
var lon = cities[i].dataset.lon
var lat = cities[i].dataset.lat
var name = cities[i].dataset.name 
    L.marker([lat, lon]).addTo(mymap).bindPopup(name);

}


      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);




// mymap.on('click', function onMapClick(e) {

//     if (e.latlng) {
//         L.marker(e.latlng).addTo(mymap);

//     }

//     console.log('===> LEVENEMENT MARCHE', e.latlng);
    
// });

