var gen_button = document.getElementById('gen_button');

if(gen_button){
    gen_button.addEventListener("click", function(){
        const canvasObject = new canvas(); // CANVAS CLASS NOT FABRIC
        canvasObject.createCanvases();
        canvasObject.generate();
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