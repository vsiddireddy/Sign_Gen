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
    }

    GetRandomLogo(ctx_a, colors) {
        var index = this.getRandomInt(200);
        var svgURL = '../assets/corporate/logos/SVG/JRO_D_Basic_' + index + '.svg';
        return svgURL;
    }

    async GetRandomWord(userInput, category) {
        var w1;
        var w2;
        var sub;
        var oneWordArr = [
            faker.commerce.productAdjective(), faker.company.bsAdjective(), faker.company.bsBuzz(), faker.company.catchPhraseAdjective(), faker.address.cardinalDirection(),
            faker.address.state()
        ];
        var wordArr = [
            faker.commerce.product(), faker.company.companyName(), faker.company.bsNoun(), faker.commerce.productMaterial()
        ];
        var subArr = [
            faker.commerce.price(), faker.internet.domainName(), faker.address.city(), faker.phone.phoneNumber(), faker.company.companyName(), 
            faker.address.streetName(),faker.address.streetAddress(), faker.company.companySuffix(), faker.company.bsNoun(), faker.company.bs(), faker.company.catchPhrase()
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
            randomWords[0] = await this.GetOneWord();
        }
        return randomWords; //w2, w1, sub
    }

    async GetOneWord(){
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

    async GetRandomTextEffect(colors){
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

    async GetRandomBackgound(colors, w, h){
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

}