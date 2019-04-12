$("#button1").on("click", function () {
    // console.log("hello!!!");
    location.assign("/scrape");

    $.getJSON("/articles", function (data) {
        // For each one
        for (var i = 0; i < data.length; i++) {
            // Display the apropos information on the page
            $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
        }
    });
});

$('#clear').click(function () {
    // console.log("safsfsafasf");
})