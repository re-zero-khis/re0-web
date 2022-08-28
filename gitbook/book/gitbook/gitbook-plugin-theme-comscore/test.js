require(["gitbook"], function(gitbook) {
    gitbook.events.bind("page.change", function() {
        // do something
    });

    gitbook.events.bind("exercise.submit", function() {
        // do something
    });
});