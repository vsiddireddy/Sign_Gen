const { shell } = require('electron');
var Mousetrap = require('mousetrap');
const faker = require('faker');
var printDebug = true;

class random {

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    async ApplyColors() {
        
        const response = await fetch("../assets/corporate/colors_corporate/color_list_corporate.json");
        const json = await response.json();
    
        var maxIndex = Object.keys(json.corporateArr).length;
        var index = this.getRandomInt(maxIndex);
        //var index = Math.floor(Math.random() * maxIndex);
    
        var colors = json.corporateArr[index]; 
        return colors;
    }

    async ApplyFont() {
        //Array.from(document.fonts.keys())
        var index = this.getRandomInt(66); // currently 66 fonts in corporateArr in json file. Need to make this dynamic TODO
        const response = await fetch("../assets/corporate/font_list_corporate.json");
        const json = await response.json();
        //console.log(json);
        var fullFont = json.corporateArr[index]; // gets specific kind of font (BioRhyme-ExtraLight)
        var font = fullFont.split("-")[0]; // gets family name of font  (BioRhyme)
        var fontURL = '../assets/corporate/fonts_corporate/' + font + '/' + fullFont + '.ttf'; // creates filepath for font
        var css = '@font-face { font-family: ' + "" + font + "; " + 'src: url(' + "'" + fontURL + "'" + ') format("truetype"); }'; // creates css rule for the specific font
        var sheet = window.document.styleSheets[0];
        sheet.insertRule(css); // adds new font into css file
        //const fontArr = ['AdventPro', 'AlegreyaSansSC', 'ArchivoBlack']
        const fontArr = ['AdventPro', 'AlegreyaSansSC', 'ArchivoBlack', 'Asap1', 'Asap2', 'Audiowide',
        'BioRhyme1', 'BioRhyme2', 'Cabin', 'ChakraPetch1', 'ChakraPetch2', 'Chivo1', 'Chivo2', 'Comfortaa',
        'ConcertOne', 'DMSans1', 'DMSans2', 'Eczar1', 'Eczar2', 'FiraSans1', 'FiraSans2', 'FjallaOne', 
        'IBMPlexSans1', 'IBMPlexSans2', 'Inconsolata1', 'Inconsolata2', 'InknutAntiqua1', 'InknutAntiqua2',
        'Inter1', 'Inter2', 'JetBrainsMono1', 'JetBrainsMono2', 'Lato1', 'Lato2', 'Manrope1', 'Manrope2',
        'NotoSans1', 'NotoSans2', 'Nunito1', 'Nunito2', 'OpenSans1', 'OpenSans2', 'Oswald1', 'Oswald2',
        'PermanentMarker', 'Poppins1', 'Poppins2', 'Prompt1', 'Prompt2', 'ProzaLibre1', 'ProzaLibre2',
        'PTSans1', 'PTSans2', 'Quicksand', 'Raleway1', 'Raleway2', 'Righteous', 'Rubik1', 'Rubik2',
        'RussoOne', 'Sora1', 'Sora2', 'SourceSansPro1', 'SourceSansPro2', 'SpaceMono1', 'SpaceMono2']
        return fontArr[this.getRandomInt(66)];
        /*
        const fontArr = ['AdventPro', 'AlegreyaSansSC', 'ArchivoBlack', 'Asap1', 'Asap2', 'Audiowide',
        'BioRhyme1', 'BioRhyme2', 'Cabin', 'ChakraPetch1', 'ChakraPetch2', 'Chivo1', 'Chivo2', 'Comfortaa',
        'ConcertOne', 'DMSans1', 'DMSans2', 'Eczar1', 'Eczar2', 'FiraSans1', 'FiraSans2', 'FjallaOne', 
        'IBMPlexSans1', 'IBMPlexSans2', 'Inconsolata1', 'Inconsolata2', 'InknutAntiqua1', 'InknutAntiqua2',
        'Inter1', 'Inter2', 'JetBrainsMono1', 'JetBrainsMono2', 'Lato1', 'Lato2', 'Manrope1', 'Manrope2',
        'NotoSans1', 'NotoSans2', 'Nunito1', 'Nunito2', 'OpenSans1', 'OpenSans2', 'Oswald1', 'Oswald2',
        'PermanentMarker', 'Poppins1', 'Poppins2', 'Prompt1', 'Prompt2', 'ProzaLibre1', 'ProzaLibre2',
        'PTSans1', 'PTSans2', 'Quicksand', 'Raleway1', 'Raleway2', 'Righteous', 'Rubik1', 'Rubik2',
        'RussoOne', 'Sora1', 'Sora2', 'SourceSansPro1', 'SourceSansPro2', 'SpaceMono1', 'SpaceMono2']
        */
    }

    GetRandomLogo(ctx_a, colors) {
        // ctx_a is using canvas_post
        var index = this.getRandomInt(200);
        var svgURL = '../assets/corporate/logos/SVG/JRO_D_Basic_' + index + '.svg';
        var canvas_back = document.getElementById("canvas_back");
        var ctx_a = canvas_back.getContext("2d");
        var img = new Image();
        if (document.getElementById("toggleLogo").checked) {
            img.src = svgURL;
            img.onload = async function() {
                var scale = 8;
                var x = (ctx_a.canvas.width  - (img.width / scale)) / 2;
                var y = (ctx_a.canvas.height - (img.height / scale)) / 2;
    
                // draw color
                ctx_a.fillStyle = colors.h1;
                ctx_a.fillRect(x, y, img.width / scale, img.height / scale);
    
                // set composite mode
                //ctx_a.globalCompositeOperation = "destination-atop";
    
                // draw image
                ctx_a.drawImage(img, x, y, img.width / scale, img.height / scale);
            }
        }
        //return svgURL;
    }

    async RandomCapitilization(w1, w2, isPrefix) {
        //console.log(w2 == null);
        console.log('RandomCapitilization: ' + w1 + " : " + w2);
        var index = this.getRandomInt(4);
        if (index == 0) { // all uppercase
            w1 = w1.toUpperCase();
        } else if (index == 1) { // all lowercase
            w1 = w1.toLowerCase();
        } else if (index == 2) {
            w1 = w1.replace(/^./, w1[0].toUpperCase());
        }
        if (w2 != undefined) {
            if (index == 0) { // all uppercase
                w2 = w2.toUpperCase();
            } else if (index == 1) {
                w2 = w2.toLowerCase();
            } else if (index == 2) {
                w2 = w2.replace(/^./, w2[0].toUpperCase());
            }
        }
        return [w1, w2];
    }

    async GetRandomWord(userInput, category) {
        var w1;
        var w2;
        var sub;
        var oneWordArr = [
            faker.company.companyName(), faker.company.bs(), faker.company.catchPhrase(), 
            faker.vehicle.vehicle(), faker.vehicle.manufacturer(), faker.commerce.productName(), faker.commerce.department()
        ];
        var wordArr = [
            faker.commerce.product(), faker.company.companyName(), faker.database.engine(), faker.address.city(), faker.name.firstName(), 
            faker.commerce.productAdjective(), faker.commerce.department(), faker.commerce.productName(), faker.commerce.productMaterial(), 
            faker.company.bs(), faker.finance.accountName(), faker.animal.type(), faker.commerce.department(), faker.vehicle.vehicle(),
            faker.vehicle.manufacturer()
        ];
        var subArr = [
            faker.address.latitude(), faker.address.longitude(), faker.address.direction(), faker.commerce.price(), faker.internet.domainName(),
            faker.address.city(), faker.finance.amount(), faker.phone.phoneNumber(), faker.datatype.uuid(), faker.address.streetName(),
            faker.address.streetAddress(), faker.company.companySuffix()
        ];
        var oneWordNum = this.getRandomInt(8);
        var word1Num   = this.getRandomInt(14);
        var word2Num   = this.getRandomInt(14);
        while (word1Num == word2Num) {
            word2Num = this.getRandomInt(14);
        }
        var subNum = this.getRandomInt(12);
        var choiceNum = this.getRandomInt(2);
        if (choiceNum == 0) {
            w1 = oneWordArr[oneWordNum];
            while (w1 == undefined) {
                w1 = oneWordArr[this.getRandomInt(2)];
            }
        } else if (choiceNum == 1) {
            w1 = wordArr[word1Num];
            w2 = wordArr[word2Num];
            console.log('BEFORE W1/W2: ' + w1 + " : " + w2);
            while (w1 == undefined) {
                w1 = wordArr[this.getRandomInt(14)];
            }
            while (w2 == undefined) {
                w2 = wordArr[this.getRandomInt(14)];
            }
            console.log('AFTER W1/W2: ' + w1 + " : " + w2);
        }
        if (this.getRandomInt(2) == 0) {
            sub = subArr[subNum];
        }
        wordArr = await this.RandomCapitilization(w1, w2, false);
        //console.log("TESTING: " + wordArr);
        return [wordArr[0], wordArr[1], sub, false];
    }

}
/*

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//Colors
export async function applyColors() {
    const response = await fetch("../assets/corporate/colors_corporate/color_list_corporate.json");
    const json = await response.json();

    var maxIndex = Object.keys(json.corporateArr).length;
    var index = getRandomInt(maxIndex);

    var colors = json.corporateArr[index]; 
    return colors;
}

export async function ApplyFont() {
    var index = getRandomInt(66); // currently 66 fonts in corporateArr in json file. Need to make this dynamic TODO
    const response = await fetch("../assets/corporate/font_list_corporate.json");
    const json = await response.json();
    //console.log(json);
    var fullFont = json.corporateArr[index]; // gets specific kind of font (BioRhyme-ExtraLight)
    var font = fullFont.split("-")[0]; // gets family name of font  (BioRhyme)
    var fontURL = '../assets/corporate/fonts_corporate/' + font + '/' + fullFont + '.ttf'; // creates filepath for font
    var css = '@font-face { font-family: ' + "" + font + "; " + 'src: url(' + "'" + fontURL + "'" + ') format("truetype"); }'; // creates css rule for the specific font
    var sheet = window.document.styleSheets[0];
    sheet.insertRule(css); // adds new font into css file
    return font;
}

export async function GetRandomLogo(ctx_a, colors) {
    // ctx_a is using canvas_post
    var index = getRandomInt(200);
    var svgURL = '../assets/corporate/logos/SVG/JRO_D_Basic_' + index + '.svg';
    var canvas_back = document.getElementById("canvas_back");
    var ctx_a = canvas_back.getContext("2d");
    var img = new Image();
    if (document.getElementById("toggleLogo").checked) {
        img.src = svgURL;
        img.onload = async function() {
            var scale = 8;
            var x = (ctx_a.canvas.width  - (img.width / scale)) / 2;
            var y = (ctx_a.canvas.height - (img.height / scale)) / 2;

            // draw color
            ctx_a.fillStyle = colors.h1;
            ctx_a.fillRect(x, y, img.width / scale, img.height / scale);

            // set composite mode
            //ctx_a.globalCompositeOperation = "destination-atop";

            // draw image
            ctx_a.drawImage(img, x, y, img.width / scale, img.height / scale);
        }
    }
    //return svgURL;
}

export async function RandomCapitilization(w1, w2, isPrefix) {
    //console.log(w2 == null);
    console.log('RandomCapitilization: ' + w1 + " : " + w2);
    var index = getRandomInt(4);
    if (index == 0) { // all uppercase
        w1 = w1.toUpperCase();
    } else if (index == 1) { // all lowercase
        w1 = w1.toLowerCase();
    } else if (index == 2) {
        w1 = w1.replace(/^./, w1[0].toUpperCase());
    }
    if (w2 != undefined) {
        if (index == 0) { // all uppercase
            w2 = w2.toUpperCase();
        } else if (index == 1) {
            w2 = w2.toLowerCase();
        } else if (index == 2) {
            w2 = w2.replace(/^./, w2[0].toUpperCase());
        }
    }
    return [w1, w2];
}

export async function GetRandomWord(userInput, category) {
    var w1;
    var w2;
    var sub;
    var oneWordArr = [
        faker.company.companyName(), faker.company.bs(), faker.company.catchPhrase(), 
        faker.vehicle.vehicle(), faker.vehicle.manufacturer(), faker.commerce.productName(), faker.commerce.department()
    ];
    var wordArr = [
        faker.commerce.product(), faker.company.companyName(), faker.database.engine(), faker.address.city(), faker.name.firstName(), 
        faker.commerce.productAdjective(), faker.commerce.department(), faker.commerce.productName(), faker.commerce.productMaterial(), 
        faker.company.bs(), faker.finance.accountName(), faker.animal.type(), faker.commerce.department(), faker.vehicle.vehicle(),
        faker.vehicle.manufacturer()
    ];
    var subArr = [
        faker.address.latitude(), faker.address.longitude(), faker.address.direction(), faker.commerce.price(), faker.internet.domainName(),
        faker.address.city(), faker.finance.amount(), faker.phone.phoneNumber(), faker.datatype.uuid(), faker.address.streetName(),
        faker.address.streetAddress(), faker.company.companySuffix()
    ];
    var oneWordNum = getRandomInt(8);
    var word1Num   = getRandomInt(14);
    var word2Num   = getRandomInt(14);
    while (word1Num == word2Num) {
        word2Num = getRandomInt(14);
    }
    var subNum = getRandomInt(12);
    var choiceNum = getRandomInt(2);
    if (choiceNum == 0) {
        w1 = oneWordArr[oneWordNum];
        while (w1 == undefined) {
            w1 = oneWordArr[getRandomInt(2)];
        }
    } else if (choiceNum == 1) {
        w1 = wordArr[word1Num];
        w2 = wordArr[word2Num];
        console.log('BEFORE W1/W2: ' + w1 + " : " + w2);
        while (w1 == undefined) {
            w1 = wordArr[getRandomInt(14)];
        }
        while (w2 == undefined) {
            w2 = wordArr[getRandomInt(14)];
        }
        console.log('AFTER W1/W2: ' + w1 + " : " + w2);
    }
    if (getRandomInt(2) == 0) {
        sub = subArr[subNum];
    }
    wordArr = await RandomCapitilization(w1, w2, false);
    return [wordArr[0], wordArr[1], sub, false];
}
*/