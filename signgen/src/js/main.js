const puppeteer = require('puppeteer');
//const fs = require('fs');
var gen_button = document.getElementById('gen_button');
var mod_button = document.getElementById('mod_button');
const canvasObject = new canvas(); // CANVAS CLASS NOT FABRIC

if(gen_button){
    gen_button.addEventListener("click", function(){
        canvasObject.createCanvases();
        canvasObject.generate();
        /*
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://looka.com/business-name-generator/sports');
        const words = await page.evaluate(() => document.body.innerText);
        //console.log(words);
        fs.writeFile('courses.json', JSON.stringify(words), (err) => {
            if (err) throw err;
            console.log('File saved');
        });
        const arr = words.split("\n");
        //console.log(arr);
        for (var x = 23; x < arr.length; x++) {
            if (arr[x] != '' && arr[x] != 'Domains available' && arr[x].includes('•') == false && arr[x].includes('Copyright') == false) {
                console.log(arr[x]);
            }
        }
        await browser.close();
        */
    });
}

if (mod_button) {
    mod_button.addEventListener("click", function() {
        const retrievedData = canvasObject.getGlobalVar(); // CONTAINS CURRENT SIGN DATA
        console.log(retrievedData);

        var word1 = document.getElementById("modifyWord1").value;
        var word2 = document.getElementById("modifyWord2").value;
        var subtext = document.getElementById("modifySubtext").value;
        var color1 = document.getElementById("modifyColor1").value;
        var color2 = document.getElementById("modifyColor2").value;
        var color3 = document.getElementById("modifyColor3").value;
        var color4 = document.getElementById("modifyColor4").value;
        word1 = (word1 == '') ? retrievedData[3][0] : word1;
        word2 = (word2 == '') ? retrievedData[3][1] : word2;
        subtext = (subtext == '') ? retrievedData[3][2] : subtext;
        color1 = (color1 == '') ? retrievedData[2].m1 : color1;
        color2 = (color2 == '') ? retrievedData[2].m2 : color2;
        color3 = (color3 == '') ? retrievedData[2].h1 : color3;
        color4 = (color4 == '') ? retrievedData[2].h2 : color4;

        var colors = {
            m1: color1,
            m2: color2,
            h1: color3,
            h2: color4
        };
       
        canvasObject.generate(retrievedData[0], retrievedData[1], colors, [word1, word2, subtext], retrievedData[4], retrievedData[5], retrievedData[6], retrievedData[7]);
    });
}

document.getElementById("colorPicker").addEventListener('change', event => {
    document.getElementById("color1").value = document.getElementById("colorPicker").value;
  });

document.getElementById("lm-dl").addEventListener("click", function(){
    var link = document.createElement('a');
    if (document.getElementById("filetypeSelect").value == 'PNG') {
        link.download = 'sign.png';
    } else {
        link.download = 'sign.jpg';
    }
    link.href = document.getElementById('canvas_0').toDataURL();
    link.click();
});

document.getElementById("filetypeBtn").addEventListener("click", function(){
    var link = document.createElement('a');
    if (document.getElementById("filetypeSelect").value == 'PNG') {
        link.download = 'sign.png';
    } else {
        link.download = 'sign.jpg';
    }
    link.href = document.getElementById('canvas_0').toDataURL();
    link.click();
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