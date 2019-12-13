
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
    console.log(jsonData)
    $.ajax({
        method: 'POST',
        url :"https://b1m6q7fwp8.execute-api.us-east-2.amazonaws.com/default/Cloud-Migration-v1-Registration-POST",
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
    console.log(jsonData)
    $.ajax({
        method: 'POST',
        url: "https://b1m6q7fwp8.execute-api.us-east-2.amazonaws.com/default/Cloud-Migration-v2-Login-POST",
        headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        data: jsonData,
        success: function(response){
            console.log(response)
            if(response['statusCode'] == "200"){
                console.log("good")
                window.location="ipInput.html"
            }
            else {
                console.log("no good")
            }
        }
    })
}

function redirectToApplication(){
    window.location="ipInput.html"
}