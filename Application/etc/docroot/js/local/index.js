var JSModelMainPage = function () {
    // Init the page view.
    function initView() {
        // Init equip map nav.
        var equip_nav = $('.nav-tab');
        equip_nav.on('click', function (elm) {
            for (var i = 0; i < equip_nav.length; i++) {
                $(equip_nav[i]).removeClass('active');
            }

            $(this).addClass('active');
            var id = $(this).attr('data-mui-controls');
            var warp = $('.mui-tabs__pane');
            for (var j = 0; j < warp.length; j++) {
                $(warp[j]).removeClass('mui--is-active');
            }
            $('#' + id).addClass('mui--is-active');
        });

        // Init view.
        var h = $(window).height() - 0;
        var wh = h - 60;
        $('#content-wrapper').css('height', h + 'px');
        var maph = $('.mod-netmap').height();
        $('#main-panel').css("height", wh + "px");
        $('.main-warp').css("height", (wh - maph - 40 - 12) + "px");
        $('#array-summary-info').css("height", (wh - maph - 40 - 32) + "px");
        $('#array-detail-info').css("height", (wh - maph - 40 - 32) + "px");

        // Set the scroll bar.
        $("#array-summary-info").niceScroll({
            cursorcolor: "#7F8C8D",
            cursoropacitymax: 1,
            touchbehavior: false,
            cursorwidth: "6px",
            cursorborder: "0",
            cursorborderradius: "2px"
        });

        $("#bat-group").niceScroll({
            cursorcolor: "#7F8C8D",
            cursoropacitymax: 1,
            touchbehavior: false,
            cursorwidth: "6px",
            cursorborder: "0",
            cursorborderradius: "2px"
        });
    }

    function format02d(str) {
        return (Array(2).join(0) + str).slice(-2);
    }

    function DisplaySystemTime() {
        var ajaxGeterTimer;

        clearInterval(ajaxGeterTimer);
        ajaxGeterTimer = setInterval(function () {
            var time = new Date();
            var strTime =
                time.getFullYear() + "-" +
                format02d(time.getMonth() + 1) + "-" +
                format02d(time.getDate()) + " " +
                format02d(time.getHours()) + ":" +
                format02d(time.getMinutes()) + ":" +
                format02d(time.getSeconds());
            $("#system-time").text(strTime);
        }, 800);
    }

    function AutoResize() {
        window.onresize = function () {
            window.location.reload();
        };
    }

    return {
        init: function () {
            initView();
            DisplaySystemTime();
            AutoResize();
        }
    };
}();

var JSModelBatteryArraySummaryInfo = function () {
    // Init View.
    function drawSOCStatus() {
        var html = '<div class="cube">' +
            '<div class="a"></div>' +
            '<div class="b"></div>' +
            '<div class="c"></div>' +
            '<div class="d"></div>' +
            '<div id="slider-range-min"></div></div>' +
            '<strong class="soc-status">SOC: 0% / Charge</strong><span class="icon-power-cord"></span>';

        $('#array-summary-info').append(html);
    }

    function drawParamsTable() {
        var html = "";
        var str = "{'name':'json name',\
                        'sigs':[\
                            {'name':'volt','val':'500.8','status':'ok'},\
                            {'name':'curr','val':'100.8','status':'ok'},\
                            {'name':'curr','val':'100.8','status':'ok'},\
                            {'name':'curr','val':'100.8','status':'ok'},\
                            {'name':'curr','val':'100.8','status':'ok'}\
                        ]\
                    }"; //得到的JSON
        var obj = eval('(' + str + ')');

        html += '<table id="summary-tab" class="mui-table mui-table--bordered"><tbody>';
        for (var i = 0; i < obj.sigs.length; i++) {
            html += '<tr>';
            html += '<td>' + obj.sigs[i].name + '</div>';
            html += '<td>' + obj.sigs[i].val + '</div>';
            html += '<td>' + obj.sigs[i].status + '</div>';
            html += '</tr>';
        }
        html += '</table>';

        $('#array-summary-info').append(html);
    }

    function initView() {
        drawSOCStatus();
        drawParamsTable();
    }

    function setSocValue(value) {
        if (0 <= value && 100 >= value) {
            $(".a").css({
                "width": value + "%",
            });
            $(".b").css({
                "width": value + "%",
            });
            $(".c").css({
                "width": value + "%",
            });
            $(".d").css({
                "width": value + "%",
            });

            $(".soc-status").text("SOC: " + value + "%");
        }
    }

    return {
        init: function () {
            initView();
        },
        soc: function (value) {
          setSocValue(value);
        }
    };
}();

var JSModelBatteryArrayDetailInfo = function () {

    function initView() {
        var html = '<div id="chart"> </div><div class="legend"><strong>Volt: 700(V) / Curr: 340.1(A)</strong></div>'
        $('#array-detail-info').append(html);
        var h = $('#array-detail-info').height();
        $('#chart').css("height", (h - 30) + "px");

        require.config({
            paths: {
                echarts: 'js/echarts2'
            }
        });

        require(
            [
                'echarts',
                'echarts/theme/macarons',
                'echarts/chart/line',
            ],
            function (ec, theme) {
                var Chart = ec.init(document.getElementById('chart'), theme);
                var option = {
                    tooltip: {
                        show: true
                    },
                    legend: {
                        data: ['TEST']
                    },
                    xAxis: [{
                        type: 'category',
                        data: ["1", "2", "3", "4", "5", "6"]
                    }],
                    yAxis: [{
                        type: 'value',
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            formatter: '{value} KW'
                        }
                    }],
                    series: [{
                        "name": "TEST",
                        "type": "line",
                        "data": [5, 20, 40, 10, 10, 20]
                    }]
                };

                // 为echarts对象加载数据
                Chart.setOption(option);
            }
        );
    }

    return {
        init: function () {
            initView();
        }
    };
}();

var JSModelBatteryGroupDetailInfo = function () {
    // Init View.
    function initView() {
        var nRow = 0;
        var nCount = 0;
        var html = "";
        var json = 
        '{"name":"json name",\
            "group":[\
                {"name":"Battery group 1",\
                    "param":[\
                        {"name":"Nav relay status","val":"close","type":"enum","enum":"close>open>fail","rw":"read-only","status":"ok"},\
                        {"name":"Pos relay status","val":"close","type":"enum","enum":"close>open>fail","rw":"read-only","status":"ok"},\
                        {"name":"min volt","val":3.8,"type":"INT","enum":"none","rw":"read-only","status":"ok"},\
                        {"name":"max volt","val":3.8,"type":"INT","enum":"none","rw":"read-only","status":"ok"}\
                    ]\
                },\
                {"name":"Battery group 2",\
                    "param":[\
                        {"name":"Nav relay status","val":"close","type":"enum","enum":"close>open>fail","rw":"read-only","status":"ok"},\
                        {"name":"Pos relay status","val":"close","type":"enum","enum":"close>open>fail","rw":"read-only","status":"ok"},\
                        {"name":"min volt","val":3.8,"type":"INT","enum":"none","rw":"read-only","status":"ok"},\
                        {"name":"max volt","val":3.8,"type":"INT","enum":"none","rw":"read-only","status":"ok"}\
                    ]\
                },\
                {"name":"Battery group 3",\
                    "param":[\
                        {"name":"Nav relay status ","val":"close ","type":"enum ","enum":"close > open > fail ","rw":"read - only ","status":"ok "},\
                        {"name":"Pos relay status ","val":"close ","type":"enum ","enum":"close > open > fail ","rw":"read - only ","status":"ok "},\
                        {"name":"min volt ","val":3.8,"type":"INT ","enum":"none ","rw":"read - only ","status":"ok "},\
                        {"name":"max volt ","val":3.8,"type":"INT ","enum":"none ","rw":"read - only ","status":"ok "}\
                    ]\
                }\
            ]\
        }';
        var object = eval('(' + json + ')');
        for (var i = 0; i < object.group.length; i++, nCount++) {
            html += '<div class="mui-col-md-4"><div class="mui-panel"><strong>' + object.group[i].name +
                '</strong><span class="icon-power-cord"></span><div class="mui-row"><div class="mui-col-md-6"><div class="GaugeMeter" id="GaugeMeter' + (i + 1) + '" data-percent="100" data-append="%" data-size="90" data-theme="LightGreen" data-width="7" data-animate_gauge_colors="1" data-animate_text_colors="1" data-style="Arch" data-label="SOC" data-stripe="0" data-label_color=""></div></div><div class="mui-col-md-6"></div></div>';
            html += '<table id="summary-tab" class="mui-table mui-table--bordered"><tbody>';
            for (var j = 0; j < object.group[i].param.length; j++) {
                html += '<tr>';
                html += '<td>' + object.group[i].param[j].name + '</div>';
                html += '<td>' + object.group[i].param[j].val + '</div>';
                html += '<td>' + object.group[i].param[j].status + '</div>';
                html += '</tr>';
            }

            html += '</table>';
            html += '</div></div>';
        }

        $('#bat-group').append(html);
        $(".GaugeMeter").gaugeMeter();
    }

    return {
        init: function () {
            initView();
        }
    };
}();
