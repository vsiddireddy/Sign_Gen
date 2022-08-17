async function refresh_default(canvas) {
    var canvas_a = document.getElementById(canvas);
    var ctx_a = canvas_a.getContext("2d");
    ctx_a.clearRect(0, 0, 600, 200);

    //Get Random RGB Values
    var randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    var r = randomBetween(0, 255);
    var g = randomBetween(0, 255);
    var b = randomBetween(0, 255);

    const randomColor = `rgb(${r},${g},${b})`;

    var section = 0;
    //Fill Background
    ctx_a.fillStyle = randomColor;
    ctx_a.fillRect(section, 0, canvas_a.width/6, canvas_a.height);

    //Darken Color
    var darkerColor = await darkenColor(randomColor);
    ctx_a.beginPath();
    ctx_a.rect(section + 100, 0, canvas_a.width/6, canvas_a.height);
    ctx_a.fillStyle =  darkerColor; //"blue";
    ctx_a.fill();

    var compColor = await invertColor(darkerColor);
    ctx_a.beginPath();
    ctx_a.rect(section, 0, canvas_a.width/6, canvas_a.height/2);
    ctx_a.fillStyle =  compColor; //"blue";
    ctx_a.fill();

    while (section <= 600){
        //Darken Color
        darkerColor = await darkenColor(darkerColor);
        ctx_a.beginPath();
        section = section + 100;
        ctx_a.rect(section, 0, canvas_a.width/6, canvas_a.height);
        ctx_a.fillStyle =  darkerColor; //"blue";
        ctx_a.fill();

        //Get Complementary
        compColor = await invertColor(darkerColor);
        ctx_a.beginPath();
        ctx_a.rect(section, 0, canvas_a.width/6, canvas_a.height/2);
        ctx_a.fillStyle =  compColor; //"blue";
        ctx_a.fill();
    }
}

//Converts rgb(r,g,b) to array 
async function rgbToArray(rgb){
    rgb = rgb.substring(4, rgb.length-1)
         .replace(/ /g, '')
         .split(',');
    //console.log(rgb)
    return rgb;
}

//Invert Colors
async function invertColor(rgb) {
    var argb = await rgbToArray(rgb);
    console.log(argb)

    argb[0] = 255 - argb[0];
    argb[1] = 255 - argb[1];
    argb[2] = 255 - argb[2];

    var irgb = `rgb(${argb[0]},${argb[1]},${argb[2]})`
   // console.log("I_RGB", irgb)
    return irgb;
}

//Lighten Colors
async function darkenColor(rgb) {
    var argb = await rgbToArray(rgb);
    console.log(argb)

    argb[0] = argb[0] - 25;
    argb[1] = argb[1] - 25;
    argb[2] = argb[2] - 25;

    var drgb = `rgb(${argb[0]},${argb[1]},${argb[2]})`
    return drgb;
}

//On Click
document.getElementById("button").addEventListener("click", function(){refresh_default("canvas_a"); });


