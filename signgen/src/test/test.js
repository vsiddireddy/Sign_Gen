
var sign = new fabric.Canvas('canvas_0');
var sign1 = new fabric.Canvas('canvas_1');
var sign2 = new fabric.Canvas('canvas_2');

sign.backgroundColor = "green";
sign1.backgroundColor = "red";
sign2.backgroundColor = "blue";

var w = 913;
var h = 450;
var fontSize = w / 12;

var pngURL = '/signgen/assets/corporate/logos/PNG/JRO_D_Basic_1.png';
var pngURL1 = '/signgen/assets/corporate/logos/PNG/JRO_D_Basic_2.png';
var pngURL2 = '/signgen/assets/corporate/logos/PNG/JRO_D_Basic_3.png';


//TEMPLATE 1
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
    fill: "white",
});

vtop += mainText.height;

var subText = new fabric.Textbox("Subtext", {
    top: vtop,
    fontSize: fontSize/2,
    width: Number(w),
    textAlign: "center",
    fill: "white",
});

fabric.Image.fromURL(pngURL, function(img) {
  img.scaleToHeight(mainText.height * 2);
  img.scaleToWidth(mainText.height  * 2);
  sign.viewportCenterObjectH(img);

  var group = new fabric.Group([mainText, subText, img], {});
  sign.viewportCenterObjectV(group);
    sign.add(group);
});


//TEMPLATE 2
var testText1 = new fabric.Textbox("Testing", {
  fontSize: fontSize,
  width: Number(w),
  textAlign: "left",
});

var vtop = testText1.height*2;
var mainText1 = new fabric.Textbox("Testing", {
    top: vtop,
    fontSize: fontSize,
    textAlign: "left",
    fill: "white",
});

vtop += mainText1.height;

var subText1 = new fabric.Textbox("Subtext", {
    top: vtop,
    fontSize: fontSize/2,
    textAlign: "left",
    fill: "white",
});

fabric.Image.fromURL(pngURL1, function(img1) {
  img1.scaleToHeight(mainText1.height * 2);
  img1.scaleToWidth(mainText1.height  * 2);

  // Setting the position for the image
  img1.set({
      left: 0,   // image starts from the far-left
      top: (h - img1.height) / 2  // vertically centered
  });

  // Adjust the position of the mainText1 to the right of the image
  mainText1.set({
      left: 200,  // 10 pixels gap for clarity
      top: img1.top + 20  // aligned to the top of the image
  });

  // Adjust the position of the subText1 below mainText1 and to the right of the image
  subText1.set({
      left: 210,  // 10 pixels gap for clarity
      top: mainText1.top + mainText1.height 
  });

  // Create the group
  var group1 = new fabric.Group([img1, mainText1, subText1], {
      left: w / 2,  // horizontal center
      top: h / 2,   // vertical center
      originX: 'center',
      originY: 'center'
  });

  sign1.add(group1);
});



//TEMPLATE 3
var testText2 = new fabric.Textbox("Testing", {
  fontSize: fontSize,
  width: Number(w),
  textAlign: "center",
});

var vtop = testText2.height*2;
var mainText2 = new fabric.Textbox("Testing", {
    top: vtop,
    fontSize: fontSize,
    textAlign: "center",
    fill: "white",
});

vtop += mainText2.height;

var subText2 = new fabric.Textbox("Subtext", {
    top: vtop,
    fontSize: fontSize/2,
    textAlign: "center",
    fill: "white",
});

fabric.Image.fromURL(pngURL2, function(img2) {
  img2.scaleToHeight(mainText2.height * 2);
  img2.scaleToWidth(mainText2.height  * 2);

  // Setting the position for the image
  img2.set({
      left: 0,   // image starts from the far-left
      top: (h - img2.height) / 2  // vertically centered
  });

  // Adjust the position of the mainText1 to the right of the image
  mainText2.set({
      left: 200,  // 10 pixels gap for clarity
      top: img2.top + 20  // aligned to the top of the image
  });

  // Adjust the position of the subText1 below mainText1 and to the right of the image
  subText2.set({
      left: 250,  // 10 pixels gap for clarity
      top: mainText2.top + mainText2.height 
  });

  // Create the group
  var group2 = new fabric.Group([img2, mainText2, subText2], {
      left: w / 2,  // horizontal center
      top: h / 2,   // vertical center
      originX: 'center',
      originY: 'center'
  });

  sign2.add(group2);
});