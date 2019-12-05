
function login(){
    var email = document.getElementById("loginEmail").value
    var password = document.getElementById("loginPassword").value
    console.log("login clicked" + email + password)
}

function register(){
    var email = document.getElementById("registerEmail").value
    var password = document.getElementById("registerPassword").value
    var jsonData = JSON.stringify({
        "uName": "placeholderName",
        "uEmail": email,
        "uPassword": password
    })
    //console.log(jsonData)
    //console.log("register clicked" + email + password)
    $.ajax({
        method: 'POST',
        url :"https://b1m6q7fwp8.execute-api.us-east-2.amazonaws.com/default/Cloud-Migration-v1-Registration-POST",
        //url: "http://ec2-3-17-26-49.us-east-2.compute.amazonaws.com:5000/api/v1/cloud/users/register",
        headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        data: jsonData,
        success: function(response){
            console.log("worked")
        }
    })
}

function login(){
    var email = document.getElementById("loginEmail").value
    var password = document.getElementById("loginPassword").value
    var jsonData = JSON.stringify({
        "uEmail": email,
        "uPassword": password
    })
    $.ajax({
        method: 'POST',
        url: "https://b1m6q7fwp8.execute-api.us-east-2.amazonaws.com/default/Cloud-Migration-v2-Login-POST",
        //url: "http://ec2-3-17-26-49.us-east-2.compute.amazonaws.com:5000/api/v1/cloud/users/login",
        headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        data: jsonData,
        success: function(response){
            console.log(response)
            window.location="ipInput.html"
        }
    })
}

function redirectToApplication(){
    window.location="ipInput.html"
}