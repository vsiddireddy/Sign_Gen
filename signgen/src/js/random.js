const { shell } = require('electron');
var Mousetrap = require('mousetrap');
const faker = require('faker');
var ColorScheme = require('color-scheme');
var printDebug = true;
var count = 0;

class random {

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    ApplyColors() {
        //const response = await fetch("../assets/corporate/colors_corporate/color_list_corporate.json");
        //const json = await response.json();
        const filePath = "../assets/corporate/colors_corporate/color_list_corporate.json";
        const load = this.loadTextFileAjaxSync(filePath, "application/json");
        const json = JSON.parse(load);
    
        var maxIndex = Object.keys(json.corporateArr).length;
        var index = this.getRandomInt(maxIndex);
        //var index = Math.floor(Math.random() * maxIndex);
        var colors = json.corporateArr[index]; 

        var colorScheme = document.getElementById('color1').value
        if(colorScheme !== ""){
            var gcs = this.GetColorScheme(colorScheme);
            colors.m1 = gcs[0];
            colors.m2 = gcs[1];
            colors.h1 = gcs[2];
            colors.h2 = gcs[3];
        }

        return colors;
    }

    loadTextFileAjaxSync(filePath, mimeType) {
        var xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET", filePath, false);
        if (mimeType != null) {
          if (xmlhttp.overrideMimeType) {
            xmlhttp.overrideMimeType(mimeType);
          }
        }
        xmlhttp.send();
        if (xmlhttp.status==200 && xmlhttp.readyState == 4 )
        {
          return xmlhttp.responseText;
        }
        else {
          // TODO Throw exception
          return null;
        }
    }

    GetColorScheme(hex) {
        hex = hex.slice(1);
        var scheme = new ColorScheme;

        var choice = this.getRandomInt(4);
        if(choice == 0){
            scheme.from_hex(hex).scheme('contrast');
            console.log("contrast");
        } else if (choice == 1){
            scheme.from_hex(hex).scheme('triade');
            console.log("triade");
        } else if (choice == 2){
            scheme.from_hex(hex).scheme('analogic');   
            console.log("analogic");
        } else if (choice == 3){
            scheme.from_hex(hex).scheme('monochromatic');   
            console.log("monochromatic");
        }

        var schemesVal = document.getElementById('schemes').value;
        scheme.variation(schemesVal);

        var colors = scheme.colors();
        for (var i = 0; i < colors.length; i++){
            colors[i] = '#' + colors[i];
        }

        //Delete everything w/ newcolors
        var newcolors = [];
        for (var j = 0; j < 3; j++){
            newcolors[j] = colors[j]
        }
        colors = this.Shuffle(newcolors);
        
        //m1,m2,h1,h2 = colors[0-3] = bgc, txtc, stroke/shadow, logoc/bgsc
        
        /*
        var seed = this.getRandomInt(3);
        if(colors.length > 7){
            if(choice == 0){
                if(seed == 0){
                    var oldbg = colors[0];
                    colors[0] = colors[1];
                    colors[1] = oldbg;
                } else if(seed == 1){
                    colors[1] = colors[4];
                    colors[2] = colors[5];
                } else if(seed == 2){
                    colors[0] = colors[7];
                    colors[2] = colors[6];
                }
            } else if(choice == 1){
                if(seed == 0){
                    var oldbg = colors[0];
                    colors[0] = colors[1];
                    colors[1] = oldbg;
                } else if(seed == 1){
                    colors[2] = colors[4];
                    colors[3] = colors[5];
                } else if(seed == 2){
                    colors[0] = colors[8];
                    colors[2] = colors[4];
                }
            } else if(choice == 2){
                if(seed == 0){
                    var oldbg = colors[0];
                    colors[0] = colors[1];
                    colors[1] = oldbg;
                } else if(seed == 1){
                    colors[1] = colors[4];
                    colors[2] = colors[5];
                } else if(seed == 2){
                    colors[0] = colors[7];
                    colors[2] = colors[6];
                }
            }else if(choice == 3){
                if(seed == 0){
                    var oldbg = colors[0];
                    colors[0] = colors[1];
                    colors[1] = oldbg;
                } else if(seed == 1){
                    colors[1] = colors[4];
                    colors[2] = colors[5];
                } else if(seed == 2){
                    colors[0] = colors[7];
                    colors[2] = colors[6];
                }
            }
        }
        */
        return colors;
    }

    ApplyFont() {
        const fontArr = ['ArchivoBlack', 'Asap1', 'Asap2', 'Audiowide', 'Bricemont', 'Blazma', 'Santello', 'Francode', 'Zyxali', 'Ronaldson', 'Guti',
        'BioRhyme1', 'BioRhyme2', 'ChakraPetch1', 'ChakraPetch2', 'Comfortaa',
        'ConcertOne', 'FiraSans2', 'FjallaOne', 'Huelic',
        'Inconsolata1', 'Inconsolata2',
        'Inter1', 'Inter2', 'JetBrainsMono1', 'JetBrainsMono2', 'Manrope1',
        'Nunito1', 'Nunito2', 'OpenSans1', 'Oswald1',
        'Poppins1', 'Poppins2', 'Prompt1', 'Prompt2', 'ProzaLibre1', 'ProzaLibre2',
        'Quicksand', 'Raleway1', 'Raleway2', 'Righteous', 'Rubik1', 'Rubik2',
        'RussoOne', 'Sora1', 'Sora2', 'SpaceMono1', 'SpaceMono2',
        'AlphaProta', 'Automania', 'Beware', 'Blaec', 'BoecklinsUniverse', 'Carbon', 'CrystalRadioKit',
        'Electroharmonix', 'Fffforwa', 'Halo', 'Hemi-head', 'Kenyan-coffee', 'Made-in-china',
        'Metal-lord', 'Monoglyceride', 'Monoton', 'Neuropolitical', 'Stentiga',
        'World-of-water'];
        const fontArrTest = ['AlphaProta', 'AntsyPants', 'Automania', 'Beware', 'Blaec', 'BoecklinsUniverse', 'Carbon', 'CrystalRadioKit',
        'DeftoneStylus', 'Electroharmonix', 'Fffforwa', 'Halo', 'Hemi-head', 'Kenyan-coffee', 'Made-in-china',
        'Metal-lord', 'Monoglyceride', 'Monoton', 'Neuropolitical', 'Projects', 'Sematary', 'Stentiga', 'Twist-twist-font',
        'World-of-water'];
        console.log(count)
        var temp = count
        count++
        console.log(fontArr[temp])
        //return fontArr[temp]; // used for checking each font
        return fontArr[this.getRandomInt(fontArr.length)]; //This picks the font randomly
        /* 
            Fonts to Delete: 
            AdventPro
            FiraSans1
            InknutAntiqua1
            InknutAntiqua2
            Manrope2
            OpenSans2
            Oswald2
            DeftoneStylus
            Sematary
            Twist-twist-font
        */
    }

    GetRandomLogo(ctx_a, colors) {
        var index = this.getRandomInt(199) + 1; // goes from (0 to 199) + 1
        var svgURL = '../assets/corporate/logos/PNG/JRO_D_Basic_' + index + '.png';
        return svgURL;
    }

    GetRandomWord(userInput, category) {
        var w1;
        var w2;
        var sub;
        var oneWordArr = [
            faker.commerce.productAdjective(1,10), faker.company.bsAdjective(1,10), faker.company.bsBuzz(1,10), faker.company.catchPhraseAdjective(1,10), faker.address.cardinalDirection(1,10),
            faker.address.state(1,10)
        ];
        var wordArr = [
            faker.commerce.product(1,10), faker.company.companyName(1,10), faker.company.bsNoun(1,10), faker.commerce.productMaterial(1,10)
        ];
        var subArr = [
            faker.commerce.price(1,10), faker.internet.domainName(1,10), faker.address.city(1,10), faker.phone.phoneNumber(1,10), faker.company.companyName(1,10), 
            faker.address.streetName(1,10),faker.address.streetAddress(1,10), faker.company.companySuffix(1,10), faker.company.bsNoun(1,10), faker.company.bs(1, 10), faker.company.catchPhrase(1,10)
        ];

        w1 = oneWordArr[this.getRandomInt(oneWordArr.length)]; //decrease to lower possibility of Arr being shown (except for wordArr)
        w2 = wordArr[this.getRandomInt(wordArr.length)];
        sub = subArr[this.getRandomInt(subArr.length)];
        

        var randomCapitalization = this.getRandomInt(3);
        if (randomCapitalization == 0) {
            w1 = w1.toLowerCase();
            w2 = w2.toLowerCase();
        } else if (randomCapitalization == 1) {
            w1 = w1.toUpperCase();
            w2 = w2.toUpperCase();
        }  else if (randomCapitalization == 2) {
            w1 = w1.replace(/^./, w1[0].toUpperCase());
            w2 = w2.replace(/^./, w2[0].toUpperCase());
        }

        //random push
        var randomWords = [w2];
        if (this.getRandomInt(2) == 0) {
            randomWords.push(w1);
        }
        if (this.getRandomInt(2) == 0) {
            if(randomWords[1] !== w1){
                w1 = undefined;
                randomWords.push(w1);
            }
            randomWords.push(sub);
        }
        if (randomWords[1] == undefined){
            randomWords[0] = this.GetOneWord();
        }

        if (document.getElementById('word1').value != '') {
            randomWords[0] = document.getElementById('word2').value;
            if (document.getElementById('word2').value != '') {
                randomWords[1] = document.getElementById('word1').value;
            }
            randomWords[1] = document.getElementById('word1').value;
            randomWords[2] = undefined;
        }
        return randomWords; //w2, w1, sub
    }

    GetOneWord(){
        var prefixes = ["nu", "win", "ry", "core", "tech", "sys","pro", "hydro", "west", "nort", "dune", "pop", 
        "tru", "tele", "real", "snap", "coin", "power", "insta", "net", "dis", "face", "solo", "pay", "ear", "eye",
        "wal", "tes", "wyn", "flow", "up", "me"];
        var prefix = prefixes[this.getRandomInt(prefixes.length)];

        var suffixes = ["corp", "tech", "whiz", "nest", "lab",  "cord", "flow", "well", "com", 
        "shift", "zone", "book", "chat", "gram", "pint", "ton", "mart", "face", "scan", "board", "car", "mobile", "time", "phone", "lock", 
        "screen", "page", "app", "drive", "gen", "bern", "shop", "bud", "log", "list", "tok"];
        var suffix = suffixes[this.getRandomInt(suffixes.length)];

        var word = prefix+suffix;
        return word;
    }

    GetRandomTextEffect(colors){
        var choice = this.getRandomInt(3); //0,1,2
        var shadow = 0; //0
        var stroke = 0; //1

        if(choice == 0){
            var shadow = new fabric.Shadow({
                color: colors.h1,
                blur: 0,    
                offsetX: 3,
                offsetY: 3,
                opacity: 1
            });
        }else if (choice == 1){
            stroke = this.getRandomInt(2) + 2;
        }

        return [shadow, stroke];
    }

    GetRandomBackgound(colors, w, h){
        var choice = this.getRandomInt(2); //0,1,2
        var background = [];

        if(colors.h2 !== "")
        {
            if(choice == 0){
                var circle = new fabric.Circle({
                    radius: w/4,
                    fill: colors.h2
                });
                background.push(circle);
            } else if (choice == 1){
                var rect = new fabric.Rect({
                    width: w,
                    height: h/1.5,
                    fill: colors.h2
                });
                background.push(rect);
            }
        }
        return background;
    }

    Shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
    }

}