require([ 'gitbook' ], function (gitbook) {
  gitbook.events.bind('start', function (e, config) {
    gitbook.toolbar.createButton({
      icon: 'fa fa-rss',
      label: 'RSS',
      position: 'right',
      onClick: function () {
        window.open(config.rss.feed_url);
      }
    });
  });
});
