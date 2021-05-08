// Import express module
const express = require('express');
// Create an object
const app = express();
// import path module 
const path = require('path');
// import novelcovid
const api = require('novelcovid');
const PORT = process.env.PORT || 5000;
require('dotenv').config();
 
api.settings({
    baseUrl: 'https://disease.sh'
})

// To set the views
app.set('views', path.join(__dirname,'views'))
app.set('view engine','ejs');

// Set them as static
app.use(express.static('public'));


app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/searchCountry",(req,res)=>{

    let searchedCountry = req.query.countries;
    api.countries({country:searchedCountry}).then((data)=>{
        // console.log(data);
        if(data.hasOwnProperty("message")){
            // res.render('error',{error_message:data.message})
        } else {
            res.render('results',{result_data:data, image_url:data.countryInfo.flag});
        }
    }) 
})


// Starts the server
// Listening on port 3000
app.listen(PORT,()=>{
    console.log(`Listening on PORT 3000`)
})

// stop server -> ctrl+c
// install package called as nodemon.