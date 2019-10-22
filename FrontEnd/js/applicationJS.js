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

var updatedCrawl;

window.onload = function(){
    startDirectory(crawlData);
}

function requestCrawl(){

}


function startDirectory(jsonData){ //starts at /home/ubuntu/Desktop
    //DO INITIAL CRAWL

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
    expandButton.addEventListener("click", this.expandDirectory.bind(null, this, ul, 0), false)
    ul.appendChild(expandButton);
    ul.appendChild(document.createTextNode(jsonData[0][4]));
    ul.style.paddingLeft = "10px";
    list.appendChild(ul);
}
var expandDirectory = function(evt, list, pad){
    if(list.childElementCount == 1){ //directory not expanded
        //do a crawl here to refresh updatedCrawl
        //pass in list.firstChild.nextSibling 
        //first child is button, next sib is dir name?
        console.log(list.firstChild.nextSibling);
        event.currentTarget.innerHTML = "-";
        dt = crawlData; //change to updatedCrawl
        for(var i = 0; i < dt.length; i++){
            if(dt[i][2] == 1){
                createChildDirectory(this, dt[i], list, pad);
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

function createChildDirectory(evt, dt, list, pad){
    var li = document.createElement("li");
    li.style.listStyle = "none";
    li.style.fontSize = "15px";
    var expandButton = document.createElement("button");
    expandButton.innerHTML = "+";
    expandButton.style.background = "#c7c4c4";
    expandButton.style.border = "none";
    expandButton.style.marginBottom = "5px";
    expandButton.style.paddingLeft = (pad + 10) +"px"; //cascading indentation
    expandButton.addEventListener("click", this.expandDirectory.bind(null, this, li, pad + 10), false);
    li.appendChild(expandButton);
    li.appendChild(document.createTextNode(dt[4] + dt[0]));
    list.appendChild(li);
}

function createChildFile(evt, dt, list, pad){
    var li = document.createElement("li");
    li.style.paddingLeft = (pad + 10) +"px"; //cascading indentation
    li.appendChild(document.createTextNode(dt[0]));
    list.appendChild(li);
}