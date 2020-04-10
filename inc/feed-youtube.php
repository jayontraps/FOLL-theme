<div class="parent_title">
    <h2>Find Of The Day Youtube Channel</h2>
</div>

<div class="feed-inner">
    <div id="youtube-feed"></div>
    <a class="channel-link" href="https://www.youtube.com/channel/UCEElyVlyaSBYA51Z9U1YYAw">More from the Find of the Day channel</a>
</div>


<script>
    var reqURL = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent("https://www.youtube.com/feeds/videos.xml?channel_id=");        
    var channelId = "UCEElyVlyaSBYA51Z9U1YYAw";
    const parentEl = document.getElementById('youtube-feed');

    $.ajax({
        url: reqURL + channelId,	    
        success: function(data) {	
            if (data.items.length) {
                for (let index = 0; index < 3; index++) {
                    const item = data.items[index];    
                    var videoId = item.link.substr(item.link.indexOf("=") + 1);
                    var iframe = buildIframe(videoId)
                    parentEl.appendChild(iframe);                    
                }
            }
        },
        error: function() {
            console.log('error')
        }
    });		
    

    function buildIframe(videoId) {
        var iframe = document.createElement('iframe');
        iframe.style.width = '360px';
        iframe.style.minHeight = '220px';
        iframe.setAttribute("src", "https://youtube.com/embed/" + videoId);
        iframe.setAttribute('frameborder', 0);
        iframe.setAttribute('allow', "accelerometer; encrypted-media; gyroscope; picture-in-picture");
        iframe.setAttribute('allowfullscreen', "");

        return iframe
    }


</script>

