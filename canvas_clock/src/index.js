/**
 * html 先載入js 再建立canvas
 * 所以要使用document.ready()等網頁載入完成再設定canvas
 */

$(document).ready(function () {  
    var c = document.getElementById("myCanvas");

    //建立2d的canvas
    var ctx = c.getContext("2d");

    //抓取整個視窗的長寬
    var ww = $(window).outerWidth();
    var wh = $(window).outerHeight();

    var center = {
        x: ww / 2,
        y: wh / 2
    };

    c.width = ww;
    c.height = wh;

    var time = 0;

    draw();

    setInterval(draw, 10);

    function getWindowSize() {
        var c = document.getElementById("myCanvas");

        var ctx = c.getContext("2d");

        var ww = $(window).outerWidth();

        var wh = $(window).outerHeight();

        c.width = ww;
        c.height = wh;

        ctx.restore();//重設
        ctx.translate(center.x, center.y);

    }

    $(window).resize(getWindowSize);

    getWindowSize();

    function draw() {
        //rect
        ctx.fillStyle = "#111";
        ctx.beginPath();
        ctx.rect(-2000, -2000, 4000, 4000);
        ctx.fill();// draw rect

        //line
        // ctx.strokeStyle = "rgba(255,255,255,0.4)";
        // ctx.lineWidth = 1;
        // ctx.beginPath();
        // ctx.moveTo(-ww / 2, 0);//set start point
        // ctx.lineTo(ww / 2, 0);//set end point
        // ctx.moveTo(0, -wh);
        // ctx.lineTo(0, wh);
        // ctx.stroke(); //draw line

        //circle
        var r = 200;
        var deg_to_pi = Math.PI / 180;
        var count = 200;

        ctx.beginPath();
        ctx.lineWidth = 1;
        for (var i = 0; i <= count; i++) {
            var now_r = r + 2 * Math.sin(Math.PI * 2 * i / 10 + time / 20);
            var deg = i * (360 / count) * deg_to_pi;

            ctx.lineTo(
                now_r * Math.cos(deg),
                now_r * Math.sin(deg)
            );
        }

        ctx.strokeStyle = "#fff";
        ctx.stroke();

        //內圈刻度
        var r = 220;
        var count = 240;

        ctx.lineWidth = 1;
        for (var i = 0; i <= count; i++) {
            var deg = 360 * (i / count) * deg_to_pi;

            var len = 5 +
                (i % 10 == 0 ? 10 : 0) +
                (i % 60 == 0 ? 5 : 0);

            var opacity = (len > 5) ? 1 : 0.7;

            var start_r = r;
            var end_r = r + len;


            ctx.beginPath();
            ctx.moveTo(
                start_r * Math.cos(deg),
                start_r * Math.sin(deg)
            );
            ctx.lineTo(
                end_r * Math.cos(deg),
                end_r * Math.sin(deg)
            );
            ctx.strokeStyle = "rgba(255,255,255,0.5)";
            ctx.stroke();
        }

        //外圈刻度
        var r = 300;
        var count = 60;

        ctx.lineWidth = 1;
        for (var i = 0; i <= count; i++) {
            var deg = 360 * (i / count) * deg_to_pi;

            var len = 5 +
                (i % 5 == 0 ? 10 : 0) +
                (i % 60 == 0 ? 5 : 0);

            var opacity = (len > 5) ? 1 : 0.7;

            var start_r = r;
            var end_r = r + len;


            ctx.beginPath();
            ctx.moveTo(
                start_r * Math.cos(deg),
                start_r * Math.sin(deg)
            );
            ctx.lineTo(
                end_r * Math.cos(deg),
                end_r * Math.sin(deg)
            );
            ctx.strokeStyle = "rgba(255,255,255,0.5)";
            ctx.stroke();
        }

        var now = new Date();
        var sec = now.getSeconds();
        var min = now.getMinutes();
        var hour = now.getHours();

        $(".time").text("" + hour + ":" + min + ":" + sec);

        function drawPointer(r, deg, lineWidth) {
            ctx.beginPath();
            ctx.lineWidth = lineWidth;

            var now_deg = deg+ 90;//校正90度

            ctx.moveTo(0,0);
            ctx.lineTo(
                r * Math.cos(now_deg * deg_to_pi),
                r * Math.sin(now_deg * deg_to_pi)
            );
            ctx.stroke();
        }

        drawPointer(300,-sec*6,1);// 360/6=6
        drawPointer(270,-min*6,2);
        drawPointer(150,-(hour+min/60)*30,3);// 360/12=30

        time += 1;
    }


});