var word1 = ["big", "jelly", "fun", "blue", "quick", "sweet", "john's", "cyborg", "nexus", "robot", "comic", "dark", "magic", "medical", "legal", "safe", "trippy", "water", "metal", "mars", "space", "dust", "death", "free", "used", "adult", "proton", "salted", "loud", "evil", "boring", "research", "quantum"];
var word2 = ["fish", "burgers", "antiques", "seafood", "diner", "hut", "shack", "gifts", "vpn", "movies", "sports", "university", "plaza", "medicine", "cyborgs", "spaceships", "rockets", "mining", "coffee", "hovertech", "physics", "universe", "donuts", "phones", "hub", "parking", "code", "tea", "shoes", "cab", "cart", "store", "bar", "books", "music"];
var word3 = ["open 24/7", "limited offer", "on sale", " ", " ", " "];
var fontSize = ["80px ", "85px "]
var smallFonts = ["50px ", "60px "]
var subFonts = ["25px ", "35px "]
var fontType1 = [ "Abel", "Abril Fatface", "Aclonica", "Advent Pro", "Aguafina Script", "Akronim", 
"Aladin", "Aldrich", "Alex Brush", "Alfa Slab One", "Allan", "Almendra", "Amarante", "Amatic SC", "Amethysta","Amiko", "Amita","Anaheim",
"Annie Use Your Telescope", "Antic", "Anton", "Arbutus","Archivo", "archivovfbeta", "Arsenal",
"Artifika", "Arya", "asapvfbeta", "Astloch", "Atomic Age", "Audiowide","Averia Libre", "Bad Script", 
"Bahiana","Baloo", "Baloo Bhai", "Barlow", "Barrio", "Bentham","Biryani", "Black Ops One", "Buenard"];

var fontType = ["Bungee","Chewy", "Coda","Codystar","Concert One", "Dokdo", "Eater", "Fascinate", "Flamenco", "Flavors", "Fruktur", "Gaegu", "Goblin One", "Hanalei", "Jaldi","Jolly Lodger", "K2D", "La Belle Aurore", "Lobster", "Mystery Quest", "Orbitron", "Oswald"];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomRgb(){

    var randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    var r = randomBetween(0, 255);
    var g = randomBetween(0, 255);
    var b = randomBetween(0, 255);

    var rand = getRandomInt(3);
    if(rand == 0){
        r = 0;
    }
    else if(rand = 1){
        g = 0;
    }
    else if(rand = 2){
        b = 0;
    }

    var rgb = `rgb(${r},${g},${b})`;

    return rgb;
}

function getRandomVal(){
    var randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    var v = randomBetween(0, 255);
    return v;  
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

function refresh_default(canvas) {
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

    //text
    text_a = word1[Math.floor(Math.random() * word1.length)]; 
    text_b = word2[Math.floor(Math.random() * word2.length)]; 
    text_c = word3[Math.floor(Math.random() * word3.length)]; 

    uppercase = getRandomInt(3);
    if(uppercase == 1){
        text_a = text_a.toUpperCase();
        text_b = text_b.toUpperCase();
    }


    fontalign = getRandomInt(4);
    fa_text = "center";
    if(fontalign == 0){
        fa_text = "center"; //Change to left later
    }

    ctx_a.font = fontSize[Math.floor(Math.random() * fontSize.length)] + fontType[Math.floor(Math.random() * fontType.length)]; 
    console.log(ctx_a.font);

    var shadow = getRandomInt(3);

    ctx_a.textAlign = fa_text;

    if(shadow == 1 || shadow == 2){
        ctx_a.fillStyle = shadowColor;
        ctx_a.fillText(text_a, canvas_a.width/1.95, canvas_a.height/2.2);
    }
    ctx_a.fillStyle = randomColor_b;
    ctx_a.fillText(text_a, canvas_a.width/2, canvas_a.height/2.2);

    if(shadow == 1 || shadow == 2){
        ctx_a.fillStyle = shadowColor;
        ctx_a.fillText(text_b, canvas_a.width/1.95, canvas_a.height/1.4);
    }
    ctx_a.fillStyle = randomColor_b;
    ctx_a.font = smallFonts[Math.floor(Math.random() * smallFonts.length)]; 
    ctx_a.fillText(text_b, canvas_a.width/2, canvas_a.height/1.4);


    ctx_a.textAlign = "center";
    ctx_a.font = "20px " + fontType[Math.floor(Math.random() * fontType.length)]; 
    ctx_a.font = subFonts[Math.floor(Math.random() * subFonts.length)]; 
    ctx_a.fillText(text_c, canvas_a.width/2, canvas_a.height/1.2);
}

i = 0;
while(i<50){
    refresh_default("canvas_a");
    refresh_default("canvas_b");
    refresh_default("canvas_c");
    refresh_default("canvas_d");
    refresh_default("canvas_e");
    refresh_default("canvas_f");
    refresh_default("canvas_g");
    refresh_default("canvas_h");
    refresh_default("canvas_i");
    i = i+1;
}


button.addEventListener("click", function(){refresh_default("canvas_a"); });
button.addEventListener("click", function(){refresh_default("canvas_b"); });
button.addEventListener("click", function(){refresh_default("canvas_c"); });
button.addEventListener("click", function(){refresh_default("canvas_d"); });
button.addEventListener("click", function(){refresh_default("canvas_e"); });
button.addEventListener("click", function(){refresh_default("canvas_f"); });
button.addEventListener("click", function(){refresh_default("canvas_g"); });
button.addEventListener("click", function(){refresh_default("canvas_h"); });
button.addEventListener("click", function(){refresh_default("canvas_i"); });