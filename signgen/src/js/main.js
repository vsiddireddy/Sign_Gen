var gen_button = document.getElementById('gen_button');

const fontArr2 = ['AdventPro', 'AlegreyaSansSC', 'ArchivoBlack', 'Asap1', 'Asap2', 'Audiowide'];
for (let x = 0; x < 66; x++) {
    const fontArr = ['AdventPro', 'AlegreyaSansSC', 'ArchivoBlack', 'Asap1', 'Asap2', 'Audiowide',
    'BioRhyme1', 'BioRhyme2', 'Cabin', 'ChakraPetch1', 'ChakraPetch2', 'Chivo1', 'Chivo2', 'Comfortaa',
    'ConcertOne', 'DMSans1', 'DMSans2', 'Eczar1', 'Eczar2', 'FiraSans1', 'FiraSans2', 'FjallaOne', 
    'IBMPlexSans1', 'IBMPlexSans2', 'Inconsolata1', 'Inconsolata2', 'InknutAntiqua1', 'InknutAntiqua2',
    'Inter1', 'Inter2', 'JetBrainsMono1', 'JetBrainsMono2', 'Lato1', 'Lato2', 'Manrope1', 'Manrope2',
    'NotoSans1', 'NotoSans2', 'Nunito1', 'Nunito2', 'OpenSans1', 'OpenSans2', 'Oswald1', 'Oswald2',
    'PermanentMarker', 'Poppins1', 'Poppins2', 'Prompt1', 'Prompt2', 'ProzaLibre1', 'ProzaLibre2',
    'PTSans1', 'PTSans2', 'Quicksand', 'Raleway1', 'Raleway2', 'Righteous', 'Rubik1', 'Rubik2',
    'RussoOne', 'Sora1', 'Sora2', 'SourceSansPro1', 'SourceSansPro2', 'SpaceMono1', 'SpaceMono2']
    const canvasObject = new canvas();
    //canvasObject.test(fontArr[x]);
}

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
//
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