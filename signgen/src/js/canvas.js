const r = new random();

class canvas {

    async generate() {
        document.getElementById("splashScreen").style.display = 'none';
        var canvas_back = new fabric.Canvas("canvas_back");

        canvas_back.setWidth(633);
        canvas_back.setHeight(291);
        
        var colors = await r.ApplyColors();
        canvas_back.backgroundColor = colors.m1;

        var words = await r.GetRandomWord();
        var font = await r.ApplyFont();
        canvas_back.add(new fabric.Text(words[0], { 
            fontFamily: font, 
            left: 100, 
            top: 100 
          }));

        //canvas_back.renderAll();
    }
}

