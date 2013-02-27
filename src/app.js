DolarHoje = {

    url: "http://api.dolarhoje.com/",
    reloadInterval: 600000, // 10 mins in ms

    badgeBackgroundColor: [178, 183, 32, 255], // yellow
    clearBadgeTextTimeout: 10000, // 10 secs in ms

    changeTooltipText: function(text){ chrome.browserAction.setTitle({title: text}); },

    changeBadgeText: function(text){ chrome.browserAction.setBadgeText({text: text}); },
    changeBadgeBackgroundColor: function(color){ 
        chrome.browserAction.setBadgeBackgroundColor({color: color}); 
    },

    loadQuote: function(){
        var scope = this;
        var xhr = new XMLHttpRequest();
    
        xhr.open("GET", this.url, true);
        xhr.onreadystatechange = function() {
          if ((xhr.readyState == 4) && (xhr.status == 200)) {
              var actualQuote = xhr.responseText;
              scope.onloadQuote(actualQuote);
          }
        }
        xhr.send();
    },

    onloadQuote: function(actualQuote){
        var tooltipText = "US$ 1,00 vale R$ " + actualQuote + " hoje";
        this.changeTooltipText(tooltipText);
        this.changeBadgeText(actualQuote);
    },

    attachBehaviors: function(){
        var scope = this;
        chrome.browserAction.onClicked.addListener(function() {
            window.open("http://dolarhoje.com");
            scope.trackEvent("BrowserIcon", "click");
        });
    },

    startReloadInterval: function(){
        var scope = this;
        window.setInterval(function(){ scope.loadQuote(); }, this.reloadInterval);
    },
    
    trackEvent: function(category, action){
        _gaq.push(['_trackEvent', category, action]);
    },

    init: function(){
        this.changeBadgeBackgroundColor(this.badgeBackgroundColor);
        this.attachBehaviors();
    
        this.loadQuote();
        this.startReloadInterval();
    }
};

DolarHoje.init();