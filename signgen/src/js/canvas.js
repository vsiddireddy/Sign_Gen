

main();

async function main() {
    const r = new random();
    var colors = await r.ApplyFont();
    console.log(colors);

}