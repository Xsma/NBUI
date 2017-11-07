var JSModelSettings = function () {
    // Create an overlay.
    var Overlay;
    var OverlayCloseFlag = false;

    function createOverlayWindow(html) {
        Overlay = document.createElement('div');
        var h = $(window).height();
        var w = $(window).width();

        // set overlay options
        var options = {
            // teardown when <esc> key is pressed (default: true)
            'keyboard': true,
            // maintain overlay when clicked (default: false)
            'static': true,
            // execute function when overlay is closed
            'onclose': function () {
                OverlayCloseFlag = true;
            }
        };

        // Config the overlay.
        Overlay.style.width = w * 3 / 4 + 'px';
        Overlay.style.height = h * 2 / 3 + 'px';
        Overlay.style.margin = '100px auto';
        Overlay.style.textAlign = 'right';
        Overlay.style.padding = '20px';
        Overlay.style.borderRadius = '2px';
        Overlay.style.position = 'relative';
        Overlay.style.boxShadow = '0px 2px #F44336';
        Overlay.style.backgroundColor = '#5F6F81';
        Overlay.setAttribute("class", "mui-row");
        Overlay.innerHTML = html;

        // show modal
        mui.overlay('on', options, Overlay);

        // Set close button click listener
        $('#btn-submit').click(function (argument) {
            closeOverlayWindow();
        });
    }

    function closeOverlayWindow() {
        mui.overlay('off');
    }

    // Init the settings view.
    function initView() {
        var html = "";
        var str = '{"name":"Battery Group Parameters.","equipid":"32769","sigs":[{"name":"Voltage High Pro. Point","sigid":"0001","max":"100","min":"0","uint":"V","val":"500.8","status":"ok"},{"name":"curr","sigid":"0002","max":"100","min":"0","uint":"a","val":"100.8","status":"ok"},{"name":"Current High Pro. Point","sigid":"0003","max":"100","min":"0","uint":"a","val":"100.8","status":"ok"},{"name":"Current High Alm. Point","sigid":"0004","max":"100","min":"0","uint":"a","val":"100.8","status":"ok"},{"name":"Current Low Pro. Point","sigid":"0005","max":"100","min":"0","uint":"a","val":"100.8","status":"ok"}]}'; //得到的JSON
        var obj = eval('(' + str + ')');

        html += '<strong>' + obj.name + '</strong><br>' + '<div class="mui-panel" style="margin-top:20px;"><div class="mui_row"></div>';

        // Write the signals.
        html += '<div class="mui-row">';
        for (var i = 0; i < obj.sigs.length; i++) {
            html += '<div class="mui-col-md-6"><div class="mui-textfield"><input type="text" value="' + obj.sigs[i].val + '"><label>' + obj.sigs[i].name + ' (' + obj.sigs[i].min + ' - ' + obj.sigs[i].max + ' ' + obj.sigs[i].uint + ')' + '</label></div></div>';
        }
        html += '</div><div class="mui-row" style="bottom:10px;position:absolute;"><button id="btn-submit" class="mui-btn mui-btn--raised mui-btn--danger">Button</button></div></div>';
        createOverlayWindow(html);
    }

    // Init the view data.
    function initData() {

    }

    function ajaxGetParameters() {
        var ajaxGeterTimer;

        clearInterval(ajaxGeterTimer);
        ajaxGeterTimer = setInterval(function () {
            if (OverlayCloseFlag) {
                clearInterval(ajaxGeterTimer);
            }
        }, 1000);
    }

    function ajaxSetParameters() {

    }

    function updateView() {

    }

    return {
        init: function () {
            initView();
            ajaxGetParameters();
        },
        ajax: function () {
            ajaxGetData();
        }
    };

}();
