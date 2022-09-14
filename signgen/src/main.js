const { shell } = require('electron');
var smallFonts = ["50px ", "60px "]
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
    var index = getRandomInt(66); // currently 66 fonts in corporateArr in json file. Need to make this dynamic
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
        if (getRandomInt(2) == 0)
            sub = json.corporate_subtext_optional[getRandomInt(json.corporate_subtext_optional.length)];
    }
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


async function refresh_default(canvas) {
    //canvas
    var canvas_a = document.getElementById(canvas);
    var ctx_a = canvas_a.getContext("2d");
    ctx_a.clearRect(0, 0, 633, 291);

    //colors
    var colors = await applyColors();
    console.log(colors);

    
    const randomColor_a = colors.m1;
    const randomColor_a1 = colors.m1;
    const randomColor_b = colors.m2
    const shadowColor = 'rgb(27, 27, 27)';

      //logo
      /*
      var baseImage = new Image();
      baseImage.src = '../assets/corporate/logos/PNG/JRO_D_Basic_' + (getRandomInt(199)+1) + '.png';
      var imageDimensions = (canvas_a.width + canvas_a.height)/7;
      baseImage.onload = async function() {
        ctx_a.drawImage(baseImage, canvas_a.width/4, canvas_a.height/2, imageDimensions, imageDimensions);
        ctx_a.globalCompositeOperation = "source-in";
        ctx_a.fillStyle = randomColor_b;
        ctx_a.fillRect(canvas_a.width/4, canvas_a.height/4, imageDimensions, imageDimensions);
        
        //background
        ctx_a.globalCompositeOperation = "destination-over";
        ctx_a.fillStyle = randomColor_a;
        ctx_a.fillRect(0, 0, canvas_a.width, canvas_a.height);
      };
      */
    
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
        ctx_a.fill();
    }

  
    

    //words
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

    var abc = await ApplyFont();
    console.log(abc);
    var shadow = getRandomInt(5);
    ctx_a.textAlign = fa_text;

    //shadows
    if(shadow == 1 || shadow == 2){
        ctx_a.globalCompositeOperation = "source-over";  
        ctx_a.fillStyle = shadowColor;
        if ((text_b == "" && text_c == "") || (wordsArr[3] == true)) {
            ctx_a.textBaseline = "middle";
        } else {
            ctx_a.textBaseline = "alphabetic";
        }
        //Shadow For Word 1
        ctx_a.fillText(text_a, canvas_a.width/1.97, canvas_a.height/1.97);
    } else {
        ctx_a.globalCompositeOperation = "source-over";  
        if ((text_b == "" && text_c == "") || (wordsArr[3] == true)) {
            ctx_a.textBaseline = "middle";

        } else {
            ctx_a.textBaseline = "alphabetic";
        }
    }
    
    //Word 1
    if(text_a != ""){
        ctx_a.globalCompositeOperation = "source-over";  
        ctx_a.fillStyle = randomColor_b;
        ctx_a.fillText(text_a, canvas_a.width/2, canvas_a.height/2);
    }

    if(shadow == 1 || shadow == 2){
        ctx_a.globalCompositeOperation = "source-over";  
        ctx_a.fillStyle = shadowColor;
        
        if ((text_b == "" && wordsArr[3] == false) || (wordsArr[3] == true)) {
            ctx_a.textBaseline = "middle";
        } else {
            ctx_a.textBaseline = "alphabetic";
        }
        
        //Shadow For Word 2
        ctx_a.fillText(text_b, canvas_a.width/1.97, canvas_a.height/1.4);
    } else {
        if ((text_b == "" && wordsArr[3] == false) || (wordsArr[3] == true)) {
            ctx_a.textBaseline = "middle";
        } else {
            ctx_a.textBaseline = "alphabetic";
        }
    }
    
    //Word 2
    if(text_b != ""){
        ctx_a.globalCompositeOperation = "source-over";  
        ctx_a.fillStyle = randomColor_b;
        ctx_a.fillText(text_b, canvas_a.width/2, canvas_a.height/1.4);
    }

    var sheet = window.document.styleSheets[0];
    var test = sheet.cssRules[1].cssText.split(';')[0].split(" ")[3];

    if(text_c != ""){
        ctx_a.globalCompositeOperation = "source-over";  
        ctx_a.textAlign = "center"; 
        var subSize = Math.round(0.06 * canvas_a.width) + "px ";
        ctx_a.font = (subSize) + abc + ", " + test;
        if (wordsArr[3] == true && wordsArr[2] != "") { // isprefix is true and text_b exists
            ctx_a.fillText(text_c, canvas_a.width/2, canvas_a.height/1.5);
        } else {
            ctx_a.fillText(text_c, canvas_a.width/2, canvas_a.height/1.2);
        }
    }

    var mainSize = (0.15 * canvas_a.width) + "px ";
    ctx_a.font = (mainSize) + abc + ", " + test;
    ctx_a.baseline = "middle";
}

i = 0;
while(i<5){
    refresh_default("canvas_a");
    document.getElementById("canvas_a").style.opacity = "0";
    i = i+1;
}

document.getElementById("gen_button").addEventListener("click", function(){
    document.getElementById("splashScreen").style.display = 'none';
    document.getElementById("canvas_a").style.opacity = "1";
    refresh_default("canvas_a");
 });

 document.getElementById("splashGen1").addEventListener("click", function(){
    shell.openExternal("https://docs.google.com/document/d/1yORIs_1CAE534QA2mogvGaLYn0Flw3iG3eOR9wnLhyk/edit?usp=sharing")
});

document.getElementById("splashGen2").addEventListener("click", function(){
    document.getElementById("splashScreen").style.display = 'none';
    document.getElementById("canvas_a").style.opacity = "1";
    refresh_default("canvas_a");
});

document.getElementById("filetypeBtn").addEventListener("click", function(){
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
    if (w/h >= 0.25 && w/h <= 4) {
        ctx_a.canvas.width = w;
        ctx_a.canvas.height = h;
        console.log("did change");
    } else {
        console.log("did not change");
    }
    console.log("RATIO: " + w/h);
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

document.getElementById("zmin").addEventListener("click", function(){
    var csize = getComputedStyle(document.getElementById('canvas_a')).zoom;
    document.getElementById("canvas_a").style.zoom = 1.2*csize;
});

document.getElementById("zmout").addEventListener("click", function(){
    var csize = getComputedStyle(document.getElementById('canvas_a')).zoom;
    document.getElementById("canvas_a").style.zoom = csize/1.2;
});

document.getElementById("lm-home").addEventListener("click", function(){
    document.getElementById("splashScreen").style.display = 'block';
    document.getElementById("canvas_a").style.opacity = "0";
});

document.getElementById("lm-refresh").addEventListener("click", function(){
    document.getElementById("splashScreen").style.display = 'none';
    document.getElementById("canvas_a").style.opacity = "100";
});

    
const {remote} = require('electron');
document.getElementById("x_button").addEventListener("click", function (){
    console.log("cxxxx");
    var window = remote.getCurrentWindow();
    window.destroy();
}); 
    