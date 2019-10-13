
function login(){
    var email = document.getElementById("loginEmail").value
    var password = document.getElementById("loginPassword").value
    console.log("login clicked" + email + password)
    
}

function register(){
    var email = document.getElementById("registerEmail").value
    var password = document.getElementById("registerPassword").value
    var jsonData = {
        "uName": "placeholderName",
        "uEmail": email,
        "uPassword": password
    }
    console.log("register clicked" + email + password)
    $.ajax({
        method: 'POST',
        url: "http://127.0.0.1:5000/api/v1/cloud/users/register",
        //url: "/py/users.py",
        data: { jsonData },
        success: function(response){
            console.log(worked)
        }
    })
}
