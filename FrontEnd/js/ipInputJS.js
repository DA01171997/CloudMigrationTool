function print(){
    var keyString = document.getElementById("leftKey").value
    var modifiedString = ""
    for (var i = 0; i < keyString.length; i++){
        if(keyString[i] == " "){
           modifiedString += "."
        }
        else {
            modifiedString += keyString[i]
        }
    }    
}

function testConnect(){
    var payload = JSON.stringify({"test":"jasonsuck"})
    $.ajax({
        method: 'POST',
        url: "http://3.17.26.49:5000/api/v1/cloud/jsonSuckTest",
        headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        data: payload,
        success: function(response){
            console.log(response);
        }
    })
}

function next(){
    if(document.getElementById("leftIP").value != "" && 
        document.getElementById("leftUser").value != "" && 
        document.getElementById("leftKey").value != "" && 
        document.getElementById("rightIP").value != "" && 
        document.getElementById("rightUser").value != "" && 
        document.getElementById("rightKey").value != ""){
        var keyLString = document.getElementById("leftKey").value
        var modifiedLString = ""
        for (var i = 0; i < keyLString.length; i++){
            if(keyLString[i] == " "){
            modifiedLString += "."
            }
            else {
                modifiedLString += keyLString[i]
            }
        }
        var keyRString = document.getElementById("rightKey").value
        var modifiedRString = ""
        for (var i = 0; i < keyRString.length; i++){
            if(keyRString[i] == " "){
            modifiedRString += "."
            }
            else {
                modifiedRString += keyRString[i]
            }
        }
        localStorage.setItem('ipL', document.getElementById("leftIP").value)
        localStorage.setItem('userL', document.getElementById("leftUser").value)
        localStorage.setItem('keyL', modifiedLString)
        localStorage.setItem('ipR', document.getElementById("rightIP").value)
        localStorage.setItem('userR', document.getElementById("rightUser").value)
        localStorage.setItem('keyR', modifiedRString)
        window.location.replace("/application.html")
    }
}

function test_next(){
    console.log("entered test inputs")
    document.getElementById("leftIP").value = "ip here"
    document.getElementById("leftUser").value = "user here"
    document.getElementById("leftKey").value = "private key here"
    document.getElementById("rightIP").value = "ip here"
    document.getElementById("rightUser").value = "user here"
    document.getElementById("rightKey").value = "private key here"
}