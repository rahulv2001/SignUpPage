// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { options } = require("request");
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname+"/signup.html");
})

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    // const url = "https://<dc>.api.mailchimp.com/3.0/lists/79eccfb0a7";
    const url = "https://us20.api.mailchimp.com/3.0/lists/79eccfb0a7";
    const options = {
        method: "POST",
        auth: "rahul2:a4c5278afdc4cbe83046615984cf8e38-us20"
    }
    const request = https.request(url, options, function(response){
        // console.log(response.statusCode);
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});

app.post("/failure",function(req, res){
    res.redirect("/");
});
app.post("/success",function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000.");
});


// Api key
// a4c5278afdc4cbe83046615984cf8e38-us20(new)
//6a2ceddf777de5f72626190ceebae3ac-us20

// List id
//79eccfb0a7
