function displayvids(data){
    var searchresults= document.getElementById("searchresults");
    //console.log(data[0].snippet.channelId);
    for(let i in data){
        var eachdiv = document.createElement("div");
        eachdiv.setAttribute("class","eachdiv");
        
        var url = "openUrlInNewTab(\'https://www.youtube.com/watch?v=" + data[i].id.videoId + "\');";
        eachdiv.setAttribute("onclick",url);

        var imgdiv = document.createElement("div");
        imgdiv.setAttribute("class","imgdiv");

        var image = document.createElement("img");
        image.setAttribute("src",data[i].snippet.thumbnails.medium.url);
        image.setAttribute("class","thumbnail");
        imgdiv.appendChild(image);

        var contentdiv = document.createElement("div");
        contentdiv.setAttribute("class","contentdiv");

        var title = document.createElement("h3");
        var titletext = document.createTextNode(data[i].snippet.title);
        title.appendChild(titletext);

        var channel = document.createElement("p");
        var channeltext = document.createTextNode(data[i].snippet.channelTitle);
        channel.appendChild(channeltext);

        var desc = document.createElement("p");
        var desctext = document.createTextNode(data[i].snippet.description);
        desc.appendChild(desctext);

        var date = document.createElement("p");
        var datetext = document.createTextNode(data[i].snippet.publishTime);
        date.appendChild(datetext);


        contentdiv.appendChild(title);
        contentdiv.appendChild(channel);
        contentdiv.appendChild(desc);
        contentdiv.appendChild(date);

        eachdiv.appendChild(imgdiv);
        eachdiv.appendChild(contentdiv);

        searchresults.appendChild(eachdiv);
    }    
}
function openUrlInNewTab(url){window.open(url);}

async function getresponse(searchedquery) {
    //const apikey="AIzaSyC_sUZgsJ10ErSpWK2dFp4xzva9JxH_jPc";
    const apikey="AIzaSyCLTVrxY9yeouNbFwWIRIy-sDaSwZ_D-cc";
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&type=video&part=snippet&maxResults=20&q=${searchedquery}`
    );
    if(!response.ok){
        throw console.error(`Some unexpected Error occured ${response.status}`);
    }
    var data = await response.json();
    //vaconsole.log(element);r strdata = JSON.stringify(data);
    //getvid(data.items);
    //tadisplayvideos(data.items);
    console.log(data.items);
    displayvids(data.items);

}

var el = document.getElementById("searchbutton");
if(el){
    el.addEventListener('click',function(){
        let searchedquery = document.getElementById("searchbox").value;
        if(searchedquery != null){
            getresponse(searchedquery);
        }else{
            console.log("error");
        }
    });
}