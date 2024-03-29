var FontFaceObserver = require('fontfaceobserver');
const r = new random();
var sign = new fabric.Canvas("canvas_0");
var canvasInstances = [];
var signList = [];

class canvas {

    getSign() {
        return sign;
    }

    getSignList() {
        return signList;
    }

    getCanvasInstances() {
        return canvasInstances;
    }

    createCanvases() {
        let canvasElements = document.querySelectorAll('.canvas-container > canvas');
        if (document.getElementById('signTotal').value == 1 || document.getElementById('signTotal').value.trim() === '' || isNaN(document.getElementById('signTotal').value)) {
            canvasElements.forEach(function(canvas) {
                canvas.style.transform = 'translate(-50%, -50%)';
                console.log(canvas.style.transform);
            });
        } else {
            canvasElements.forEach(function(canvas) {
                canvas.style.transform = 'translate(-100%, -100%)';
                console.log(canvas.style.transform);
            });
        }
        

        var index = 1;
        var totalSigns = document.getElementById('signTotal').value;
        var currentSigns = document.getElementsByClassName('canvas-container');
        if (totalSigns == currentSigns.length) {
            console.log("reached equal");
            return;
        }
        if (currentSigns.length < totalSigns) {
            console.log('reached less than');
            for (let x = currentSigns.length; x < totalSigns; x++) {
                var content = document.getElementById("mainCanvas");
                var newCanvas = document.createElement("canvas");
                newCanvas.id = "canvas_" + x;
                content.appendChild(newCanvas);
                var fabricCanvasObj = new fabric.Canvas(newCanvas);
                canvasInstances.push(fabricCanvasObj);
                index++;
            }
            return;
        }
        if (totalSigns != '' && currentSigns.length > totalSigns) {
            console.log('reached greater than');
            var distance = currentSigns.length - totalSigns;

            console.log("totalSigns: " + totalSigns);
            console.log("currentSigns: " + currentSigns.length);
            console.log("distance: " + distance);

            if (distance == 1) {
                currentSigns[totalSigns].remove();
                return;
            }

            for (var i = 0; i < distance; i++) {
                currentSigns[currentSigns.length - 1].remove();
            }


            return;
        }
    }

    async signGen(sign, w, h, colors, words, font, effect, bgEffect, svgURL, overlayURL, isModifying) {
        // Random/Input Values
        if (w == undefined) {
            var w = document.getElementById("CanvasWidth").value;
        }
        if (h == undefined) {
            var h = document.getElementById("CanvasHeight").value;
        }
        if (w/h >= 0.25 && w/h <= 4 && h <= 5000 && w <= 5000) {
            sign.setWidth(w);
            sign.setHeight(h);
        } else {
            w = 633, h = 291
            sign.setWidth(633);
            sign.setHeight(291);
        }
        if (isNaN(w)) {
            sign.setWidth(633);
        }
        if (isNaN(h)) {
            sign.setHeight(291);
        }

        if (colors == undefined) {
            var colors = r.ApplyColors();
        }
        if (words == undefined) {
            var words = r.GetRandomWord();
        }
        if (font == undefined) {
            var font = r.ApplyFont();
        }
        if (effect == undefined) {
            var effect = r.GetRandomTextEffect(colors);
        }
        if (bgEffect == undefined) {
            var bgEffect = r.GetRandomBackgound(colors, w, h);
        }
        if (svgURL == undefined) {
            var svgURL = '../assets/corporate/logos/SVG/JRO_D_Basic_' + Math.floor(Math.random() * 200) + '.svg';
        }
        if (overlayURL == undefined) {
            var overlayURL = '../assets/overlays/overlay_'+ Math.floor(Math.random() * 23) + '.jpg';
        }

        if(document.getElementById("toggleGradient").checked){
            sign.set('backgroundColor', new fabric.Gradient({
                //gradient options
                type: 'linear',
                gradientUnits: 'pixels', // or 'percentage'
                coords: { x1: 0, y1: 0, x2: sign.width, y2: sign.height},
                colorStops:[
                  { offset: 0, color: colors.h1 },
                  { offset: 1, color: colors.m1 }
                ]
              }));
        } else {
            sign.backgroundColor = colors.m1;
        }


        

        if(document.getElementById("toggleBorder").checked){
            var strokeWidth = Math.floor(Math.random() * 30) + 10; // width of the border
            var border = new fabric.Rect({
                width: w - strokeWidth,
                height: h - strokeWidth,
                stroke: colors.m2,  // color of the border
                strokeWidth: strokeWidth,
                fill: 'rgba(0,0,0,0)'  // the inside of the rectangle is transparent
            });
            if (document.getElementById('modify_menu').style.display == 'block') {
                border.selectable = true; // TODO
                console.log(1)
            } else {
                border.selectable = false;
                console.log(2)
            }
            sign.add(border);
        }
        

        var top = 0;
        var group = new fabric.Group([], {});
        
        // Background Effect
        if (document.getElementById('toggleShape').checked) {
            console.log(bgEffect.length);
            if (bgEffect.length !== 0) {
                sign.add(bgEffect[0]);
                sign.centerObject(bgEffect[0]);
            }
            //bgEffect[0].selectable = false; // TODO
        }



        // Words
        var myFont = new FontFaceObserver(font);
        myFont.load().then(function () {
            /*var mainText = new fabric.Textbox(words[0], {
                fontFamily: font,
                fontSize: w/12,
                width: Number(w),
                textAlign: "center",
                fill: colors.m2,
                shadow: effect[0],
                stroke: colors.h1,
                strokeWidth: effect[1]
            });*/

            //words[0] = 'S\na\nm\np\nl\ne\n'; // VERTICAL WORDS
            //var height = document.getElementById('canvasHeight').value;
            //var width  = document.getElementById('canvasWidth').value;
            var fontSize = w / 12;
            // VERTICAL SIGNS TODO (VERY RUDIMENTARY)
            if (h > w && h/w <= 4) {
                var str = '';
                var temp = words[0];
                for (var x = 0; x < words[0].length; x++) {
                    str += temp[x] + '\n';
                }
                //words[0] = 'S\na\nm\np\nl\ne\n'; // VERTICAL WORDS
                words[0] = str; // VERTICAL WORDS
                words[1] = undefined;
                words[2] = undefined;
                fontSize = w / (h / 100);
            }
            if (document.getElementById('toggleLogo').checked == false) {
                var mainText = new fabric.Textbox(words[0], {
                    fontFamily: font,
                    fontSize: fontSize,
                    width: Number(w),
                    textAlign: "center",
                    fill: colors.m2,
                    shadow: effect[0],
                    stroke: colors.h1,
                    top: top,
                    strokeWidth: effect[1]

                });

                var colorArray = ['purple', 'red', 'green', 'blue'];
                var str =  {
                    0: {
                        0: { fill: 'purple' },
                        1: { fill: 'red' }
                    }
                };

                let count = 0;
                var styleObject = { 0: {} };
                for (var k = 0; k < words[0].length; k++) {
                    if (count >= colorArray.length) {
                        count = 0;
                    }
                    var objName = k;
                    var objValue = colorArray[count];
                    styleObject[0][objName] = {fill: objValue};
                    count++;
                }
                //console.log(styleObject);
                // TODO
                mainText.set({
                    //styles: styleObject
                });

                //console.log("h/3: " + h/3);
                //console.log("before maintext top: " + top);
                top += mainText.calcTextHeight();
                //console.log('before subtext top/after maintext: ' + top);
                if(words[1] !== undefined){
                    var subText = new fabric.Textbox(words[1], {
                        fontFamily: font,
                        fontSize: w/12,
                        width: Number(w),
                        textAlign: "center",
                        fill: colors.m2,
                        shadow: effect[0],
                        stroke: colors.h1,
                        strokeWidth: effect[1]
                    });
                    var subTop = subText.calcTextHeight();
                    //console.log('after subTop: ' + subTop);
                    mainText.set({ top: subTop });
                    top += subTop;
                }
                
                if(words[2] !== undefined){
                    var footer = new fabric.Textbox(words[2], {
                        top: top,
                        fontFamily: font,
                        fontSize: mainText.fontSize/2.5,
                        width: Number(w),
                        textAlign: "center",
                        fill: colors.m2
                    });  
                    //console.log('after subtext top: ' + top);
                } 

                var wordArr = [mainText, subText, footer];
                wordArr.filter(item => typeof item !== undefined).forEach(item => {group.addWithUpdate(item)});

                sign.centerObject(group);
                sign.moveTo(group, 1); //z-index 1 is top
                sign.add(group);
                if (document.getElementById('modify_menu').style.display == 'block') {
                    group.selectable = true;
                } else {
                    group.selectable = false; // TODO
                }
                //console.log("group: ");
                //console.log(group);
                //console.log("wordArr: " + wordArr);
                //console.log('logo is NOT toggled')
            } else { // logo is checked
                var fontSize = w / 12;
                console.log(words[0])
                console.log(words[1])

                //To get value for mainText.height
                var testText = new fabric.Textbox(words[0], {
                    fontFamily: font,
                    fontSize: fontSize,
                    width: Number(w),
                    textAlign: "center",
                    fill: colors.m2,
                    shadow: effect[0],
                    stroke: colors.h1,
                    strokeWidth: effect[1]
                });
                
                var vtop = testText.height * 2;
                var mainText = new fabric.Textbox(words[0], {
                    top: vtop,
                    fontFamily: font,
                    fontSize: fontSize,
                    width: Number(w),
                    textAlign: "center",
                    fill: colors.m2,
                    shadow: effect[0],
                    stroke: colors.h1,
                    strokeWidth: effect[1]
                });
                
                vtop += mainText.height;
                
                var subText;
                if (words[1] != undefined) {
                    subText = new fabric.Textbox(words[1], {
                        top: vtop,
                        fontFamily: font,
                        fontSize: fontSize/2,
                        width: Number(w),
                        textAlign: "center",
                        fill: colors.m2,
                        shadow: effect[0],
                        stroke: colors.h1,
                        strokeWidth: effect[1]
                    });
                }

                

                //var svgURL = '../assets/corporate/logos/SVG/JRO_D_Basic_' + Math.floor(Math.random() * 200) + '.svg';
                fabric.loadSVGFromURL(svgURL, function(objects, options) {
                    var img = objects[0];
                    img.scaleToHeight(mainText.height * 2);
                    img.scaleToWidth(mainText.height  * 2);
                    sign.viewportCenterObjectH(img);
                    img.set({
                      top:  0,
                      fill: colors.m2
                    });
                    var group = new fabric.Group([], {});
                    var wordArr = [mainText, subText, img];
                    wordArr.filter(item => typeof item !== undefined).forEach(item => {group.addWithUpdate(item)});
                    sign.viewportCenterObjectV(group);
                    sign.add(group);
                    if (document.getElementById('modify_menu').style.display == 'block') {
                        group.selectable = true;
                    } else {
                        group.selectable = false; // TODO
                    }
                });
                
            }

            // Overlay Texture
            if (document.getElementById("toggleOverlay").checked) {
                fabric.Image.fromURL(overlayURL, function(oImg) {
            
                    oImg.scaleToWidth(sign.width);
                    oImg.globalCompositeOperation = 'overlay';
                    if (document.getElementById('modify_menu').style.display == 'block') {
                        oImg.selectable = true;
                    } else {
                        oImg.selectable = false; // TODO
                    }
                    sign.add(oImg);
                    sign.renderAll();
                }, {crossOrigin: ''});
            }
        });

        var consoleText = " COLORS: { " + colors.m1 + ", " + colors.m2 + ", " + colors.h1 + " }   " + "W: {" + sign.width + "} H: {" + sign.height + " }   ";
        consoleText += "WORDS: { " + words[0] + ", " + words[1] + ", " + words[2]  + " }   ";
        consoleText += "FONT: { " + font + " }   ";

        document.getElementById('console_text').innerHTML = consoleText;

        if (isModifying == false) {
            signList.push([w, h, colors, words, font, effect, bgEffect, svgURL, overlayURL]);
        }
    }

    generate(fabricCanvas, w, h, colors, words, font, effect, bgEffect, svgURL, overlayURL, isMod) {
        this.clear();
        this.signGen(sign, w, h, colors, words, font, effect, bgEffect, svgURL, overlayURL, false);
        // ALLOWS FOR MULTIPLE SIGNS
        if (isMod != true) {
            canvasInstances.forEach((sign) => {
                sign.clear();
                this.signGen(sign, w, h, colors, words, font, effect, bgEffect, svgURL, overlayURL, false);
            });
        }
        console.log(canvasInstances);
    }

    modify(fabricCanvas, w, h, colors, words, font, effect, bgEffect, svgURL, overlayURL) {
        //console.log(fabricCanvas);
        if (sign == fabricCanvas) {
            this.clear();
            this.signGen(fabricCanvas, w, h, colors, words, font, effect, bgEffect, svgURL, overlayURL, true);
            console.log("reached if statement!")
            return;
        }
        canvasInstances.forEach((sign) => {
            if (sign == fabricCanvas) {
                sign.clear();
                this.signGen(sign, w, h, colors, words, font, effect, bgEffect, svgURL, overlayURL, true);
                console.log("reached for loop if statement!")
                return;
            }
        });
    }

    clear(){
        document.getElementById("splashScreen").style.display = 'none';
        sign.clear();
        //console.clear();
    }
}

