var gen_button = document.getElementById('gen_button');

if(gen_button){
    console.log("gen button exists");
    gen_button.addEventListener("click", function(){
        const canvasObject = new canvas();
        canvasObject.generate();
     });
}

document.getElementById("toggleLogo").addEventListener("change", function (event) {
    if (event.target.checked) {
        console.log("Checked");
    } else {
        console.log("Not checked");
    }
});

document.getElementById("filetypeBtn").addEventListener("click", function(){
    var link = document.createElement('a');
    if (document.getElementById("filetypeSelect").value == 'PNG') {
        link.download = 'sign.png';
    } else {
        link.download = 'sign.jpg';
    }
    link.href = document.getElementById('canvas_back').toDataURL();
    link.click();
});

document.getElementById("splashGen1").addEventListener("click", function(){
    shell.openExternal("https://docs.google.com/document/d/1yORIs_1CAE534QA2mogvGaLYn0Flw3iG3eOR9wnLhyk/edit?usp=sharing")
});

document.getElementById("splashGen2").addEventListener("click", function(){
    document.getElementById("splashScreen").style.display = 'none';
    document.getElementById("canvas_back").style.opacity = "1";
    refresh_default("canvas_back", "canvas_text", "canvas_post");
});

document.getElementById("zmin").addEventListener("click", function(){
    var csize = getComputedStyle(document.getElementById('canvas_back')).zoom;
    document.getElementById("canvas_back").style.zoom = 1.2*csize;
});

document.getElementById("zmout").addEventListener("click", function(){
    var csize = getComputedStyle(document.getElementById('canvas_back')).zoom;
    document.getElementById("canvas_back").style.zoom = csize/1.2;
});

document.getElementById("lm-home").addEventListener("click", function(){
    document.getElementById("splashScreen").style.display = 'block';
    document.getElementById("canvas_back").style.opacity = "0";
});

document.getElementById("lm-refresh").addEventListener("click", function(){
    document.getElementById("splashScreen").style.display = 'none';
    document.getElementById("canvas_back").style.opacity = "100";
});