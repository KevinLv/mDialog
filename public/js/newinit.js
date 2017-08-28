function getfont() {
    var html1 = document.documentElement;
    var screen = html1.clientWidth;
    if (screen >= 640) {
        html1.style.fontSize = '40px';
    } else if (screen <= 320) {
        html1.style.fontSize = '20px';
    } else {
        html1.style.fontSize = 0.0625 * screen + 'px';
    }

}
getfont();
window.onresize = function() {
    getfont();
}