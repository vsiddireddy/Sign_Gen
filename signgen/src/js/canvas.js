var FontFaceObserver = require('fontfaceobserver');
const r = new random();
var sign = new fabric.Canvas("canvas_back");

class canvas {

    async generate() {
        this.clear();

        //Random/Input Values
        var w = document.getElementById("CanvasWidth").value;
        var h = document.getElementById("CanvasHeight").value;
        if (w/h >= 0.25 && w/h <= 4 && h <= 5000 && w <= 5000) {
            sign.setWidth(w);
            sign.setHeight(h);
        } else {
            w = 633, h = 291
            sign.setWidth(633);
            sign.setHeight(291);
        }

        var colors = await r.ApplyColors();
        var words  = await r.GetRandomWord();
        var font   = await r.ApplyFont();
        const url = r.GetRandomLogo();
        sign.backgroundColor = colors.m1;

        //Logo
        if (document.getElementById('toggleLogo').checked) {
            fabric.loadSVGFromURL(url, function(objects) {
                objects.every(function(svg) {
                    console.log(svg);
                    svg.set({
                        originX: 'center',
                        originY: 'center',
                        fill: colors.h1
                    });
                    svg.scaleToWidth(w/1.75);
                    svg.scaleToHeight(h/1.75);
                    
                    sign.centerObject(svg);
                    sign.add(svg);
                    sign.moveTo(svg, -1); //z-index -1 is bottom
                    return false;
                });
            });
        }

        //Words
        var myfont = new FontFaceObserver(font);
        myfont.load().then(function () {
            var mainText = new fabric.Textbox(words[0], {
                fontFamily: font,
                width: Number(w),
                textAlign: "center",
                fill: colors.m2,
            });

            if(words[1] !== undefined){
                var subText = new fabric.Textbox(words[1], {
                    fontFamily: font,
                    width: Number(w),
                    textAlign: "center",
                    fill: colors.m2,
                    top: h/5
                });

                var group = new fabric.Group([ mainText, subText ], {});
            } else{
                var group = new fabric.Group([ mainText ], {});
            }
            sign.centerObject(group);
            sign.moveTo(group, 1); //z-index 1 is top
            sign.add(group); 
        });



    }

    async clear(){
        document.getElementById("splashScreen").style.display = 'none';
        sign.clear();
    }
}