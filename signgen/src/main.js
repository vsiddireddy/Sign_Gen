const { shell } = require('electron');
var Mousetrap = require('mousetrap');
const faker = require('faker');
var smallFonts = ["50px ", "60px "]
var printDebug = true;
document.body.style.zoom = "100%";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//Colors
async function applyColors() {
    const response = await fetch("../assets/corporate/colors_corporate/color_list_corporate.json");
    const json = await response.json();

    var maxIndex = Object.keys(json.corporateArr).length;
    var index = getRandomInt(maxIndex);

    var colors = json.corporateArr[index]; 
    return colors;
}

async function printJSON() {
    var index = getRandomInt(50);
    const response = await fetch("../fonts.json");
    const json = await response.json();
    var fullFont = json.corporateArr[index];
    var font = fullFont.split("-")[0];
    var fontURL = '../Fonts/Corporate/' + font + '/' + fullFont + '.ttf';
    var css = '@font-face { font-family: ' + "'" + font + "'; " + 'src: url(' + "'" + fontURL + "'" + ') format("truetype"); }';
    var sheet = window.document.styleSheets[0];
    sheet.insertRule(css);
    document.getElementById('font-style-sheet').style.fontFamily = font;
}

async function ApplyFont() {
    var index = getRandomInt(66); // currently 66 fonts in corporateArr in json file. Need to make this dynamic TODO
    const response = await fetch("../assets/corporate/font_list_corporate.json");
    const json = await response.json();
    //console.log(json);
    var fullFont = json.corporateArr[index]; // gets specific kind of font (BioRhyme-ExtraLight)
    var font = fullFont.split("-")[0]; // gets family name of font  (BioRhyme)
    var fontURL = '../assets/corporate/fonts_corporate/' + font + '/' + fullFont + '.ttf'; // creates filepath for font
    var css = '@font-face { font-family: ' + "" + font + "; " + 'src: url(' + "'" + fontURL + "'" + ') format("truetype"); }'; // creates css rule for the specific font
    var sheet = window.document.styleSheets[0];
    sheet.insertRule(css); // adds new font into css file
    return font;
}

async function GetRandomLogo(ctx_a, colors) {
    // ctx_a is using canvas_post
    var index = getRandomInt(200);
    var svgURL = '../assets/corporate/logos/SVG/JRO_D_Basic_' + index + '.svg';
    var img = new Image();
    if (document.getElementById("toggleLogo").checked) {
        img.src = svgURL;
        img.onload = async function() {
            var scale = 8;
            var x = (ctx_a.canvas.width  - (img.width / scale)) / 2;
            var y = (ctx_a.canvas.height - (img.height / scale)) / 2;

            // draw color
            //var colors = await applyColors();
            ctx_a.fillStyle = colors.m2;
            //ctx_a.fillStyle = "#09f";
            ctx_a.fillRect(x, y, img.width / scale, img.height / scale);

            // set composite mode
            ctx_a.globalCompositeOperation = "destination-atop";

            // draw image
            ctx_a.drawImage(img, x, y, img.width / scale, img.height / scale);
        }
    }
    //return svgURL;
}

async function RandomCapitilization(w1, w2, isPrefix) {
    //console.log(w2 == null);
    console.log('RandomCapitilization: ' + w1 + " : " + w2);
    var index = getRandomInt(4);
    if (index == 0) { // all uppercase
        w1 = w1.toUpperCase();
    } else if (index == 1) { // all lowercase
        w1 = w1.toLowerCase();
    } else if (index == 2) {
        w1 = w1.replace(/^./, w1[0].toUpperCase());
    }
    if (w2 != undefined) {
        if (index == 0) { // all uppercase
            w2 = w2.toUpperCase();
        } else if (index == 1) {
            w2 = w2.toLowerCase();
        } else if (index == 2) {
            w2 = w2.replace(/^./, w2[0].toUpperCase());
        }
    }
    return [w1, w2];
    /*
    if (isPrefix) {
        var index = getRandomInt(3);
        if (index == 0) { // all uppercase
            w1 = w1.toUpperCase();
            if (w2 != undefined)
                w2 = w2.toUpperCase();
        } else if (index == 1) { // all lowercase
            w1 = w1.toLowerCase();
            var secondWordCase = getRandomInt(2);
            if (secondWordCase == 0) { // w2 all uppercase
                if (w2 != undefined)
                    w2 = w2.toUpperCase();
            } else {
                if (w2 != undefined)
                    w2 = w2.toLowerCase();
            }
        } else if (index == 2) { // first letter in w1 is uppercase, rest is lowercase
            w1 = w1.replace(/^./, w1[0].toUpperCase());
            var secondWordCase = getRandomInt(2);
            if (secondWordCase == 0) {
                if (w2 != undefined)
                    w2 = w2.replace(/^./, w2[0].toUpperCase());
            } else {
                if (w2 != undefined)
                    w2 = w2.toLowerCase();
            }
        }
    } else {
        var index = getRandomInt(3);
        if (index == 0) {
            w1 = w1.replace(/^./, w1[0].toUpperCase());
            if (w2 != undefined)
                w2 = w2.replace(/^./, w2[0].toUpperCase());
        } else if (index == 1) {
            w1 = w1.toUpperCase();
            if (w2 != undefined)
                w2 = w2.toUpperCase();
        } else if (index == 2) {
            w1 = w1.toLowerCase();
            if (w2 != undefined)
                w2 = w2.toLowerCase();
        }
    }
    return [w1, w2];
    */
}

async function GetRandomWord(userInput, category) {
    var w1;
    var w2;
    var sub;
    var wordArr = [
        faker.commerce.product(), faker.company.companyName(), faker.database.engine(), faker.address.city(), faker.name.firstName(), 
        faker.commerce.productAdjective(), faker.commerce.department(), faker.commerce.productName(), faker.commerce.productMaterial(), 
        faker.company.bs(), faker.finance.accountName(), faker.animal.type(), faker.commerce.department(), faker.vehicle.vehicle(),
        faker.vehicle.manufacturer()
    ];
    var subArr = [
        faker.address.latitude(), faker.address.longitude(), faker.address.direction(), faker.commerce.price(), faker.internet.domainName(),
        faker.address.city(), faker.finance.amount(), faker.phone.phoneNumber(), faker.datatype.uuid(), faker.address.streetName(),
        faker.address.streetAddress(), faker.company.companySuffix()
    ];
    var word1Num = getRandomInt(14);
    var word2Num = getRandomInt(14);
    while (word1Num == word2Num) {
        word2Num = getRandomInt(14);
    }
    var subNum = getRandomInt(12);
    var choiceNum = getRandomInt(2);
    if (choiceNum == 0) {
        w1 = wordArr[word1Num];
        console.log('BEFORE W1: ' + w1);
        while (w1 == undefined) {
            w1 = wordArr[getRandomInt(14)];
        }
        console.log('AFTER W1: ' + w1);
    } else if (choiceNum == 1) {
        w1 = wordArr[word1Num];
        w2 = wordArr[word2Num];
        console.log('BEFORE W1/W2: ' + w1 + " : " + w2);
        while (w1 == undefined) {
            w1 = wordArr[getRandomInt(14)];
        }
        while (w2 == undefined) {
            w2 = wordArr[getRandomInt(14)];
        }
        console.log('AFTER W1/W2: ' + w1 + " : " + w2);
    }
    if (getRandomInt(2) == 0) {
        sub = subArr[subNum];
    }
    //var wordArr = await RandomCapitilization(w1, w2, false);
    //console.log('CHOICENUM: ' + choiceNum);
    //console.log(word1Num + " : " + word2Num);
    //console.log(w1 + " : " + w2);
    wordArr = await RandomCapitilization(w1, w2, false);
    return [wordArr[0], wordArr[1], sub, false];
    /*
    var w1;
    var w2;
    var sub;
    var isPrefix = false;
    const response = await fetch("../assets/corporate/word_list_corporate.json");
    const json = await response.json();
    var index = getRandomInt(3);
    if (index == 0) { // word1 combo
        w1 = json.corporate_w1[getRandomInt(json.corporate_w1.length)];
    } else if (index == 1) { // word1 word2 combo
        w1 = json.corporate_w1[getRandomInt(json.corporate_w1.length)];
        w2 = json.corporate_w2[getRandomInt(json.corporate_w2.length)];
        if (getRandomInt(2) == 0)
            sub = json.corporate_subtext_optional[getRandomInt(json.corporate_subtext_optional.length)];
    } else if (index == 2) { // prefix suffix combo
        isPrefix = true;
        w1 = json.corporate_prefixes[getRandomInt(json.corporate_prefixes.length)];
        while (true) {
            var temp = json.corporate_prefixes[getRandomInt(json.corporate_prefixes.length)];
            if (temp != w1) {
                w2 = temp;
                break;
            }
        }
        if (getRandomInt(2) == 0)
            sub = json.corporate_subtext_optional[getRandomInt(json.corporate_subtext_optional.length)];
    }
    var wordArr = await RandomCapitilization(w1, w2, isPrefix);
    return [wordArr[0], wordArr[1], sub, isPrefix];
    */
}

async function SelectFontLayout(w1, w2, sub, isPrefix) {
    var wordSize; // font size for w1/w2
    var subSize; // font size for sub
    const response = await fetch("../assets/corporate/font_list_corporate.json");
    const json = await response.json();
    var fontFamilyName = json.corporateArr[index].split("-")[0]; // gets family name of font  (BioRhyme)
    var font = json.corporateArr[index]; // gets specific kind of font (BioRhyme-ExtraLight)
    if (isPrefix == true) {
        wordSize = fontSize[0]; // rest of code doesn't run since prefix and suffix are w1 and w2
    }
    if (w2 == null) { // picks one of the bigger fonts based on word length
        if (w1.length > 7) {
            wordSize = fontSize[0];
        } else {
            wordSize = fontSize[1];
        }
    } else {
        wordSize = smallFonts[0];
    }

    if (sub != null) {
        subSize = subFonts[0];
    } else {
        subsize = null;
    }
    return [wordSize, subSize];
}

async function cropImageFromCanvas(ctx) {
    var canvas = ctx.canvas, 
      w = canvas.width, h = canvas.height,
      pix = {x:[], y:[]},
      imageData = ctx.getImageData(0,0,canvas.width,canvas.height),
      x, y, index;
    
    for (y = 0; y < h; y++) {
      for (x = 0; x < w; x++) {
        index = (y * w + x) * 4;
        if (imageData.data[index+3] > 0) {
          pix.x.push(x);
          pix.y.push(y);
        } 
      }
    }
    pix.x.sort(function(a,b){return a-b});
    pix.y.sort(function(a,b){return a-b});
    var n = pix.x.length-1;
    
    w = 1 + pix.x[n] - pix.x[0];
    h = 1 + pix.y[n] - pix.y[0];
    var cut = ctx.getImageData(pix.x[0], pix.y[0], w, h);
  
    canvas.width = w;
    canvas.height = h;
    ctx.putImageData(cut, 0, 0);
          
    var image = canvas.toDataURL();
  }

async function refresh_default(canvas1, canvas2, canvas3) {
    //refresh_default("canvas_back", "canvas_text", "canvas_post");
    var consoleText = "";
    var colors = await applyColors();
    refresh_text(canvas2, colors);
    refresh_post(canvas3, colors);
    refresh_back(canvas1, colors);
}

async function refresh_back(canvas, colors) {
    //canvas
    var canvas_back = document.getElementById(canvas);
    var ctx_a = canvas_back.getContext("2d");
    ctx_a.clearRect(0, 0, 633, 291);
    //GetRandomLogo(ctx_a);
    //colors
    //var colors = await applyColors();
    const randomColor_a = colors.m1;
    const randomColor_a1 = colors.m1;
    const randomColor_b = colors.m2;
    consoleText = " COLORS: { " + colors.m1 + ", " + colors.m2 + ", " + colors.h1 + " }   " + "{ W: " + canvas_back.width + " H: " + canvas_back.height + " }   ";
    
    //Fill Background
    ctx_a.fillStyle = randomColor_a;
    ctx_a.fillRect(0, 0, canvas_back.width, canvas_back.height);

    //Fill Border
    var rngBorder = getRandomInt(2);
    if (rngBorder == 1) {
        ctx_a.strokeRect(0, 0, canvas_back.width, canvas_back.height);
        canvas_back.style.border = '2px solid ' + randomColor_b; // adjust as needed
    } else {
        canvas_back.style.border = 'none';
    }
     
    //Artifacts
    ctx_a.fillStyle = randomColor_a1;
    ctx_a.beginPath();

    artifact = getRandomInt(2);
    if (artifact == 0){
        ctx_a.fillRect(0, canvas_back.height/5, canvas_back.width, canvas_back.height/1.5);
        ctx_a.stroke();
    }
    else if(artifact == 1){
        ctx_a.arc(canvas_back.width/2, canvas_back.height/2, 90, 0, 2 * 3*Math.PI*2);
        ctx_a.fill();
    }
}

async function refresh_post(canvas, colors) {
    //canvas
    var canvas_post = document.getElementById(canvas);
    var ctx_a = canvas_post.getContext("2d");
    ctx_a.clearRect(0, 0, 633, 291);
    GetRandomLogo(ctx_a, colors);
}

async function refresh_text(canvas, colors) {
    //canvas
    var canvas_back = document.getElementById(canvas);
    var ctx_a = canvas_back.getContext("2d");
    ctx_a.clearRect(0, 0, 633, 291);

    //colors
    //var colors = await applyColors();
    const randomColor_a = colors.m1;
    const randomColor_a1 = colors.m1;
    const randomColor_b = colors.m2;
    var consoleText = " COLORS: { " + colors.m1 + ", " + colors.m2 + ", " + colors.h1 + " }   " + "{ W: " + canvas_back.width + " H: " + canvas_back.height + " }   ";
    

    //Words
    var wordsArr = await GetRandomWord();
    text_a = wordsArr[0];
    if (wordsArr[1] != undefined) {
        text_b = wordsArr[1];
    } else {
        text_b = "";
    }
    if (wordsArr[2] != undefined) {
        text_c = wordsArr[2];
    } else {
        text_c = "";
    }
    if (wordsArr[3]) { // isPrefix == true
        if (getRandomInt(3) == 0) {
            text_a = '#' + wordsArr[0] + wordsArr[1];
            text_c = "";
        } else {
            text_a = wordsArr[0] + wordsArr[1];
        }
        text_b = "";
    }
    consoleText = "WORDS: { " + text_a + ", " + text_b + ", " + text_c  + " }   " + consoleText;

    if (document.getElementById("word1").value != "") {
        text_a = document.getElementById("word1").value;
        if (document.getElementById("word2").value != "") {
            text_b = document.getElementById("word2").value;
        } else {
            text_b = "";
        }
        text_c = "";
    }

    var abc = await ApplyFont();
    consoleText = "FONT: { " + abc + " }   " + consoleText;
    var shadow = 0;
    if(colors.h1 != ""){
        shadow = getRandomInt(4);   
    }
    
    //Choose Font/Size
    var sheet = window.document.styleSheets[0];
    var test = sheet.cssRules[1].cssText.split(';')[0].split(" ")[3];
    var randSize = getRandomInt(5)/100;
    var randMS = 0.11 + randSize;
    var mainSize = Math.round(randMS * canvas_back.width) + "px ";
    ctx_a.font = (mainSize) + abc + ", " + test;
    ctx_a.baseline = "middle";

    //Shadow For Word 1
    if(shadow == 1 || shadow == 2){
        ctx_a.globalCompositeOperation = "source-over";  
        ctx_a.fillStyle = colors.h1;
        if ((text_b == "" && text_c == "") || (wordsArr[3] == true)) {
            ctx_a.textBaseline = "middle";
            console.log("middle");
        } else {
            ctx_a.textBaseline = "alphabetic";
            console.log("alphabetic");
        }
        ctx_a.fillText(text_a, canvas_back.width/1.97, canvas_back.height/1.97);
    } else {
        ctx_a.globalCompositeOperation = "source-over";  
        if ((text_b == "" && text_c == "") || (wordsArr[3] == true)) {
            ctx_a.textBaseline = "middle";
            console.log("middle");

        } else {
            ctx_a.textBaseline = "alphabetic";
            console.log("alphabetic");
        }
    }

    //Draw Word 1
    if(text_a != ""){
        ctx_a.globalCompositeOperation = "source-over";  
        ctx_a.fillStyle = randomColor_b;
        ctx_a.fillText(text_a, canvas_back.width/2, canvas_back.height/2);
    }

    //Draw Shadow For Word 2
    if(shadow == 1 || shadow == 2){
        ctx_a.globalCompositeOperation = "source-over";  
        ctx_a.fillStyle = colors.h1;
        
        if ((text_b == "" && wordsArr[3] == false) || (wordsArr[3] == true)) { //if main text is single line
            ctx_a.textBaseline = "middle";
        } else {
            ctx_a.textBaseline = "top";
        }
        ctx_a.fillText(text_b, canvas_back.width/1.97, (canvas_back.height/2));
    } else {
        if ((text_b == "" && wordsArr[3] == false) || (wordsArr[3] == true)) { //if main text is single line
            ctx_a.textBaseline = "middle";
        } else {
            ctx_a.textBaseline = "top";
        }
    }
    
    //Draw Word 2
    if(text_b != ""){
        ctx_a.globalCompositeOperation = "source-over";  
        ctx_a.fillStyle = randomColor_b;
        ctx_a.fillText(text_b, canvas_back.width/2, canvas_back.height/2);
    }

    //Draw Subtext
    if(text_c != ""){
        console.log(test);
        console.log(abc);

        let metrics = ctx_a.measureText(text_a);
        let actualHeight = (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) * 0.9;

        ctx_a.globalCompositeOperation = "source-over";  
        ctx_a.textAlign = "center"; 
        ctx_a.textBaseline = "top";

        var randSS = 0.02 + randSize;
        var subSize = Math.round(randSS * canvas_back.width) + "px ";
        
        ctx_a.font = (subSize) + abc + ", " + test;
        if ((wordsArr[3] == true) && (wordsArr[2] != "")) { //if text_b doesn't exist
            console.log(actualHeight);
            ctx_a.fillText(text_c, canvas_back.width/2, (canvas_back.height/2)+((actualHeight)*0.8));
        } else {
            console.log(actualHeight);
            ctx_a.fillText(text_c, canvas_back.width/2, (canvas_back.height/2)+((actualHeight)*1.4));
        }
    }

    console.log(consoleText);
    if (printDebug) {
        document.getElementById("console_text").innerHTML = consoleText;
    } else {
        document.getElementById("console_text").innerHTML = '';
    }
}

document.getElementById("toggleLogo").addEventListener("change", function (event) {
    if (event.target.checked) {
        console.log("Checked");
    } else {
        console.log("Not checked");
    }
});

document.getElementById("gen_button").addEventListener("click", function(){
    document.getElementById("splashScreen").style.display = 'none';
    document.getElementById("canvas_back").style.opacity = "1";

    var canvas_back = document.getElementById("canvas_back");
    var canvas_text = document.getElementById("canvas_text");
    var canvas_post = document.getElementById("canvas_post");
    var ctx_a = canvas_back.getContext("2d");
    var ctx_b = canvas_text.getContext("2d");
    var ctx_c = canvas_post.getContext("2d");

    var w = document.getElementById("CanvasWidth").value;
    var h = document.getElementById("CanvasHeight").value;
    if (w/h >= 0.25 && w/h <= 4) {
        ctx_a.canvas.width = w, ctx_a.canvas.height = h;
        ctx_b.canvas.width = w, ctx_b.canvas.height = h;
        ctx_c.canvas.width = w, ctx_c.canvas.height = h;
        console.log("did change");
    } else {
        console.log("did not change");
    }

    /*var canvas = new fabric.Canvas('c');
    var rect = new fabric.Rect({
      left: 100,
      top: 150,
      fill: 'red',
      width: 200,
      height: 20
    });
    canvas.add(rect);*/
    refresh_default("canvas_back", "canvas_text", "canvas_post");
 });

 Mousetrap.bind(['command+k', 'ctrl+k'], function() {
    printDebug = !printDebug;
});

 Mousetrap.bind('space', function() {
    document.getElementById("splashScreen").style.display = 'none';
    document.getElementById("canvas_back").style.opacity = "1";
    refresh_default("canvas_back", "canvas_text", "canvas_post");
 });

 Mousetrap.bind('q', function() {
    var csize = getComputedStyle(document.getElementById('canvas_back')).zoom;
    var csize = getComputedStyle(document.getElementById('canvas_text')).zoom;
    var csize = getComputedStyle(document.getElementById('canvas_post')).zoom;
    document.getElementById("canvas_back").style.zoom = 1.2 * csize;
    document.getElementById("canvas_text").style.zoom = 1.2 * csize;
    document.getElementById("canvas_post").style.zoom = 1.2 * csize;
 });

 Mousetrap.bind('w', function() {
    var csize = getComputedStyle(document.getElementById('canvas_back')).zoom;
    var csize = getComputedStyle(document.getElementById('canvas_text')).zoom;
    var csize = getComputedStyle(document.getElementById('canvas_post')).zoom;
    document.getElementById("canvas_back").style.zoom = csize / 1.2;
    document.getElementById("canvas_text").style.zoom = csize / 1.2;
    document.getElementById("canvas_post").style.zoom = csize / 1.2;
 });

 /*
 document.addEventListener("wheel", function(e) {
    const mainCanvas = document.getElementById('mainCanvas');
    let zoom = 3;
    if (e.deltaY > 0) {
        mainCanvas.style.transform = `scale(${(zoom += 0.06)})`;
    } else {
        mainCanvas.style.transform = `scale(${(zoom -= 0.06)})`;
    }
});
*/

 document.getElementById("splashGen1").addEventListener("click", function(){
    shell.openExternal("https://docs.google.com/document/d/1yORIs_1CAE534QA2mogvGaLYn0Flw3iG3eOR9wnLhyk/edit?usp=sharing")
});

document.getElementById("splashGen2").addEventListener("click", function(){
    document.getElementById("splashScreen").style.display = 'none';
    document.getElementById("canvas_back").style.opacity = "1";
    refresh_default("canvas_back", "canvas_text", "canvas_post");
    //refresh_text("canvas_text");
    //refresh_post("canvas_post");
    //refresh_back("canvas_back");
});

document.getElementById("filetypeBtn").addEventListener("click", function(){
    var canvas = document. getElementById("canvas_back");
    var anchor = document.createElement("a");
    if (document.getElementById("filetypeSelect").value == 'PNG') {
        anchor.href = canvas.toDataURL("image/png");
    } else {
        anchor.href = canvas.toDataURL("image/jpg");
    }
    if (document.getElementById("filetypeSelect").value == 'PNG') {
        anchor.download = "IMAGE.PNG";
    } else {
        anchor.download = "IMAGE.JPG";
    }
    anchor.click();
});

document.getElementById("UpdateCanvas").addEventListener("click", function(){
    var ctx_a = canvas_back.getContext("2d");
    var w = document.getElementById("CanvasWidth").value;
    var h = document.getElementById("CanvasHeight").value;
    if (w/h >= 0.25 && w/h <= 4) {
        ctx_a.canvas.width = w;
        ctx_a.canvas.height = h;
        console.log("did change");
    } else {
        console.log("did not change");
    }
    console.log("RATIO: " + w/h);
});

document.getElementById("canvas_back").addEventListener("contextmenu", function(ev){
    ev.preventDefault();
    var image_png = document.getElementById("canvas_back").toDataURL("image/png");

    var download = document.createElement('a');
    download.href = image_png;
    download.download = "canvas.png";

    var evObj = document.createEvent('MouseEvents');
    evObj.initEvent( "click", true, false );
    download.dispatchEvent(evObj)

    }, false);

document.getElementById("zmin").addEventListener("click", function(){
    var csize = getComputedStyle(document.getElementById('canvas_back')).zoom;
    var csize = getComputedStyle(document.getElementById('canvas_text')).zoom;
    var csize = getComputedStyle(document.getElementById('canvas_post')).zoom;
    document.getElementById("canvas_back").style.zoom = 1.2*csize;
    document.getElementById("canvas_text").style.zoom = 1.2*csize;
    document.getElementById("canvas_post").style.zoom = 1.2*csize;
});

document.getElementById("zmout").addEventListener("click", function(){
    var csize = getComputedStyle(document.getElementById('canvas_back')).zoom;
    var csize = getComputedStyle(document.getElementById('canvas_text')).zoom;
    var csize = getComputedStyle(document.getElementById('canvas_post')).zoom;
    document.getElementById("canvas_back").style.zoom = csize/1.2;
    document.getElementById("canvas_text").style.zoom = csize/1.2;
    document.getElementById("canvas_post").style.zoom = csize/1.2;
});

document.getElementById("lm-home").addEventListener("click", function(){
    document.getElementById("splashScreen").style.display = 'block';
    document.getElementById("canvas_back").style.opacity = "0";
});

document.getElementById("lm-refresh").addEventListener("click", function(){
    document.getElementById("splashScreen").style.display = 'none';
    document.getElementById("canvas_back").style.opacity = "100";
}); 

/*
// Make the DIV element draggable:
dragElement(document.getElementById("mainCanvas"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;
  
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
*/


//FONT: { Sora } WORDS: { PAZ, , } COLORS: { #386641, #bc4749, #f2e8cf } { W: 633 H: 291 }
//^^MISALLIGBED FONT