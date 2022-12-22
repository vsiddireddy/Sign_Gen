const r = new random();
var canvas_back = new fabric.Canvas("canvas_back");

class canvas {

    async generate() {
        this.clear();

        var w = document.getElementById("CanvasWidth").value;
        var h = document.getElementById("CanvasHeight").value;
        if (w/h >= 0.25 && w/h <= 4) {
            canvas_back.setWidth(w);
            canvas_back.setHeight(h);
        } else{
            w = 633, h = 291 
            canvas_back.setWidth(633);
            canvas_back.setHeight(291);
        }


        var colors = await r.ApplyColors();
        canvas_back.backgroundColor = colors.m1;

        var words = await r.GetRandomWord();
        var font = await r.ApplyFont();

        console.log(w);
        var text = new fabric.Textbox(words[0], {
            width: Number(w),
            textAlign: "center"
        });
  
        canvas_back.add(text);
    }

    async clear(){
        document.getElementById("splashScreen").style.display = 'none';
        canvas_back.clear();
    }
}

