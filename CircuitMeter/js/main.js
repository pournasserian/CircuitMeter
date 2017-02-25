
function responseError(error) {
    alert("Error!")
}

function showResponseData(data) {

    $("#result").removeClass("hidden");
    $("#result > table > thead > tr").empty();
    $("#result > table > tbody").empty();

    $("#json-result").removeClass("hidden");
    $("#json-content").empty();
    $("#json-content").html(jsonFormatter(data));

    items = jQuery.parseJSON(data).results;

    if (!items) {
        items = jQuery.parseJSON(data).result;
    }

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

    $("#result").removeClass("hidden");
    $("#result > table > thead > tr").empty();
    $("#result > table > tbody").empty();

    $("#json-result").removeClass("hidden");
    $("#json-content").empty();
    $("#json-content").html(jsonFormatter(data));

    items = jQuery.parseJSON(data).results;

    if (!items) {
        items = jQuery.parseJSON(data).result;
    }

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

    $("#json-result").removeClass("hidden");
    $("#json-content").html("No data!");

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

$("#livestream").click(function () {

    var url = "/api/livestream";

    $.get(url)
        .done(function (data) {
            console.log(data);
        })
        .fail(function (error) {
            console.log(error);
        });

});

function jsonFormatter(jsonString) {

    var jsonObj = jQuery.parseJSON(jsonString);
    var json = JSON.stringify(jsonObj, null, 4);

    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}




