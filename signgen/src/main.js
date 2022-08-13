var smallFonts = ["50px ", "60px "]
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//COLORS

function randomRelation(r, g, b){
    
    val = getRandomInt(3);
    if(val == 0){
        //return getSimilarColor(r, g, b);
        r = r+80;
        g = g+80;
        b = b+80;
    }
    else if(val == 1){
        //return getOppositeColor(r, g, b);
        r = r+200;
        g = g+200;
        b = b+200;
    }
    else if(val == 2){
        //return getOppositeColor(r, g, b);
        r = r-80;
        g = g-80;
        b = b-80;
    }
    
    return `rgb(${r},${g},${b})`;
}

async function refresh_default(canvas) {
    //printJSON();
    //GetRandomWord();
    console.log(document.getElementById("word1").value);
    var canvas_a = document.getElementById(canvas);
    var ctx_a = canvas_a.getContext("2d");
    ctx_a.clearRect(0, 0, 633, 291);

    var randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    var r = randomBetween(0, 255);
    var g = randomBetween(0, 255);
    var b = randomBetween(0, 255);

    //Get Bright Colors?
    if(r > 200){
        g = getRandomInt(90);
        b = getRandomInt(90);
    }
    if(g > 200){
        r = getRandomInt(90);
        b = getRandomInt(90);
    }
    if(b > 200){
        g = getRandomInt(90);
        r = getRandomInt(90);
    }

    a1 = getRandomInt(2);
    if(a1 == 0){
        a1_val = 20;
    }
    else{
        a1_val = 100;
    }
    const randomColor_a = `rgb(${r},${g},${b})`;
    const randomColor_a1 = `rgb(${r-a1_val},${g-a1_val},${b-a1_val})`;
    const randomColor_b = randomRelation(r, g, b); //or opposite
    const shadowColor = 'rgb(27, 27, 27)';
    
    //background
    ctx_a.fillStyle = randomColor_a;
    ctx_a.fillRect(0, 0, canvas_a.width, canvas_a.height);

    //artifacts
    ctx_a.fillStyle = randomColor_a1;
    ctx_a.beginPath();

    artifact = getRandomInt(5);
    if (artifact == 0){
        ctx_a.fillRect(0, canvas_a.height/5, canvas_a.width, canvas_a.height/1.5);
        ctx_a.stroke();
    }
    else if(artifact == 1){
        ctx_a.arc(canvas_a.width/2, canvas_a.height/2, 90, 0, 2 * 3*Math.PI*2);
      //  ctx_a.scale(2, 1);
        //ctx_a.arc(20, 21, 10, 0, Math.PI*2, false);
        ctx_a.fill();
    }
 
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
        //text_a = wordsArr[0] + wordsArr[1];
        if (getRandomInt(3) == 0) {
            text_a = '#' + wordsArr[0] + wordsArr[1];
            text_c = "";
        } else {
            text_a = wordsArr[0] + wordsArr[1];
        }
        text_b = ""; 
    }
    console.log("WORDSARR: ");
    console.log(wordsArr);

    if (document.getElementById("word1").value != "") {
        text_a = document.getElementById("word1").value;
        if (document.getElementById("word2").value != "") {
            text_b = document.getElementById("word2").value;
        } else {
            text_b = "";
        }
        text_c = "";
    }

    fontalign = getRandomInt(4);
    fa_text = "center";
    if(fontalign == 0){
        fa_text = "center"; //Change to left later
    }

    //ctx_a.font = fontSize[Math.floor(Math.random() * fontSize.length)] + fontType[Math.floor(Math.random() * fontType.length)]; 
    var abc = await ApplyFont();
    //var signFontSizes = await SelectFontLayout();
    //console.log("abc: " + abc);
    //ctx_a.font = "'" + "80px " + abc + "'"; // TODO
    //console.log("ctx_a.font: " + ctx_a.font);

    //rasterizeHTML.drawHTML('<div style="font-family: Chivo1;">random code</div>', canvas_a);

    var shadow = getRandomInt(3);

    ctx_a.textAlign = fa_text;

    if(shadow == 1 || shadow == 2){
        ctx_a.fillStyle = shadowColor;
        if ((text_b == "" && wordsArr[3] == false) || (wordsArr[3] == true)) {
            //ctx_a.fillText(text_a, canvas_a.width/2, canvas_a.height/2);
            ctx_a.textBaseline = "middle";
            console.log("MADE IT IN IF TEXT_B = ''");
        } else {
            ctx_a.textBaseline = "alphabetic";
            console.log("RANDOM TEST PRINT");
            //ctx_a.fillText(text_a, canvas_a.width/1.95, canvas_a.height/2.2);
        }
        ctx_a.fillText(text_a, canvas_a.width/1.95, canvas_a.height/2.2);
    } else {
        if ((text_b == "" && wordsArr[3] == false) || (wordsArr[3] == true)) {
            //ctx_a.fillText(text_a, canvas_a.width/2, canvas_a.height/2);
            ctx_a.textBaseline = "middle";
            console.log("MADE IT IN IF TEXT_B = '' 2");
        } else {
            ctx_a.textBaseline = "alphabetic";
            console.log("RANDOM TEST PRINT 2");
            //ctx_a.fillText(text_a, canvas_a.width/1.95, canvas_a.height/2.2);
        }
    }
    ctx_a.fillStyle = randomColor_b;
    ctx_a.fillText(text_a, canvas_a.width/2, canvas_a.height/2.2);

    if(shadow == 1 || shadow == 2){
        ctx_a.fillStyle = shadowColor;
        ctx_a.fillText(text_b, canvas_a.width/1.95, canvas_a.height/1.4);
        if ((text_b == "" && wordsArr[3] == false) || (wordsArr[3] == true)) {
            ctx_a.textBaseline = "middle";
        } else {
            ctx_a.textBaseline = "alphabetic";
        }
    } else {
        if ((text_b == "" && wordsArr[3] == false) || (wordsArr[3] == true)) {
            ctx_a.textBaseline = "middle";
        } else {
            ctx_a.textBaseline = "alphabetic";
        }
    }
    ctx_a.fillStyle = randomColor_b;
    //ctx_a.font = smallFonts[Math.floor(Math.random() * smallFonts.length)];
    ctx_a.fillText(text_b, canvas_a.width/2, canvas_a.height/1.4);

    var sheet = window.document.styleSheets[0];
    console.log(abc);
    console.log("SHEET!");
    console.log(sheet.cssRules[1].cssText.split(';')[0].split(" ")[3]);
    // sheet.cssRules[1] gets same font as abc
    var test = sheet.cssRules[1].cssText.split(';')[0].split(" ")[3];

    ctx_a.textAlign = "center";
    ctx_a.font = "30px " + abc + ", " + test;
    //ctx_a.font = "subFonts[Math.floor(Math.random() * subFonts.length)]"; 
    ctx_a.fillText(text_c, canvas_a.width/2, canvas_a.height/1.2);
    ctx_a.font = "80px " + abc + ", " + test;
    console.log(text_c);

    var baseImage = new Image();
    baseImage.src = '../assets/corporate/logos/JRO_D_Basic_1.png';
    baseImage.onload = function() {
        //ctx_a.drawImage(baseImage, 0, 0, baseImage.width / 8, baseImage.height / 8);
     };
}

i = 0;
while(i<1){
    //refresh_default("canvas_a");
    i = i+1;
}
refresh_default("canvas_a");

//printJSON();
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
    var index = getRandomInt(66); // currently 66 fonts in corporateArr in json file. Need to make this dynamic
    const response = await fetch("../assets/corporate/font_list_corporate.json");
    const json = await response.json();
    //console.log(json);
    var fullFont = json.corporateArr[index]; // gets specific kind of font (BioRhyme-ExtraLight)
    var font = fullFont.split("-")[0]; // gets family name of font  (BioRhyme)
    var fontURL = '../assets/corporate/fonts_corporate/' + font + '/' + fullFont + '.ttf'; // creates filepath for font
    var css = '@font-face { font-family: ' + "" + font + "; " + 'src: url(' + "'" + fontURL + "'" + ') format("truetype"); }'; // creates css rule for the specific font
    var sheet = window.document.styleSheets[0];
    //console.log("SHEET: ");
    //console.log(sheet);
    sheet.insertRule(css); // adds new font into css file
    //console.log(css.split("'")[1]);
    console.log("JSON CORPORATE ARR LENGTH: " + json.corporateArr.length);
    return font;
}

async function RandomCapitilization(w1, w2, isPrefix) {
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
            console.log("INDEX IS 2: w1: " + w1 + " w2: " + w2);
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
    console.log("isPrefix: " + isPrefix);
    console.log("RandomCapitilization w1: " + w1);
    console.log("RandomCapitilization w2: " + w2);
    return [w1, w2];
}

async function GetRandomWord(userInput, category) {
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
        //w2 = json.corporate_suffixes[getRandomInt(json.corporate_suffixes.length)];
        if (getRandomInt(2) == 0)
            sub = json.corporate_subtext_optional[getRandomInt(json.corporate_subtext_optional.length)];
    }
    console.log("---------");
    console.log("w1: " + w1);
    console.log("w2: " + w2);
    console.log("sub: " + sub);
    console.log(index);
    //SelectFontLayout(w1, w2, sub, isPrefix);
    var wordArr = await RandomCapitilization(w1, w2, isPrefix);
    return [wordArr[0], wordArr[1], sub, isPrefix];
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

document.getElementById("button").addEventListener("click", function(){refresh_default("canvas_a"); });

document.getElementById("filetypeBtn").addEventListener("click", function(){
    console.log("triggered download button");
    var canvas = document. getElementById("canvas_a");
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
    var ctx_a = canvas_a.getContext("2d");
    var w = document.getElementById("CanvasWidth").value;
    var h = document.getElementById("CanvasHeight").value;
    ctx_a.canvas.width =  w;
    ctx_a.canvas.height = h;
});

document.getElementById("canvas_a").addEventListener("contextmenu", function(ev){
    ev.preventDefault();
    var image_png = document.getElementById("canvas_a").toDataURL("image/png");

    var download = document.createElement('a');
    download.href = image_png;
    download.download = "canvas.png";

    var evObj = document.createEvent('MouseEvents');
    evObj.initEvent( "click", true, false );
    download.dispatchEvent(evObj)

    }, false);