Mousetrap.bind(['command+k', 'ctrl+k'], function() {
    printDebug = !printDebug;
});

Mousetrap.bind('q', function() {
    var csize = getComputedStyle(document.getElementById('mainCanvas')).zoom;
    document.getElementById("canvas_0").style.zoom = 1.2 * csize;

});

Mousetrap.bind('w', function() {
    var csize = getComputedStyle(document.getElementById('mainCanvas')).zoom;
    document.getElementById("canvas_0").style.zoom = csize / 1.2;
});