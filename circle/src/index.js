var time = 0;

var stars = [
    {
    el: ".red",
    r: 270,
    speed: 0.7,
    width: 50
    },
    {
    el: ".yellow",
    r: 350,
    speed: 0.2,
    width: 70
    }
];


function update() {
    stars.forEach(function (star) {
        var r = star.r;
        var angle = star.speed * time * 2;
        var x = r * Math.cos((angle / 360) * ((Math.PI * 2))) - (star.width/2);
        var y = r * Math.sin((angle / 360) * ((Math.PI * 2))) - (star.width/2);
        $(star.el).css("transform",
            "translate(" + x + "px," + y + "px)");
        time += 1;
    });

}
//30ms update
setInterval(update, 30);