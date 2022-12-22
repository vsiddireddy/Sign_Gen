const r = new random();

class canvas {

    async generate() {
        var colors = await r.ApplyFont();
        console.log(colors);
    }
}

/*
async function generate() {
    var colors = await r.ApplyFont();
    console.log(colors);
}
*/

//generate();