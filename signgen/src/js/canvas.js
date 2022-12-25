var FontFaceObserver = require('fontfaceobserver');
const r = new random();
var sign = new fabric.Canvas("canvas_0");

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
        var effect = await r.GetRandomTextEffect(colors);
        var bgEffect = await r.GetRandomBackgound(colors, w, h);
        const url  = r.GetRandomLogo();
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

        //Background Effect
        if (bgEffect.length !== 0){
            sign.add(bgEffect[0]);
            sign.centerObject(bgEffect[0]);
        }

        //Words
        var myfont = new FontFaceObserver(font);
        myfont.load().then(function () {
            var mainText = new fabric.Textbox(words[0], {
                fontFamily: font,
                width: Number(w),
                textAlign: "center",
                fill: colors.m2,
                shadow: effect[0],
                stroke: colors.h1,
                strokeWidth: effect[1]
            });

            if(words[1] !== undefined){
                var subText = new fabric.Textbox(words[1], {
                    top: mainText.calcTextHeight(),
                    fontFamily: font,
                    width: Number(w),
                    textAlign: "center",
                    fill: colors.m2,
                    shadow: effect[0],
                    stroke: colors.h1,
                    strokeWidth: effect[1]
                });

                var group = new fabric.Group([ mainText, subText ], {});
            }
            if(words[2] !== undefined){
                var top = mainText.calcTextHeight()
                var group = new fabric.Group([mainText], {});
                if(words[1] !== undefined){
                    top += subText.calcTextHeight();
                    group.addWithUpdate(subText);
                }
                var footer = new fabric.Textbox(words[2], {
                    top: top,
                    fontFamily: font,
                    width: Number(w),
                    textAlign: "center",
                    fill: colors.m2
                });
                group.addWithUpdate(footer);
            } else if(words[1] == undefined && words[2] == undefined){
                var group = new fabric.Group([ mainText ], {});
            }
            sign.centerObject(group);
            sign.moveTo(group, 1); //z-index 1 is top
            sign.add(group); 
        });

        var consoleText = " COLORS: { " + colors.m1 + ", " + colors.m2 + ", " + colors.h1 + " }   " + "{ W: " + sign.width + " H: " + sign.height + " }   ";
        consoleText += "WORDS: { " + words[0] + ", " + words[1] + ", " + words[2]  + " }   ";
        consoleText += "FONT: { " + font + " }   ";
        document.getElementById('console_text').innerHTML = consoleText;
    }

    async clear(){
        document.getElementById("splashScreen").style.display = 'none';
        sign.clear();
    }
}


//console.log(sign_0);
//var signArr = [sign_0];
//let canvasDiv = document.getElementById("mainCanvas");

/*
//Dynamically creating canvases & adding them to array
for(i = 1; i < 10; i++){
    var canvas_dynamic = document.createElement('canvas');
    let id = "canvas_";
    id += i;
    canvas_dynamic.id     = id;
    canvas_dynamic.width  = 633;
    canvas_dynamic.height = 291;
    canvasDiv.append(canvas_dynamic);

    var obj = {};
    var newsign = new fabric.Canvas(canvas_dynamic.id);
    obj['sign_'+i] = newsign;
    console.log(newsign);
    signArr.push(obj);

}
*/