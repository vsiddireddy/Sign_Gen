var newCanvas = document.createElement("canvas");
newCanvas.id = "canvas_test";
content.appendChild(newCanvas);
var fabricCanvasObj = new fabric.Canvas(newCanvas);

var text = new fabric.Text('hello world', { left: 100, top: 100 });
newCanvas.add(text);

