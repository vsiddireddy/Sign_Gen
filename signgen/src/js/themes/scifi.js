
class scifi {

    company() {
        const noun = ['Clorogpoint', 'Vaktopiaworth', 'Plueliusustries', 'CZU', 'Welshman', 'Ligcarisbaba', 'Sencanuctions',
        'Janronics', 'Cavis', 'ThetCorp', 'Barorkonburys', "Ll'donia", 'Paplejos', 'Akiraworths', 'Sauma', 'Copernar', 
        'Rutledge', 'Blackbird', 'Gantariaworks', 'Longenella', "Proton", "Quantum", "Vision", "Cyber", 'Greenbank', 'Smartex',
        'Peachware', 'Weyer-Vilchis', 'thetaTech', 'Foxwell', 'NanoCorp', 'Cytek', 'TeraDev', 'PWT-Global', 'ProtoNic', 'Nylund',
        'Protobase', 'milLink', 'Protogen', 'Cycom', 'Okamura-Ikeda', 'Cobalt'
        ];
        const descriptor = ['Inc', 'Solutions', 'Holdings', 'Industries', 'Corporation', 'LLP', 'Association', 'Logistics', 'PLC',
        'Group', 'Zepbanks', 'Networks', 'Dynamics', 'Interplanetary', 'Cybernetics', 'Global', 'Media', 'Medical', 'Labs', 'Robotics',
        'Security'
        ];
        return [noun[this.getRandomInt(noun.length)], descriptor[this.getRandomInt(descriptor.length)]];
    }


    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}