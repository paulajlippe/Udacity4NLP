// import dotenv 
// import requests
// dotenv.load_dotenv()

const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.API_KEY;
console.log(`Your API key is ${process.env.API_KEY}`);
// const apiKey = 'ddf5d7129fe1371886821fd5f0bcd335';

if (process.env.NODE_ENV === 'production') {
    console.log('Welcome to production');
  }
  if (process.env.DEBUG) {
    console.log('Debugging output');
  }
  
let meaningData = {};

var path = require('path');
const express = require('express');
const cors = require('cors');
const fetch = require("node-fetch");
const mockResponse = require('./config.js');
const { request } = require('express');
const bodyParser = require('body-parser');

// START
const app = express();

// MIDDLEWARE
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

// SERVER
const port = 3000;
const server = app.listen(port, listening);
function listening(){
    console.log(`Server is running on localhost: ${port}`);
}
 
// GET ROUTE
app.get('/', function (req, res) {
    res.sendInput('dist/index.html')
})

// GET DATA
app.get("/results", function (req, res) {
    res.send(meaningData);
    });

// POST ROUTE
app.post('/postResults', postResults);
async function postResults (req, res){
    const input = req.body.input;
    console.log(input)
    const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?';
    const lang = 'en';
    const url = await fetch(`${baseURL}&key=${apiKey}&url=${input}&lang=${lang}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/JSON",
            }
        }).then((meaningData) => {
            return meaningData.json();
        }).then((meaningData) => {
            console.log(meaningData);
            res.send({
                agreement: meaningData.agreement,
                confidence: meaningData.confidence,
                irony: meaningData.irony,
                subjectivity: meaningData.subjectivity,
                score_tag: meaningData.score_tag
            })
        });
}

// GET ROUTE FOR API_KEYS
app.get('/key', getKey);
function getKey(req, res){
  let KEY = {
      "apiKey": apiKey,
  }
  res.send(KEY);
}
