var generate_menu = document.getElementById('generate_menu'),
    modify_menu = document.getElementById('modify_menu'),
    bottom_menu = document.getElementById('bottom_menu');

var home_button = document.getElementById('lm-home'),
    generate_button = document.getElementById('lm-refresh'),
    generate_sign_button = document.getElementById('gen_button'),
    modify_button = document.getElementById('lm-modify'),
    download_button = document.getElementById('lm-dl');
    start_button = document.getElementById('splashGen2');

function switchToGenerate() {
    console.log("generatemenu");
    if (!generate_menu) return;
  
    document.getElementById("canvas_0").style.opacity = "100";
  
    generate_menu.style.display = 'block';
    modify_menu.style.display = 'none';
    bottom_menu.style.display = 'block';
    resetColorsExcept(generate_button);
  }

Mousetrap.bind('q', function() {
    var elements = document.getElementsByClassName('canvas-container');
    var csize = getComputedStyle(elements[0]).zoom;
    elements[0].style.zoom = csize * 1.2;
    for (var x = 1; x < elements.length; x++) {
        //console.log(elements[x]);
        elements[x].style.zoom = csize * 1.2;
    }
});

Mousetrap.bind('w', function() {
    var elements = document.getElementsByClassName('canvas-container');
    var csize = getComputedStyle(elements[0]).zoom;
    elements[0].style.zoom = csize / 1.2;
    for (var x = 1; x < elements.length; x++) {
        //console.log(elements[x]);
        elements[x].style.zoom = csize / 1.2;
    }
});

Mousetrap.bind('space', function() {
    if (document.activeElement) {
        document.activeElement.blur();
    }
    switchToGenerate();
    const canvasObject = new canvas(); // CANVAS CLASS NOT FABRIC
    canvasObject.createCanvases();
    canvasObject.generate();
});

document.addEventListener('keydown', function(e) {
    // Check if the spacebar was pressed
    if (e.keyCode === 32 && document.activeElement.tagName === 'BUTTON') {
        e.preventDefault();
    }
});
