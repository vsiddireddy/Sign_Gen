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

    //Fill Background
    ctx_a.fillStyle = randomColor;
    ctx_a.fillRect(0, 0, canvas_a.width/6, canvas_a.height);

    //Invert Color
    const invertedColor = invertColor(randomColor);
    ctx_a.beginPath();
    ctx_a.rect(100, 0, canvas_a.width/6, canvas_a.height);
    ctx_a.fillStyle =  "blue";
    ctx_a.fill();
}

//Converts rgb(r,g,b) to array 
async function rgbToArray(rgb){
    rgb = rgb.substring(4, rgb.length-1)
         .replace(/ /g, '')
         .split(',');
    return rgb;
}

//Invert Colors
async function invertColor(rgb) {
    rgb = rgbToArray(rgb);
    console.log(rgb[0])

    rgb[0] = 255 - rgb[0];
    rgb[1] = 255 - rgb[1];
    rgb[2] = 255 - rgb[2];

    var irgb = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
    //console.log(irgb)
    return irgb;
}

//On Click
document.getElementById("button").addEventListener("click", function(){refresh_default("canvas_a"); });


