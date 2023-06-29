var FontFaceObserver = require('fontfaceobserver');
const r = new random();
var sign = new fabric.Canvas("canvas_0");
var printDebug = true;
var canvasInstances = [];
var signList = [];
var usingOverlay = true;
var usingGradient = true;

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
        var index = 1;
        var totalSigns = document.getElementById('signTotal').value;
        var currentSigns = document.getElementsByClassName('canvas-container');
        //console.log("totalSigns: " + totalSigns);
        //console.log("currentSigns: " + currentSigns.length);
        if (totalSigns == currentSigns.length) {
            return;
        }
        if (currentSigns.length < totalSigns) {
            //console.log('reached less than');
            for (let x = currentSigns.length; x < totalSigns; x++) {
                var content = document.getElementById("mainCanvas");
                var newCanvas = document.createElement("canvas");
                newCanvas.id = "canvas_" + index;
                content.appendChild(newCanvas);
                var fabricCanvasObj = new fabric.Canvas(newCanvas);
                canvasInstances.push(fabricCanvasObj);
                index++;
            }
            return;
        }
        if (totalSigns != '' && currentSigns.length > totalSigns) {
            //console.log('reached greater than');
            var distance = currentSigns.length - totalSigns;
            //console.log(totalSigns);
            if (distance == 1) {
                currentSigns[totalSigns].remove();
                return;
            }
            for (var x = totalSigns; x < currentSigns.length; x++) {
                currentSigns[x].remove();
            }
            currentSigns[totalSigns].remove();
            return;
        }
    }

    signGen(sign, w, h, colors, words, font, effect, bgEffect, svgURL, isModifying) {
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

        if (colors == undefined) {
            var colors = r.ApplyColors();
        }
        console.log(colors);
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
        sign.backgroundColor = colors.m1;

        var top = 0;
        var group = new fabric.Group([], {});
        
        // Background Effect
        if (document.getElementById('toggleShape').checked) {
            console.log(bgEffect.length);
            if (bgEffect.length !== 0) {
                sign.add(bgEffect[0]);
                sign.centerObject(bgEffect[0]);
            }
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
                    /*
                    styles: {
                        0: {
                            0: { fill: 'red' },
                            1: { fill: 'black' },
                            2: { fill: 'black' },
                            3: { fill: 'blue' },
                            4: { fill: 'black' },
                            5: { fill: 'black' },
                            6: { fill: 'red' },
                            7: { fill: 'black' },
                            8: { fill: 'black' },
                            9: { fill: 'black' },
                            10: { fill: 'green' },
                            11: { fill: 'black' }
                        }
                    */
                });

                // unique text coloring TODO: needs to be cleaned up
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
                });
                
                /*
                //var pngURL = '../assets/corporate/logos/PNG/JRO_D_Basic_' + Math.floor(Math.random() * 200) + '.png';
                fabric.Image.fromURL(pngURL, function(img) {
                    img.scaleToHeight(mainText.height * 2);
                    img.scaleToWidth(mainText.height  * 2);
                    sign.viewportCenterObjectH(img);
                    img.set({
                      top:  0,
                    });
                    var group = new fabric.Group([], {});
                    var wordArr = [mainText, subText, img];
                    wordArr.filter(item => typeof item !== undefined).forEach(item => {group.addWithUpdate(item)});

                    //var group = new fabric.Group([mainText, subText, img], {});
                    sign.viewportCenterObjectV(group);
                    sign.add(group);
                });
                */
            }

            // Overlay Texture
            if (usingOverlay == true) {
                fabric.Image.fromURL('../assets/overlays/overlay_'+ Math.floor(Math.random() * 23) + '.jpg', function(oImg) {
            
                    oImg.scaleToWidth(sign.width);
                    oImg.globalCompositeOperation = 'overlay';
            
                    sign.add(oImg);
                    sign.renderAll();
                }, {crossOrigin: ''});
            }
        });

        var consoleText = " COLORS: { " + colors.m1 + ", " + colors.m2 + ", " + colors.h1 + " }   " + "W: {" + sign.width + "} H: {" + sign.height + " }   ";
        consoleText += "WORDS: { " + words[0] + ", " + words[1] + ", " + words[2]  + " }   ";
        consoleText += "FONT: { " + font + " }   ";
        if (printDebug) {
            document.getElementById('console_text').innerHTML = consoleText;
        } else {
            document.getElementById('console_text').innerHTML = '';
        }
        if (isModifying == false) {
            signList.push([w, h, colors, words, font, effect, bgEffect, svgURL]);
        }
    }

    generate(fabricCanvas, w, h, colors, words, font, effect, bgEffect, svgURL, isMod) {
        this.clear();
        this.signGen(sign, w, h, colors, words, font, effect, bgEffect, svgURL, false);
        // ALLOWS FOR MULTIPLE SIGNS
        if (isMod != true) {
            canvasInstances.forEach((sign) => {
                sign.clear();
                this.signGen(sign, w, h, colors, words, font, effect, bgEffect, svgURL, false);
            });
        }
        console.log(canvasInstances);
    }

    modify(fabricCanvas, w, h, colors, words, font, effect, bgEffect, svgURL) {
        //console.log(fabricCanvas);
        if (sign == fabricCanvas) {
            this.clear();
            this.signGen(fabricCanvas, w, h, colors, words, font, effect, bgEffect, svgURL, true);
            console.log("reached if statement!")
            return;
        }
        canvasInstances.forEach((sign) => {
            if (sign == fabricCanvas) {
                sign.clear();
                this.signGen(sign, w, h, colors, words, font, effect, bgEffect, svgURL, true);
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

Mousetrap.bind(['command+k', 'ctrl+k'], function() {
    printDebug = !printDebug;
});