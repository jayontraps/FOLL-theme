
<div class="youtube-feed">
    <iframe class="latestVideoEmbed" vnum='0' cid="UCEElyVlyaSBYA51Z9U1YYAw" width="600" height="340" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"  allowfullscreen></iframe>

    <iframe class="latestVideoEmbed" vnum='1' cid="UCEElyVlyaSBYA51Z9U1YYAw" width="600" height="340" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"  allowfullscreen></iframe>

    <script>
    var reqURL = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent("https://www.youtube.com/feeds/videos.xml?channel_id=");
    function loadVideo(iframe){
        console.log('api url: ', reqURL + iframe.getAttribute('cid'))
        $.getJSON( 
            reqURL + iframe.getAttribute('cid'),
            function(data) {
                var videoNumber = (iframe.getAttribute('vnum') ? Number(iframe.getAttribute('vnum')) : 0);
                var link = data.items[videoNumber].link;
                id = link.substr(link.indexOf("=") + 1);  
                iframe.setAttribute("src","https://youtube.com/embed/"+id);
            }
        );
    }
    var iframes = document.getElementsByClassName('latestVideoEmbed');
    for (var i = 0, len = iframes.length; i < len; i++){
        loadVideo(iframes[i]);
    }
    </script>
</div>
