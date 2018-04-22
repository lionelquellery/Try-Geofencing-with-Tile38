const redis = require("redis");
const client = redis.createClient(9851, "localhost");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const db = require('./db.js');
const pharma = require('./schema.js').pharma;



//Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.use(morgan('combined'));

// pharma.find({}, (err, data_all) => {
//   if (err) return console.error(err);
//   console.log(data_all);
// });


// ENDPOINT that is receiving the live position of my smartphone
app.post('/liveposition', (req, res) =>  {
  console.log(req.body.IdUser);
    
client.send_command(
    "SET", ["fleet", JSON.stringify(req.body.IdUser), "POINT", JSON.stringify(req.body.Lat), JSON.stringify(req.body.Long)],
    function(err, reply){
        if (err){
            // ERROR
        }else{
            console.log(reply)
            // OK
        }
    }
)
res.json({ a: "ok" });

});

// retrieve all pharmacie from database
// - Keep coordinate and bind that in tile server
// - SETHOOK warehouse http:///endpoint NEARBY fleet FENCE POINT 33.5123 -112.2693 500



app.get('/allpharma', (req,res)=>{

  pharma.find({},'', (err, data_all) => {
   if (err) return console.error(err);
   res.json(data_all);

   console.log(data_all[0].fields.lat);


   for (let i = 0; i < data_all.length; i++) {

     function removeSpaces(string) {
       return string.split(' ').join('');
      }

      let name = removeSpaces(data_all[i].fields.rs)


     client.send_command(
       "SETHOOK", [name, "http:///endpoints", "NEARBY", "fleet", "FENCE", "POINT", data_all[i].fields.lat, data_all[i].fields.lng,"500"],
       function(err, reply){
         if (err){
           // ERROR
         }else{
           console.log(reply)
           // {"type":"Point","coordinates":[-115,33]}!
         }
       }
     )


  }
 });
});


app.get('/pharma', (req,res)=>{
     pharma.find({},'', (err, data_all) => {
      if (err) return console.error(err);
      res.json(data_all);
       })
  });





app.get('/lionel', (req, res) => {

    client.send_command(
    "GET", ["fleet", "truck1"],
    function(err, reply){
      if (err){
        // ERROR
      }else{
        console.log(reply)
        // {"type":"Point","coordinates":[-115,33]}
      }
    }
  )
});



app.post('/endpoints', (req, res) => {
   
    console.log(req.body);

  });





app.get('/', (req, res) => res.send('Hello World!'));
  
app.listen(3000, () => console.log('server run on port 3000!'));

    
