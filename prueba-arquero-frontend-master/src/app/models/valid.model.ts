export class valid {
    name : {error:boolean, text : string};
    surname1: {error:boolean, text : string};
    surname2:{error:boolean, text : string};
    dni:{error:boolean, text : string};
    domicilio:{error:boolean, text : string};

    constructor(
        name: {error:false, text : ""},
        surname1: {error:false, text : ""},
        surname2:{error:false, text : ""},
        dni:{error:false, text : ""},
        domicilio:{error:false, text : ""}) {

        this.name = name;
        this.surname1 = surname1;
        this.surname2 = surname2;
        this.dni = dni;
        this.domicilio = domicilio;

    }
}