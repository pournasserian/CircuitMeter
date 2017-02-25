$(function () {

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    var url = "/api/livestream";

    // Create the chart
    Highcharts.stockChart('container', {
        chart: {
            events: {
                load: function () {

                    // set up the updating of the chart each second
                    var series = this.series[0];

                    setInterval(function () {

                        $.get(url)
                            .done(function (res) {

                                //var time = (new Date()).getTime();
                                console.log(new Date().getTime());
                                //series.addPoint([(new Date()).getTime(), res[0]], true, true);
                                //for (i = 0; i < res.length; i += 1) {
                                //    series.addPoint([time + i * 100 + 10, res[i]], true, true);
                                //}
                                                              
                            })
                            .fail(function (error) {
                                console.log(error);
                            });


                        //var x = (new Date()).getTime(), // current time
                        //    y = Math.round(Math.random() * 100);
                        //series.addPoint([x, y], true, true);

                    }, 3000);
                }
            }
        },

        rangeSelector: {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1M'
            }, {
                count: 5,
                type: 'minute',
                text: '5M'
            }, {
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false,
            selected: 0
        },

        title: {
            text: 'Live random data'
        },

        exporting: {
            enabled: false
        },

        series: [{
            name: 'Random data',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;


                $.get(url)
                    .done(function (res) {
                        //console.log(time);
                        //data.push([time , res[0]], true, true);
                        for (i = 0; i < 1000; i += 1) {
                            //console.log(time + i * 100);
                            data.push([time + i * 1000 , i], true, true);
                        }
                        
                    })
                    .fail(function (error) {
                        console.log(error);
                    });

                return data;
            } ())
        }]
    });

});