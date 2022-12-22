
const r = new random();

async function generate() {
    var colors = await r.ApplyFont();
    console.log(colors);

}



generate();