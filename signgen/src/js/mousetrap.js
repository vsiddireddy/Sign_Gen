Mousetrap.bind(['command+k', 'ctrl+k'], function() {
    printDebug = !printDebug;
});

Mousetrap.bind('q', function() {
    var csize = getComputedStyle(document.getElementById('canvas_back')).zoom;
    document.getElementById("canvas_back").style.zoom = 1.2 * csize;

});

Mousetrap.bind('w', function() {
    var csize = getComputedStyle(document.getElementById('canvas_back')).zoom;
    document.getElementById("canvas_back").style.zoom = csize / 1.2;
});