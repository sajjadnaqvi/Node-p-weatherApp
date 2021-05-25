const http = require("http");
const fs = require("fs");

// it is for routing with npm 'requests' package
var requests = require("requests");

const homeFile = fs.readFileSync("index.html","utf-8");

function replaceVal(temVal,oriVal){
    let temperature = temVal.replace("{%tempval%}",oriVal.main.temp);
    temperature = temperature.replace("{%tempmin%}",oriVal.main.temp_min); 
    temperature = temperature.replace("{%tempmax%}",oriVal.main.temp_max); 
    temperature = temperature.replace("{%location%}",oriVal.name); 
    temperature = temperature.replace("{%country%}",oriVal.sys.country); 
    return temperature;

}
const server = http.createServer((req, res)=>{
    if(req.url=="/")
    {
        requests("http://api.openweathermap.org/data/2.5/weather?q=chakwal&appid=1978d366fe5e5557e64d0cedf805db6d")
          .on('data', (chunk) =>{
              const objData = JSON.parse(chunk);
              const arrData = [objData];
           
          const realTimeData = arrData.map((val)=>{
              
             return replaceVal(homeFile,val);
          }).join(""); // this join("") convert the array to string
          console.log("running2");
          //console.log(realTimeData);
          res.write(realTimeData);
        })
        .on('end', (err)=> {
             if (err) return console.log('connection closed due to errors', err);
             res.end();
            console.log('end');
        });
    }
});

//server.listen(8000,"127.1.0.0");
server.listen(8000, "127.0.1.1",()=>{
    console.log("listening from port 8000");
});