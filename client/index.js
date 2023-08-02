
function onload(){
var areas;
var settings = {
    "url": "http://localhost:3000/area",
    "method": "GET",
    "timeout": 0,
    "headers": {
        //צריך לעשות דינאמי
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0NTEyIiwiZW1haWwiOiJ0aXJ0emFzaEBnbWFpbDIuY29tIiwiaWF0IjoxNjkwNzkwMDEwLCJleHAiOjE2OTA3OTcyMTB9.OcHZszM1u2_nh3MIaJ7TjHeBgu9a5Fy3qdGUVtce1lw",
        "Content-Type": "application/json"
      },
    
  };
  
  $.ajax(settings).done(function (response) {
    //console.log(response);
    var area=JSON.parse(response);
    //console.log(area);
    var x = document.getElementById("areas");
    let k;

    
      
    area.forEach(element => {
      let option = document.createElement("option");
    option.text = element.name;
    //console.log(k["name"]);
    x.add(option);
    });
  });
}