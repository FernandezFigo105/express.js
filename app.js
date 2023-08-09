
const {response} = require('express');
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser')
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+ "/index.html");

});
app.post('/', (req, res) => {
    const query=req.body.cityName;
    const apiKey='7492dd3d00c4d0c964ef9cd7c0e6762'
    const url='https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+apiKey+'e&units=metric'
    https.get(url,(response)=>{
        // console.log(response.statusCode);
        response.on('data',(data) =>{
            // console.log(data);
            const weatherData=JSON.parse(data);
            const description=weatherData.weather[0].description;
            // console.log(description);
            const temp=weatherData.main.temp;
            res.write("<h1>The temperature in "+query+" is "+temp+" degree celcius</h1>")
            res.write("<h1>The condition of the weather is "+description+"</h1>")
            res.send();      
        })
    })
    // res.send("this is for checking our server")
    // res.send("The city name is received" + cityName);
})

app.listen(8000,()=> console.log("our server is running at port 8000"))