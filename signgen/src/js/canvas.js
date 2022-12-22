const r = new random();
var sign = new fabric.Canvas("canvas_back");

class canvas {

    async generate() {
        this.clear();

        //input values
        var w = document.getElementById("CanvasWidth").value;
        var h = document.getElementById("CanvasHeight").value;
        if (w/h >= 0.25 && w/h <= 4) {
            sign.setWidth(w);
            sign.setHeight(h);
        } else{
            w = 633, h = 291 //default values
            sign.setWidth(w);
            sign.setHeight(h);
        }

        //random values
        var colors = await r.ApplyColors();
        var words  = await r.GetRandomWord();
        var font   = await r.ApplyFont();

        //fabric
        sign.backgroundColor = colors.m1;

        var main_text = new fabric.Textbox(words[0], {
            width: Number(w),
            textAlign: "center"
        });
        sign.add(main_text);

        if(words[1] !== undefined){
            var sub_text = new fabric.Textbox(words[1], {
                width: Number(w),
                textAlign: "center"
            });
            sign.add(sub_text);
        }
    }

    async clear(){
        document.getElementById("splashScreen").style.display = 'none';
        sign.clear();
    }
}

