var sign = new fabric.Canvas('canvas_0');

sign.backgroundColor = "green";

var w = 633;
var h = 291;
var fontSize = w / 12;

var vtop = 0;
var mainText = new fabric.Textbox("Testing", {
  top: vtop,
  fontSize: fontSize,
  width: Number(w),
  textAlign: "center",
  fill: "red",
});

vtop += mainText.calcTextHeight();

var subText = new fabric.Textbox("Subtext", {
  top: vtop,
  fontSize: fontSize/2,
  width: Number(w),
  textAlign: "center",
  fill: "red",
});

var svgURL = '/signgen/assets/corporate/logos/SVG/JRO_D_Basic_' + 1 + '.svg';
var svgVar;
var group = new fabric.Group([], {});
fabric.loadSVGFromURL(svgURL, function(objects) {
  svgVar = objects[0].set({
      top: 0,
      fill: "blue"
  });
  svgVar.scaleToWidth(w/3);
  svgVar.scaleToHeight(h/3);
  svgVar.setCoords();
  sign.add(svgVar);
  svgVar.centerH();
});

sign.add(mainText);
sign.add(subText);

var objs = sign.getObjects();

var group = new fabric.Group(objs);

sign.centerObject(group);

sign.add(group);

sign.renderAll();
//sign.setActiveGroup(group).renderAll();

/*
//group = new fabric.Group([ mainText, subText ]);
var wordArr = [svgVar, mainText, subText];
wordArr.filter(item => typeof item !== undefined).forEach(item => {group.addWithUpdate(item)});
console.log(group);

sign.centerObject(group);
group.setCoords();

sign.setActiveGroup(group).renderAll();
*/