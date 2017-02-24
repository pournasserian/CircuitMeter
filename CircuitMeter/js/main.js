
function responseError(error) {
    alert("Error!")
}

function showResponseData(data) {

    items = jQuery.parseJSON(data).results;

    if (!items) {
        items = jQuery.parseJSON(data).result;
    }

    $("#result").removeClass("hidden");
    $("#result > table > thead > tr").empty();
    $("#result > table > tbody").empty();

    if (items) {

        var len = items.length;
        var txt = "";

        if (len == 0) {
            showNoResponse();
            return;
        }

        // generating table header
        var header = $("#result > table > thead > tr");
        var rows = $("#result > table > tbody");

        header.append("<th>name</th>");

        for (var i = 0; i < len; i++) {
            header.append("<th>" + (i + 1) + "</th>");
        }

        for (var attr in items[0]) {
            txt += "<tr>";
            txt += "<td>" + attr + "</td>"
            for (var i = 0; i < len; i++) {
                txt += "<td>" + items[i][attr] + "</td>";
            }
            txt += "</tr>";
        }

        rows.append(txt);

    }
}

function showResponseDataPivot(data) {

    items = jQuery.parseJSON(data).results;

    if (!items) {
        items = jQuery.parseJSON(data).result;
    }

    $("#result").removeClass("hidden");
    $("#result > table > thead > tr").empty();
    $("#result > table > tbody").empty();

    if (items) {

        var len = items.length;
        var txt = "";

        if (len == 0) {
            showNoResponse();
            return;
        }

        // generating table header
        var header = $("#result > table > thead > tr");
        var rows = $("#result > table > tbody");

        for (var attr in items[0]) {
            header.append("<th>" + attr + "</th>");
        }

        for (var i = 0; i < len; i++) {
            txt += "<tr>";
            for (var attr in items[i]) {
                txt += "<td>" + items[i][attr] + "</td>";
            }
            txt += "</tr>";
        }


        rows.append(txt);

    }
}

function showNoResponse() {

    $("#result").removeClass("hidden");
    $("#result > table > thead > tr").empty();
    $("#result > table > tbody").empty();
    $("#result > table > tbody").append("<tr><td><div class='alert alert-danger' role='alert'>There is no data!</div></td></tr>");
}

$(".filter-api").click(function () {
    var url = "/api/filter?endpoint=" + $(this).attr("api");

    var pivot = false;

    if ($(this).attr("pivot") == "True") {
        pivot = true;
    }

    $.get(url)
        .done(function (data) {

            if (data.length == 0) {
                showNoResponse();
                return
            }

            if (pivot) {
                showResponseDataPivot(data);
            }
            else {
                showResponseData(data);
            }
        })
        .fail(function (error) {
            responseError(error);
        });
});
