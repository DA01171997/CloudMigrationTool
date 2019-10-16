
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
	    "uUsername": "jkldjlk",
        "uPassword": password
    }
    console.log("register clicked" + email + password)
    $.ajax({
        method: 'POST',
        url: "http://localhost:5000/api/v1/cloud/users/register",
        headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        data: { jsonData },
        success: function(response){
            console.log("worked")
        }
    })
    // const url = 'http://localhost:5000/api/v1/cloud/users/register';
    // const data = {
    //     "uName": "placeholderName",
    //     "uEmail": "hihihi",
	//     "uUsername": "jkldjlk",
    //     "uPassword": "password"
    // };

    // try {
    // const response = await fetch(url, {
    //     method: 'POST', // or 'PUT'
    //     body: JSON.stringify(data), // data can be `string` or {object}!
    //     headers: {
    //     'Access-Control-Allow-Origin': '*'
    //     }
    // });
    // const json = await response.json();
    // console.log('Success:', JSON.stringify(json));
    // } catch (error) {
    // console.error('Error:', error);
    // }
    // var xhr = new XMLHttpRequest();
    // var url = "http://localhost:5000/api/v1/cloud/users/register";
    // xhr.open("POST", url, true);
    // xhr.setRequestHeader("Content-Type", "application/json", "Access-Control-Allow-Origin: *");
    // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4 && xhr.status === 200) {
    //         var json = JSON.parse(xhr.responseText);
    //         console.log(json.email + ", " + json.password);
    //     }
    // };
    // var data = JSON.stringify({"uName": "jason@mail.com", "uPassword": "101010", "uEmail": "js@342343243gmail.com", "uUsername": "js5959595"});
    // xhr.send(data);
}
