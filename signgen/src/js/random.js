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
            faker.company.companyName(), faker.company.catchPhrase(), 
            faker.vehicle.vehicle(), faker.vehicle.manufacturer(), faker.commerce.productName(), faker.commerce.department()
        ];
        var wordArr = [
            faker.commerce.product(), faker.company.companyName(), faker.database.engine(), faker.address.city(), faker.name.firstName(), 
            faker.commerce.productAdjective(), faker.commerce.department(), faker.commerce.productName(), faker.commerce.productMaterial(), 
            faker.finance.accountName(), faker.animal.type(), faker.commerce.department(), faker.vehicle.vehicle(),
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

}