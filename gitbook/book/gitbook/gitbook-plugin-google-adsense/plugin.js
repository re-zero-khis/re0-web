require(["gitbook"], function(gitbook) {
    // plugin config
    var ads;

    function createAdElement(adConfig) {
        adElement = document.createElement('ins');
        adElement.style = 'display: block';
        adElement.className = 'adsbygoogle';
        adElement.setAttribute('data-ad-client', adConfig.client);
        adElement.setAttribute('data-ad-slot', adConfig.slot);
        adConfig.format && adElement.setAttribute('data-ad-format', adConfig.format);
        adConfig.style && adElement.setAttribute('style', adConfig.style);

        return adElement;
    }

    function injectAds(configs) {
        if(configs && configs.length > 0) {
            configs.forEach(function(c) {
                document.querySelector(c.location).appendChild(createAdElement(c));
                (adsbygoogle = window.adsbygoogle || []).push({});
            });
        }
    }

    gitbook.events.bind("start", function(e, pluginConfig) {
        client = pluginConfig['google-adsense'].client;
        ads = pluginConfig['google-adsense'].ads;

        // init script
        var adScript = document.createElement('script');
        adScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + client;
        adScript.setAttribute('async', true);
        adScript.setAttribute('crossorigin', "anonymous");
        document.body.appendChild(adScript);
    });

    gitbook.events.bind("page.change", function() {
        if (ads) {
            injectAds(ads);
        }
    });
});
