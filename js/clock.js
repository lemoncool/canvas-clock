let dom = document.getElementById('clock');
let ctx = dom.getContext('2d');
let width = ctx.canvas.width;
let height = ctx.canvas.height;
var r = width / 2;
//为了宽度高度放大是时，其他边框等比美观，所以设置一个比例
var rem = width / 200;

function drawBackground() {
    ctx.save();
    ctx.translate(r, r);
    ctx.beginPath();  //每次开始前必须开始一条路径
    //按比例输出边框宽度，width/200=x/10=rem; 即 x=10 *rem
    ctx.lineWidth = 10 * rem;
    ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI, false);

    ctx.stroke();

    var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    hourNumbers.map(function (number, i) {
        var rad = 2 * Math.PI / 12 * i;
        var x = Math.cos(rad) * (r - 30 * rem);
        var y = Math.sin(rad) * (r - 30 * rem);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 18 * rem + "px Arial";
        ctx.fillText(number, x, y)
    });

    for (var i = 0; i < 60; i++) {
        var rad = 2 * Math.PI / 60 * i;
        var x = Math.cos(rad) * (r - 18 * rem);
        var y = Math.sin(rad) * (r - 18 * rem);
        ctx.beginPath();
        if (i % 5 === 0) {
            ctx.fillStyle = '#000';
        } else {
            ctx.fillStyle = '#ccc';
        }
        ctx.arc(x, y, 2 * rem, 2 * Math.PI, false);
        ctx.fill();
    }
}

function drawHour(hour, minute) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 12 * hour;
    var mrad = 2 * Math.PI / 12 / 60 * minute;
    ctx.rotate(rad + mrad);
    ctx.lineWidth = 6 * rem;
    ctx.moveTo(0, 10 * rem);
    ctx.lineTo(0, -r / 2);
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();
}

function drawMinute(minute) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 60 * minute;
    ctx.rotate(rad);
    ctx.lineWidth = 3 * rem;
    ctx.moveTo(0, 10 * rem);
    ctx.lineTo(0, -r / 2 - 10);
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();
}

function drawSecond(second) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 60 * second;
    ctx.rotate(rad);
    ctx.lineWidth = 3;
    ctx.moveTo(-2 * rem, 20 * rem);
    ctx.lineTo(2 * rem, 20 * rem);
    ctx.lineTo(1, -r + 18 * rem);
    ctx.lineTo(1, -r + 18 * rem);
    ctx.fillStyle = '#e4393c';
    ctx.fill();
    ctx.restore();
}

function drawDot() {
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.arc(0, 0, 3 * rem, 2 * Math.PI, false);
    ctx.fill();
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    drawBackground();
    drawHour(hour, minute);
    drawMinute(minute);
    drawSecond(second);
    drawDot();
    ctx.restore();
}
setInterval(draw, 1000);