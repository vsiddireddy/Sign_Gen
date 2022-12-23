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

    async test(x) {
        console.log(window.document.styleSheets[1].cssRules[0]);
        this.clear();

        var w = document.getElementById("CanvasWidth").value;
        var h = document.getElementById("CanvasHeight").value;
        if (w/h >= 0.25 && w/h <= 4) {
            sign.setWidth(w);
            sign.setHeight(h);
        } else{
            w = 633, h = 291 
            sign.setWidth(633);
            sign.setHeight(291);
        }


        var colors = await r.ApplyColors();
        sign.backgroundColor = colors.m1;

        var words = await r.GetRandomWord();
        var font = await r.ApplyFont();
        //await font.load();
        var myfont = new FontFaceObserver(font);
        myfont.load().then(function () {
            console.log('Output Sans has loaded.');

            console.log(x);
            var text = new fabric.Textbox(words[0], {
                fontFamily: x,
                width: Number(w),
                textAlign: "center"
            });
    
            sign.add(text);

        });
    }
}