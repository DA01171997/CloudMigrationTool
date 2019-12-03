var currentlyClickedTargetString
var currentlyClickedTarget

var currentlyClickedDestinationString
var currentlyClickedDestination

window.onload = function(){
    //this.requestCrawl("AWSList", "https://8msqg3mnvd.execute-api.us-east-2.amazonaws.com/prod/CrawlAPI");
    this.requestCrawl("AWSList", true);
    this.requestCrawl("GoogleList", false);
    //this.startDirectory(this.crawlData);
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
        //"target": "13.59.63.33",
        "path": "/home/ubuntu/Desktop/"
    });
    console.log(initialCrawl)
    $.ajax({
        method: 'POST',
        url: toUrl,
        headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        data: initialCrawl,
        success: function(response){
            console.log(response);
            startDirectory(response, dir, targetList, toUrl);
        }
    })
}

function startDirectory(jsonData, dir, targetList, toUrl){ //starts at /home/ubuntu/Desktop
    //DO INITIAL CRAWL
    
    console.log(jsonData);
    dt = jsonData;
    for(var i = 0; i < dt.length; i++){
        console.log(dt[i]);
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
            targetToTransferCheck.addEventListener("click", this.updateHold.bind(null, this, dir + dt[i][0] + '/'), false);
            targetToTransferCheck.style.float = "right";
            var targetDestinationCheck = document.createElement("INPUT");
            targetDestinationCheck.setAttribute("type", "checkbox");
            targetDestinationCheck.addEventListener("click", this.updateDestination.bind(null, this, dir + dt[i][0] + "/"), false);
            targetDestinationCheck.style.float = "right";
            expandButton.addEventListener("click", this.ajExpand.bind(null, this, ul, 0, (dir + dt[i][0] + '/'), toUrl, false));
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

function ajExpand(evt, list, pad, crawlTarget, toUrl){
    var dir = JSON.stringify({
        "path":crawlTarget
        //"ip" : toURL ip
    });
    $.ajax({
        method: 'POST',
        url: toUrl,
                                                //url to lambda
        headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        data: dir,
        success: function(response){
            console.log(response);

            expandDirectory(evt, list, pad, response, crawlTarget, toUrl);
        }
    })
}
var expandDirectory = function(evt, list, pad,response, dir, toUrl){
    if(list.childElementCount == 3){ //directory not expanded
        //console.log(evt.currentTarget)
        //event.currentTarget.innerHTML = "-";
        dt = response;
        for(var i = 0; i < dt.length; i++){
            if(dt[i][2] == 1){
                createChildDirectory(this, dt[i], list, pad, dir, toUrl);
            }
            else {
                createChildFile(this, dt[i], list, pad, dir);
            }
        }
    } else { //directory already expanded, remove children
        event.currentTarget.innerHTML = "+";
        while(list.firstChild.nextSibling.nextSibling.nextSibling){
            list.removeChild(list.firstChild.nextSibling.nextSibling.nextSibling);
        }
    }
}

function createChildDirectory(evt, dt, list, pad, dir, toUrl){
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
    expandButton.addEventListener("click", this.ajExpand.bind(null, this, li, pad + 10, (dir + dt[0] + '/'), toUrl, false));
    var targetToTransferCheck = document.createElement("INPUT");
    targetToTransferCheck.setAttribute("type", "checkbox");
    targetToTransferCheck.style.float = "right";
    targetToTransferCheck.addEventListener("click", this.updateHold.bind(null, this, dir + dt[0] + "/"), false);
    var targetDestinationCheck = document.createElement("INPUT");
    targetDestinationCheck.setAttribute("type", "checkbox");
    targetDestinationCheck.style.float = "right";
    targetDestinationCheck.addEventListener("click", this.updateDestination.bind(null, this, dir + dt[0] + "/"), false);
    li.appendChild(expandButton);
    li.appendChild(document.createTextNode(''));
    li.appendChild(targetToTransferCheck);
    li.appendChild(targetDestinationCheck);

    list.appendChild(li);
}

function createChildFile(evt, dt, list, pad, dir){
    var li = document.createElement("li");
    li.style.listStyle = "none";
    li.style.fontSize = "15px";
    li.style.paddingLeft = (pad + 10) +"px"; //cascading indentation
    //var targetToTransferCheck = document.createElement("button");
    var targetToTransferCheck = document.createElement("INPUT");
    targetToTransferCheck.setAttribute("type", "checkbox");
    targetToTransferCheck.style.float = "right";
    targetToTransferCheck.addEventListener("click", this.updateHold.bind(null, this, dir + dt[0]), false);
    li.appendChild(document.createTextNode(dt[0]));
    li.appendChild(targetToTransferCheck);
    list.appendChild(li);
}

function updateHold(evt, currentTarget){
    if(currentlyClickedTarget != null){ 
        if(currentlyClickedTarget != event.currentTarget){
            currentlyClickedTarget.checked = false
        }
        else {
            currentlyClickedTargetString = null
            currentlyClickedTarget = null
            return
        }
    }
    currentlyClickedTarget = event.currentTarget;
    currentlyClickedTargetString = currentTarget
    //console.log("target: " +currentlyClickedTargetString)
}

function updateDestination(evt, currentTarget){
    if(currentlyClickedDestination != null){ 
        if(currentlyClickedDestination != event.currentTarget){
            currentlyClickedDestination.checked = false
        }
        else {
            currentlyClickedDestinationString = null
            currentlyClickedDestination = null
            return
        }
    }
    currentlyClickedDestination = event.currentTarget;
    currentlyClickedDestinationString = currentTarget
    console.log("to: " + currentlyClickedDestinationString)
}

function copy(){ //left to right
    if(currentlyClickedDestination != null && currentlyClickedTarget != null){
        var recursive = "False";
        console.log(currentlyClickedTargetString)
        console.log(currentlyClickedTargetString.charAt(currentlyClickedTargetString.length - 1))
        console.log(currentlyClickedDestinationString)
        if(currentlyClickedTargetString.charAt(currentlyClickedTargetString.length - 1) == '/'){
            recursive = "True"
            currentlyClickedTargetString = currentlyClickedTargetString.substring(0, currentlyClickedTargetString.length - 1)
        }
        var payload = JSON.stringify({
            "sourcePath": currentlyClickedTargetString,
            "destinationIP": "34.94.33.213",
            "destinationUser": "ubuntu",
            "destinationPath": currentlyClickedDestinationString,
            "recursive": recursive,
            //"private_key": "/home/ubuntu/key/google_tester/gcloud-management-key",
            "private_key": "-----BEGIN~RSA~PRIVATE~KEY-----.MIIEpAIBAAKCAQEAuiqufxOZAyQFPQ42jeVsPHupmKsiJT7voMdsEqezU+ArCArz.+v3KE38CnhW7yd9tcKuk/8PWkYGzuK7Xno5T6VJiPPG8aU4e7eqp5SZgU4/c1KMY.rOWDvcRIbehnH3ZUROiEOyTLo9fIyQr99mX46l+RfreOgmxtjqTEbtHXMD1Ax30I.qwRJ6aw7NbE5giJuYzQHd7lF2KFnD7ut06rpHoADCDwfNWIVoZcHgOblbW+TBTUY.IbACO1HzTY+7aJbBapdD/tfq3hbOfVHMPEupxxjdxsdCEHEerLdvKRAgIT63AWEv.9ycMT+o31dRf9tMFtUvaSu276HBujtqfeaMjEwIDAQABAoIBAQCDlAcg6ckL3zmU.nacRQ0Xsubp0nP/VM1ZKXKiVxtGIRrgjRxqKGzXn8az37oR7ed7v82D7JH9S+Ej+.DxV2i0HjdsbYLELuariRj3nk6+rJJLT/1QZrrQwf48sNY2T/Z7LHwU80Ph1v/+N5.tLsqm4gCnulGlpWyuM/2MZ5kdQuSm4HJHA3Q2/QfOYwAFKepddaQmPVmoTKyv5Dc.lgwtb95wjyg53WVYURdpFdn2DHjhVEDZakD+K/Wvlc0U/DKn3BdUC5MnZcVSF1Fz./vhaU2qht0G73MNriqjqh5h58HWU/YxLb9BXZSOu6ugf1XL8Hc5bvU5PiwI/8xqp.Uv9Uc7uBAoGBAPSB6b5XSMJwGeJXonKf2+uKRN/1Bk0KoorVvxZlFGLPwYtLWfiC.J5AB8k1g7iRGwqZUSVENjO7+miS+rpzNgTZmhOJKQuiCMYmNo6KM9ZGE/GNTCrp9.XEcMbyx1V/qWZjb4SjCGWCs/IxultdMs2RLNibYE8I6GfQcitp1w0qJPAoGBAMLq.xXq25SbCzZ7ZdLEkFHXmu01cMkHTHKQB4ouQNm0DxSPE/NxjhORGK0xRz0mbrpe5.b+ukNB7YjbvAb7ZTjXTR1BadAsRTx1xlSaPXau+6zjNAA6FC4zWYw1YPMXkTtyfS.o7XquHIQyRrj/vco2weLdpF/8kpqO8SlRz42g9X9AoGAfn9f4NvjhsTcf197afYO.n1OPwpZPxjgEU/O1wu5Ul7KInXpEd+9ObJC1PRcy3Y3GUqs0qzxpd5Q9R1lnmTQw.72YmxbRJ3WTOIC4pRIXM3paAxRpHaKhGv3NNaSDkfX6mLzZRm71FjEpD7Z/T7Ac9.3x57arIvim1F7hUliVq/fr0CgYEAqKoKtENrSv0qfJhi953m7pb34Ns0yezqTakr.5eSmk/K9NlSREgwzxGxLr0DjhChpDfVyuY9fYom1K5A7mqP2Ne4T/nVjHYv5aSRk.cphHeqZFI+fyvCpq/cfwz5laEBFVXepRq2suq9WGj/RWfn0l+wNdWE5E1MvUaDc0.zMrTjekCgYB6OpB0W32lmMxeHkUw2e6b85Vwi7u00fu0R9Yvil6MLsHBth4zZpyu.8/9zuS78aIyQAp3u6YLPw+mTU4XVCf23b3qYICCx+9SAh8XpCSiocR33K27mWoV9.wNMf2veoCu5xgiNi3ubiVvyrfqP0RUhv7EU/6ogsqLRMBOGC5zZl4g==.-----END~RSA~PRIVATE~KEY-----",
            "copy_or_transfer" : "1"
        })
                    //="copy_or_transfer" : "0" = copy "1" = transfer

        console.log(payload)
        $.ajax({
            method: 'POST',
            url: "http://3.16.27.35:5001/api/v1/cloud/employee/copy",
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







function duycopy(){ //right to left
    if(currentlyClickedDestination != null && currentlyClickedTarget != null){
        var recursive = "False";
        console.log(currentlyClickedTargetString)
        console.log(currentlyClickedTargetString.charAt(currentlyClickedTargetString.length - 1))
        console.log(currentlyClickedDestinationString)
        if(currentlyClickedTargetString.charAt(currentlyClickedTargetString.length - 1) == '/'){
            recursive = "True"
            currentlyClickedTargetString = currentlyClickedTargetString.substring(0, currentlyClickedTargetString.length - 1)
        }
        var payload = JSON.stringify({
            "sourcePath": currentlyClickedTargetString,
            "destinationIP": "3.16.27.35",
            "destinationUser": "ubuntu",
            "destinationPath": currentlyClickedDestinationString,
            "recursive": recursive,
            "private_key": "/home/ubuntu/key/amazon_tester/cloud_managment_key.pem",
            "copy_or_transfer" : "1"
        })
        console.log(payload)
        $.ajax({
            method: 'POST',
            url: "http://34.94.33.213:5001/api/v1/cloud/employee/copy",
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
        console.log("select some stuff, you animal")
    }
}