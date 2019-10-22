
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
        url: "http://ec2-18-216-87-92.us-east-2.compute.amazonaws.com:5000/api/v1/cloud/users/register",
        headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        data: jsonData,
        success: function(response){
            console.log("worked2")
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
        url: "http://ec2-18-216-87-92.us-east-2.compute.amazonaws.com:5000/api/v1/cloud/users/login",
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

function redirectToApplication(){
    window.location.replace("/application.html");
}