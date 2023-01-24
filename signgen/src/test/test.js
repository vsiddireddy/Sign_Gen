var sign = new fabric.Canvas('canvas_0');

sign.backgroundColor="green";

var w = 633;
var h = 291;
var fontSize = w / 12;

var mainText = new fabric.Textbox("Testing", {
  fontSize: fontSize,
  width: Number(w),
  textAlign: "center",
  fill: "red",
});

var vtop = 0;
vtop += mainText.calcTextHeight();

var subText = new fabric.Textbox("Subtext", {
  top: vtop,
  fontSize: fontSize/2,
  width: Number(w),
  textAlign: "center",
  fill: "red",
});

var group = new fabric.Group([ mainText, subText ]);

group.center();
group.setCoords();

sign.add(group);
sign.renderAll();