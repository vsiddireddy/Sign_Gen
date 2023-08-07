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
    const canvasObject = new canvas(); // CANVAS CLASS NOT FABRIC
    canvasObject.createCanvases();
    canvasObject.generate();
});