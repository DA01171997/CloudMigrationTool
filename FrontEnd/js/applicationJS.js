var crawlData = [[
        "dir1",
        "12K",
        1, //0 = file, 1 = dir
        "2019-10-16 03:42",
        "/home/ubuntu/Desktop/",
    ],
    [
        "dir2",
        "12K",
        1,
        "2019-10-16 03:42",
        "/home/ubuntu/Desktop/",
    ],
    [
        "user1.json",
        "12K",
        0,
        "2019-10-16 03:42",
        "/home/ubuntu/Desktop/",
    ],
    [
        "file.json",
        "12K",
        0,
        "2019-10-16 03:42",
        "/home/ubuntu/Desktop/",
    ]
]

window.onload = function(){
    this.requestCrawl();
    //this.startDirectory(this.crawlData);
}

function requestCrawl(){
    var dir = "~/Desktop/"
    var initialCrawl = JSON.stringify({"path": "~/Desktop"});
    $.ajax({
        method: 'POST',
        url: "http://ec2-18-189-26-44.us-east-2.compute.amazonaws.com:5000/api/v1/cloud/crawl",
        headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        data: initialCrawl,
        success: function(response){
            console.log(response);
            startDirectory(response, dir);
        }
    })
}

function startDirectory(jsonData, dir){ //starts at /home/ubuntu/Desktop
    //DO INITIAL CRAWL
    
    console.log(jsonData);
    var list = document.getElementById("AWSList");
    var ul = document.createElement("li");
    ul.style.listStyle = "none";
    ul.style.fontSize = "15px";
    var expandButton = document.createElement("button");
    expandButton.innerHTML = "+";
    expandButton.style.background = "#c7c4c4";
    expandButton.style.border = "none";
    expandButton.style.marginBottom = "5px";
    expandButton.style.paddingLeft = "0px";
    //crawl data should be showing for .../Desktop
    expandButton.addEventListener("click", this.ajExpand.bind(null, this, ul, 0, (dir + jsonData[0][0] + '/')), false)
    ul.appendChild(expandButton);
    //ul.appendChild(document.createTextNode(jsonData[0][4]));
    ul.appendChild(document.createTextNode(dir + jsonData[0][0] + '/'));
    ul.style.paddingLeft = "10px";
    list.appendChild(ul);
}

function ajExpand(evt, list, pad, crawlTarget){
    var dir = JSON.stringify({
        "path":crawlTarget
    });
    $.ajax({
        method: 'POST',
        url: "http://ec2-18-189-26-44.us-east-2.compute.amazonaws.com:5000/api/v1/cloud/crawl",
        headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        data: dir,
        success: function(response){
            console.log(response);
            expandDirectory(evt, list, pad, response, crawlTarget);
        }
    })
}
var expandDirectory = function(evt, list, pad,response, dir){
    if(list.childElementCount == 1){ //directory not expanded
        console.log(list.firstChild.nextSibling);
        event.currentTarget.innerHTML = "-";
        dt = response; //change to response
        for(var i = 0; i < dt.length; i++){
            console.log(dt[i]);
            if(dt[i][2] == 1){
                createChildDirectory(this, dt[i], list, pad, dir);
            }
            else {
                createChildFile(this, dt[i], list, pad);
            }
        }
    } else { //directory already expanded, remove children
        event.currentTarget.innerHTML = "+";
        while(list.firstChild.nextSibling.nextSibling){
            list.removeChild(list.firstChild.nextSibling.nextSibling);
        }
    }
    console.log(list);
}

function createChildDirectory(evt, dt, list, pad, dir){
    var li = document.createElement("li");
    li.style.listStyle = "none";
    li.style.fontSize = "15px";
    var expandButton = document.createElement("button");
    expandButton.innerHTML = "+";
    expandButton.style.background = "#c7c4c4";
    expandButton.style.border = "none";
    expandButton.style.marginBottom = "5px";
    expandButton.style.paddingLeft = (pad + 10) +"px"; //cascading indentation
    expandButton.addEventListener("click", this.ajExpand.bind(null, this, li, pad + 10, (dir + dt[0] + '/')), false);
    li.appendChild(expandButton);
    li.appendChild(document.createTextNode(dt[0] + '/'));
    list.appendChild(li);
}

function createChildFile(evt, dt, list, pad){
    var li = document.createElement("li");
    li.style.paddingLeft = (pad + 10) +"px"; //cascading indentation
    li.appendChild(document.createTextNode(dt[0]));
    list.appendChild(li);
}