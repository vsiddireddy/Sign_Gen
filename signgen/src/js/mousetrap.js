Mousetrap.bind('q', function() {
    var csize = getComputedStyle(document.getElementById('canvas_0')).zoom;
    document.getElementById("canvas_0").style.zoom = csize * 1.2;
});

Mousetrap.bind('w', function() {
    var csize = getComputedStyle(document.getElementById('canvas_0')).zoom;
    document.getElementById("canvas_0").style.zoom = csize / 1.2;
});

Mousetrap.bind('space', function() {
    const canvasObject = new canvas(); // CANVAS CLASS NOT FABRIC
    canvasObject.createCanvases();
    canvasObject.generate();
});