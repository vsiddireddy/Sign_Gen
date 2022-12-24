var FontFaceObserver = require('fontfaceobserver');
const r = new random();
var sign = new fabric.Canvas("canvas_back");

class canvas {

    async generate() {
        this.clear();

        var w = document.getElementById("CanvasWidth").value;
        var h = document.getElementById("CanvasHeight").value;
        if (w/h >= 0.25 && w/h <= 4) {
            sign.setWidth(w);
            sign.setHeight(h);
        } else {
            w = 633, h = 291
            sign.setWidth(633);
            sign.setHeight(291);
        }

        const url = r.GetRandomLogo();
        console.log(url);
        if (document.getElementById('toggleLogo').checked) {
            fabric.loadSVGFromURL(url, function(objects, options) {
                objects.every(function(svg) {
                    console.log(svg);
                    svg.set({
                        top: 90,
                        left: 90,
                        originX: 'center',
                        originY: 'center',
                        fill: 'blue'
                    });
                    svg.scaleToWidth(w/1.75);
                    svg.scaleToHeight(h/1.75);
                    sign.centerObject(svg);
                    sign.add(svg).renderAll();
                    return false;
                });
            });
        }

        var colors = await r.ApplyColors();
        sign.backgroundColor = colors.m1;

        var words = await r.GetRandomWord();
        var font = await r.ApplyFont();

        console.log(font);
        var myfont = new FontFaceObserver(font);
        myfont.load().then(function () {
            console.log('Output Sans has loaded.');

            console.log(font);
            var mainText = new fabric.Textbox(words[0], {
                fontFamily: font,
                width: Number(w),
                textAlign: "center"
            });
            sign.add(mainText);

            if(words[1] !== undefined){
                var sub_text = new fabric.Textbox(words[1], {
                    top: 90,
                    left: 90,
                    fontFamily: font,
                    width: Number(w),
                    textAlign: "center"
                });
                sign.add(sub_text);
            }

        });
        sign.renderAll();
    }

    async clear(){
        document.getElementById("splashScreen").style.display = 'none';
        sign.clear();
    }
}