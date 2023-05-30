const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;
const { GoogleAuth } = require("google-auth-library");
var gen_button = document.getElementById('gen_button');
var mod_button = document.getElementById('mod_button');
const canvasObject = new canvas(); // CANVAS CLASS NOT FABRIC

if(gen_button){
    gen_button.addEventListener("click", function(){
        canvasObject.createCanvases();
        canvasObject.generate();
        //APIcall();
    });
}

function APIcall() {
    const MODEL_NAME = "models/text-bison-001";
    const API_KEY = "AIzaSyDBZ2Wi5aLD9eX7O4wdl8N08dEBcV3griw";
    
    const client = new TextServiceClient({
        authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });
    
    const prompt = "Can you give me ideas for my IT consulting business name,";
    
    client
        .generateText({
        model: MODEL_NAME,
        prompt: {
            text: prompt,
        },
        })
        .then((result) => {
        console.log(JSON.stringify(result));
        });
}

if (mod_button) {
    mod_button.addEventListener("click", function() {
        const retrievedData = canvasObject.getSignList(); // CONTAINS CURRENT SIGN DATA
        console.log(retrievedData);
        var totalSigns = document.getElementById('signTotal').value;
        console.log(totalSigns);
        var startingSignPos = retrievedData.length - totalSigns;
        var newList = [];
        for (var x = startingSignPos; x < retrievedData.length; x++) {
            newList.push(retrievedData[x]);
        }
        console.log(newList);
        var signNumValue = document.getElementById("signNum").value - 1;
        var customSign = newList[signNumValue];
        console.log(customSign);
        var canvasInstances = canvasObject.getCanvasInstances();
        var fabricCanvas = undefined;
        if (signNumValue > 0) {
            fabricCanvas = canvasInstances[signNumValue - 1];
        } else {
            fabricCanvas = canvasObject.getSign(); // TODO initialize canvas to first sign by default instead of undefined
        }
        console.log(fabricCanvas);
        

        // Modify sign fields
        var word1 = document.getElementById("modifyWord1").value;
        var word2 = document.getElementById("modifyWord2").value;
        var subtext = document.getElementById("modifySubtext").value;
        var color1 = document.getElementById("modifyColor1").value;
        var color2 = document.getElementById("modifyColor2").value;
        var color3 = document.getElementById("modifyColor3").value;
        var color4 = document.getElementById("modifyColor4").value;
        word1 = (word1 == '') ? customSign[3][0] : word1;
        word2 = (word2 == '') ? customSign[3][1] : word2;
        subtext = (subtext == '') ? customSign[3][2] : subtext;
        color1 = (color1 == '') ? customSign[2].m1 : color1;
        color2 = (color2 == '') ? customSign[2].m2 : color2;
        color3 = (color3 == '') ? customSign[2].h1 : color3;
        color4 = (color4 == '') ? customSign[2].h2 : color4;
        

        // m1 - background color
        // m2 - text color
        // m3 - shadow color
        // m4 - stroke color
        var colors = {
            m1: color1,
            m2: color2,
            h1: color3,
            h2: color4
        };
       
        // generate removes print statements. comment out to see debugging.
        canvasObject.modify(fabricCanvas, customSign[0], customSign[1], colors, [word1, word2, subtext], customSign[4], customSign[5], customSign[6], customSign[7]);
        console.log("--------------------");
    });
}

function downloadSVG() {
    var link = document.createElement('a');
    if (document.getElementById("filetypeSelect").value == 'PNG') {
        link.download = 'sign.png';
    } else if (document.getElementById("filetypeSelect").value == 'JPG') {
        link.download = 'sign.jpg';
    } else {
        var sign = canvasObject.getSign();
        var svg = sign.toSVG();
        var blob = new Blob([svg], {type: 'image/svg+xml'});
        var url = URL.createObjectURL(blob);
        link.download = 'canvas.svg'; // name of the downloaded file
        link.href = url; // creating an url
        link.click();
        return;
    }
    link.href = document.getElementById('canvas_0').toDataURL();
    link.click();
}

document.getElementById("colorPicker").addEventListener('change', event => {
    document.getElementById("color1").value = document.getElementById("colorPicker").value;
});

document.getElementById("lm-dl").addEventListener("click", function(){
    downloadSVG();
});

document.getElementById("filetypeBtn").addEventListener("click", function(){
    downloadSVG();
});

document.getElementById("splashGen1").addEventListener("click", function(){
    shell.openExternal("https://docs.google.com/document/d/1yORIs_1CAE534QA2mogvGaLYn0Flw3iG3eOR9wnLhyk/edit?usp=sharing")
});

document.getElementById("splashGen2").addEventListener("click", function(){
    document.getElementById("splashScreen").style.display = 'none';
    document.getElementById("canvas_0").style.opacity = "1";
    refresh_default("canvas_0", "canvas_text", "canvas_post");
});

document.getElementById("zmin").addEventListener("click", function(){
    var csize = getComputedStyle(document.getElementsByClassName('canvas-container')[0]).zoom;
    document.getElementsByClassName("canvas-container")[0].style.zoom = 1.2*csize;
});

document.getElementById("zmout").addEventListener("click", function(){
    var csize = getComputedStyle(document.getElementsByClassName('canvas-container')[0]).zoom;
    document.getElementsByClassName("canvas-container")[0].style.zoom = csize/1.2;
});

document.getElementById("lm-home").addEventListener("click", function(){
    document.getElementById("splashScreen").style.display = 'block';
    document.getElementById("canvas_0").style.opacity = "0";
});

document.getElementById("lm-refresh").addEventListener("click", function(){
    document.getElementById("splashScreen").style.display = 'none';
    document.getElementById("canvas_0").style.opacity = "100";
});