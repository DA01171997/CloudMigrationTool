var currentlyClickedTargetString
var currentlyClickedTarget

var currentlyClickedDestinationString
var currentlyClickedDestination

var targetIsOnLeft
var destinationIsOnLeft

window.onload = function(){
    this.requestCrawl("AWSList", true);
    this.requestCrawl("GoogleList", false);
    document.getElementById("leftIP").innerHTML = this.localStorage.getItem('ipL')
    document.getElementById("rightIP").innerHTML = this.localStorage.getItem('ipR')

}

function requestCrawl(targetList, isLeftSide){
    var dir;
    var toUrl
    if(isLeftSide){
        dir = "/home/" + this.localStorage.getItem('userL') +"/Desktop/"
        toUrl = "http://" + this.localStorage.getItem('ipL') + ":5001/api/v1/cloud/employee/crawl"
    }
    else{
        dir = "/home/" + this.localStorage.getItem('userR') +"/Desktop/"
        toUrl = "http://" + this.localStorage.getItem('ipR') + ":5001/api/v1/cloud/employee/crawl"
    }
    console.log(dir)
    console.log(toUrl)
    var initialCrawl = JSON.stringify({
        "url": toUrl, //remove this to send to employee directly
        "path": dir
    });
    console.log(initialCrawl)
    $.ajax({
        method: 'POST',
        url: "https://46hnjj9jia.execute-api.us-east-2.amazonaws.com/default/CrawlerAPI",
        //url: toUrl, //use this to send to employee directly
        headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        data: initialCrawl,
        success: function(response){
            console.log(response);
            startDirectory(response, dir, targetList, toUrl, isLeftSide);
        }
    })
}

function startDirectory(jsonData, dir, targetList, toUrl, isLeftSide){ //starts at /home/ubuntu/Desktop
    //DO INITIAL CRAWL
    
    console.log(jsonData);
    dt = jsonData;
    for(var i = 0; i < dt.length; i++){
        console.log(dt[i][2]);
        if(dt[i][2] == 1){
            var list = document.getElementById(targetList);
            var ul = document.createElement("li");
            ul.style.listStyle = "none";
            ul.style.fontSize = "15px";
            var expandButton = document.createElement("button");
            expandButton.innerHTML = "+ " + dir + dt[i][0] + '/';
            expandButton.style.fontSize = "15px";
            expandButton.style.background = "#c7c4c4";
            expandButton.style.fontFamily = "Optima";
            expandButton.style.background = "#c7c4c4";
            expandButton.style.border = "none";
            expandButton.style.marginBottom = "0px";
            expandButton.style.paddingLeft = "0px";
            var targetToTransferCheck = document.createElement("INPUT");
            targetToTransferCheck.setAttribute("type", "checkbox");
            targetToTransferCheck.addEventListener("click", this.updateHold.bind(null, this, dir + dt[i][0] + '/', isLeftSide), false);
            targetToTransferCheck.style.float = "right";
            var targetDestinationCheck = document.createElement("INPUT");
            targetDestinationCheck.setAttribute("type", "checkbox");
            targetDestinationCheck.addEventListener("click", this.updateDestination.bind(null, this, dir + dt[i][0] + "/", isLeftSide), false);
            targetDestinationCheck.style.float = "right";
            expandButton.addEventListener("click", this.ajExpand.bind(null, this, ul, 0, (dir + dt[i][0] + '/'), toUrl, isLeftSide,false));
            ul.appendChild(expandButton);
            ul.appendChild(targetToTransferCheck);
            ul.appendChild(targetDestinationCheck);
            ul.style.paddingLeft = "10px";
            list.appendChild(ul);
        }
        else {
            var list = document.getElementById(targetList);
            createChildFile(this, dt[i], list, 0);
        }
    }
}

function ajExpand(evt, list, pad, crawlTarget, toUrl, isLeftSide){
    var dir = JSON.stringify({
        "url": toUrl, //remove this to send to employee directly
        "path":crawlTarget
    });
    console.log(dir)
    $.ajax({
        method: 'POST',
        url: "https://46hnjj9jia.execute-api.us-east-2.amazonaws.com/default/CrawlerAPI",
        //url: toUrl,  //use this to send to employee directly
        headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        data: dir,
        success: function(response){
            console.log(response);

            expandDirectory(evt, list, pad, response, crawlTarget, toUrl, isLeftSide);
        }
    })
}
var expandDirectory = function(evt, list, pad,response, dir, toUrl, isLeftSide){
    if(list.childElementCount == 3){ //directory not expanded
        //console.log(evt.currentTarget)
        //event.currentTarget.innerHTML = "-";
        dt = response;
        for(var i = 0; i < dt.length; i++){
            if(dt[i][2] == 1){
                createChildDirectory(this, dt[i], list, pad, dir, toUrl, isLeftSide);
            }
            else {
                createChildFile(this, dt[i], list, pad, dir, isLeftSide);
            }
        }
    } else { //directory already expanded, remove children
        event.currentTarget.innerHTML = "+";
        while(list.firstChild.nextSibling.nextSibling.nextSibling){
            list.removeChild(list.firstChild.nextSibling.nextSibling.nextSibling);
        }
    }
}

function createChildDirectory(evt, dt, list, pad, dir, toUrl, isLeftSide){
    var li = document.createElement("li");
    li.style.listStyle = "none";
    li.style.fontSize = "15px";
    li.style.paddingTop = "0px";
    li.style.paddingBottom = "0px";
    var expandButton = document.createElement("button");
    expandButton.innerHTML = "+ " + dt[0] + '/';
    expandButton.style.fontSize = "15px";
    expandButton.style.background = "#c7c4c4";
    expandButton.style.fontFamily = "Optima";
    expandButton.style.border = "none";
    expandButton.style.marginBottom = "0px";
    expandButton.style.paddingLeft = (pad + 10) +"px"; //cascading indentation
    expandButton.addEventListener("click", this.ajExpand.bind(null, this, li, pad + 10, (dir + dt[0] + '/'), toUrl, isLeftSide, false));
    var targetToTransferCheck = document.createElement("INPUT");
    targetToTransferCheck.setAttribute("type", "checkbox");
    targetToTransferCheck.style.float = "right";
    targetToTransferCheck.addEventListener("click", this.updateHold.bind(null, this, dir + dt[0] + "/", isLeftSide), false);
    var targetDestinationCheck = document.createElement("INPUT");
    targetDestinationCheck.setAttribute("type", "checkbox");
    targetDestinationCheck.style.float = "right";
    targetDestinationCheck.addEventListener("click", this.updateDestination.bind(null, this, dir + dt[0] + "/", isLeftSide), false);
    li.appendChild(expandButton);
    li.appendChild(document.createTextNode(''));
    li.appendChild(targetToTransferCheck);
    li.appendChild(targetDestinationCheck);

    list.appendChild(li);
}

function createChildFile(evt, dt, list, pad, dir, isLeftSide){
    var li = document.createElement("li");
    li.style.listStyle = "none";
    li.style.fontSize = "15px";
    li.style.paddingLeft = (pad + 10) +"px"; //cascading indentation
    var targetToTransferCheck = document.createElement("INPUT");
    targetToTransferCheck.setAttribute("type", "checkbox");
    targetToTransferCheck.style.float = "right";
    targetToTransferCheck.addEventListener("click", this.updateHold.bind(null, this, dir + dt[0], isLeftSide), false);
    li.appendChild(document.createTextNode(dt[0]));
    li.appendChild(targetToTransferCheck);
    list.appendChild(li);
}

function updateHold(evt, currentTarget, isLeftSide){
    if(currentlyClickedTarget != null){ 
        if(currentlyClickedTarget != event.currentTarget){
            currentlyClickedTarget.checked = false
        }
        else {
            currentlyClickedTargetString = null //uncheck
            currentlyClickedTarget = null
            targetIsOnLeft = null
            return
        }
    }
    currentlyClickedTarget = event.currentTarget
    currentlyClickedTargetString = currentTarget
    targetIsOnLeft = isLeftSide
    console.log("targetIsOnLeft: " + targetIsOnLeft)
}

function updateDestination(evt, currentTarget, isLeftSide){
    if(currentlyClickedDestination != null){ 
        if(currentlyClickedDestination != event.currentTarget){
            currentlyClickedDestination.checked = false
        }
        else {
            currentlyClickedDestinationString = null
            currentlyClickedDestination = null
            destinationIsOnLeft = null
            return
        }
    }
    currentlyClickedDestination = event.currentTarget;
    currentlyClickedDestinationString = currentTarget
    destinationIsOnLeft = isLeftSide
    console.log("destinationIsOnLeft: " + destinationIsOnLeft)
}

function copy(){ //left to right
    if(targetIsOnLeft == destinationIsOnLeft){
        console.log("same side")
        return
    }
    if(currentlyClickedDestination != null && currentlyClickedTarget != null){
        var recursive = "False";
        console.log(currentlyClickedTargetString)
        console.log(currentlyClickedTargetString.charAt(currentlyClickedTargetString.length - 1))
        console.log(currentlyClickedDestinationString)
        if(currentlyClickedTargetString.charAt(currentlyClickedTargetString.length - 1) == '/'){
            recursive = "True"
            currentlyClickedTargetString = currentlyClickedTargetString.substring(0, currentlyClickedTargetString.length - 1)
        }
        var destinationIP = ""
        var destinationUser = ""
        var private_key = ""
        var targetIP = ""
        var copy_or_transfer = ""
        if(targetIsOnLeft){ //left to right
            destinationIP = this.localStorage.getItem('ipR')
            destinationUser = this.localStorage.getItem('userR')
            private_key = this.localStorage.getItem('keyR')
            targetIP = "http://"+ this.localStorage.getItem('ipL') +":5001/api/v1/cloud/employee/copy"
        }
        else {
            destinationIP = this.localStorage.getItem('ipL')
            destinationUser = this.localStorage.getItem('userL')
            private_key = this.localStorage.getItem('keyL')
            targetIP = "http://"+ this.localStorage.getItem('ipR') +":5001/api/v1/cloud/employee/copy"
        }
        console.log(document.getElementById("keep").checked)
        if(document.getElementById("keep").checked){
            //keep original
            copy_or_transfer = "0"
        }
        else {
            copy_or_transfer = "1"
        }
        var payload = JSON.stringify({
            "sourcePath": currentlyClickedTargetString,
            "destinationIP": destinationIP,
            "destinationUser": destinationUser,
            "destinationPath": currentlyClickedDestinationString,
            "recursive": recursive,
            "private_key": private_key,
            "copy_or_transfer" : copy_or_transfer
        })
        $.ajax({
            method: 'POST',
            url: targetIP,
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
    else {
        console.log("select some stuff duy")
    }
}

function deleteStuff(){
    if(currentlyClickedTarget != null) {
        console.log('currentlyClickedString is not null, we in here')
        var recursive = "False";
        console.log(currentlyClickedTargetString)
        console.log(currentlyClickedTargetString.charAt(currentlyClickedTargetString.length - 1))
        if(currentlyClickedTargetString.charAt(currentlyClickedTargetString.length - 1) == '/'){
            recursive = "True"
            currentlyClickedTargetString = currentlyClickedTargetString.substring(0, currentlyClickedTargetString.length - 1)
        }
        var payload = JSON.stringify({
            "sourcePath": currentlyClickedTargetString,
            "recursive": recursive
        })
        var tIP = ""
        if(targetIsOnLeft){
            tIP = "http://"+ this.localStorage.getItem('ipL') +":5001/api/v1/cloud/employee/delete"
        }
        else {
            tIP = "http://"+ this.localStorage.getItem('ipR') +":5001/api/v1/cloud/employee/delete"
        }
        $.ajax({
            method: 'POST',
            url: tIP,
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
    else {
        console.log("right delete button is broken, throw it away")
    }
}