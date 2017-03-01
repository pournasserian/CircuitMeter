
var url = "/api/livestream";

$(function () {

    var url = "/api/livestream";
    var seriesData1 = [];
    var seriesData2 = [];
    var seriesData3 = [];

    setInterval(function () {

        $.get(url)
            .done(function (res) {
                var ddate = new Date(res.time);
                var dtime = ddate.getTime();

                //console.log(res.time);
                seriesData1.push([dtime, res.values[0]]);
                seriesData2.push([dtime, res.values[1]]);
                seriesData3.push([dtime, res.values[2]]);
                updateChart();
            })
            .fail(function (error) {
                console.log(error);
            });


    }, 1000);

    function updateChart() {
        chart.update({
            series: [{
                data: seriesData1
            },
            {
                data: seriesData2
            },
            {
                data: seriesData3
            }]
        });

    }

    var chart = Highcharts.chart('container', {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Meter Volts'
        },

        subtitle: {
            text: 'Source: IRCC Data Analytics Research'
        },
        xAxis: {
            type: 'datetime',

            dateTimeLabelFormats: {
                hour: '%I %p',
                minute: '%I:%M %p'
            }


        },
        yAxis: {
            title: {
                text: 'Volt'
            }
        },
        //legend: {
        //    layout: 'vertical',
        //    align: 'right',
        //    verticalAlign: 'middle'
        //},

        //plotOptions: {
        //    series: {
        //        pointStart: 2010
        //    }
        //},

        series: [{
            name: 'A',
            data: seriesData1
        },
        {
            name: 'B',
            data: seriesData2
        },
        {
            name: 'C',
            data: seriesData3
        }],
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        }



    });

});

