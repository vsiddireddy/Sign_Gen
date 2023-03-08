var sign = new fabric.Canvas('canvas_0');
sign.backgroundColor = "green";

var w = 913;
var h = 450;
var fontSize = w / 12;

//To get value for mainText.height
var testText = new fabric.Textbox("Testing", {
  fontSize: fontSize,
  width: Number(w),
  textAlign: "center",
});

var vtop = testText.height*2;
var mainText = new fabric.Textbox("Testing", {
    top: vtop,
    fontSize: fontSize,
    width: Number(w),
    textAlign: "center",
    fill: "red",
});

vtop += mainText.height;

var subText = new fabric.Textbox("Subtext", {
    top: vtop,
    fontSize: fontSize/2,
    width: Number(w),
    textAlign: "center",
    fill: "red",
});

var pngURL = '/signgen/assets/corporate/logos/PNG/JRO_D_Basic_1.png';

fabric.Image.fromURL(pngURL, function(img) {

    img.scaleToHeight(mainText.height * 2);
    img.scaleToWidth(mainText.height  * 2);
    sign.viewportCenterObjectH(img);
    img.set({
      top:  0,
    });
    var group = new fabric.Group([mainText, subText, img], {});
    sign.viewportCenterObjectV(group);
    sign.add(group);
});