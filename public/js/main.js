$("#button1").on("click", function () {
    // console.log("hello!!!");
    // location.assign("/scrape");
    $.ajax({
        method: "GET",
        url: "/scrape"
    })


    $.getJSON("/articles", function (data) {
        // For each one
        for (var i = 0; i < data.length; i++) {
            // Display the apropos information on the page
            // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");   

            var outerDiv = $("<div>").attr("class", "card");
            var nxtDiv = $("<div>").attr({ class: "card-header", id: data[i]._id })
                .text(data[i].title);
            // var blockquote = $("<blockquote>").attr("class", "blockquote mb-0")
            // .text(data[i].link);
            var a = $("<a></a>").attr({ class: "btn btn-primary", href: data[i].link }).text("link")
            var a2 = $("<a></a>").attr({ class: "btn btn-success", id: "save", dataid: data[i]._id }).text("Save Article")

            $("#articles").append(outerDiv, nxtDiv, a, a2)
        }
    });
});

$('#clear').click(function () {
    $.get("/clear")
        .then(function () {
            articleContainer.empty();
            initPage();
        })
})

$(document).on("click", "#save", function () {
    var id = $(this).attr("dataid");
    console.log(id);
})