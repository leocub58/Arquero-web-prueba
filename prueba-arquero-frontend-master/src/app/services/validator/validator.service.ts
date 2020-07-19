import { Injectable } from '@angular/core';
import { empleado } from 'src/app/models/empleado.model';
import { valid } from 'src/app/models/valid.model';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {


  public isValid (e : empleado){

    let result : valid = {
    name: {error:false, text : ""},
    surname1: {error:false, text : ""},
    surname2:{error:false, text : ""},
    dni:{error:false, text : ""},
    domicilio:{error:false, text : ""}
    };

    result.name = this.nameAndSurname(e.nombre);
    result.surname1 = this.nameAndSurname(e.apellido1);
    result.surname2 = this.nameAndSurname(e.apellido2);
    result.dni = this.dni(e.dni);
    result.domicilio = this.domicilio(e.domicilio);

    return result;

  }
  
  nameAndSurname (text : string) {
    let result = {error:false, text:''}
    if(text.length <= 3){
      result.error = true;
      result.text += "Introduce más de 3 caractéres "
    }
    var matches = text.match(/\d+/g);
    if (matches != null) {
      result.error = true;
      result.text += "No puede contener numeros. "
    }
    return result;
  }

  dni (text : string) {
    let result = {error:false, text:''}
    if(text.includes(" ")){
      result.error = true;
      result.text += "DNI inválido. "
    }
    var matches = text.match(/[0-9]{8}[A-Z]{1}/g);
    if (matches != null) {
      if(result.error == false){
        result.error = false;
        result.text = " "
      }
    }
    else {
        result.error = true;
        result.text = "DNI inválido"
    }

    return result;
  }

  domicilio (text : string) {
    let result = {error:false, text:''}
    if(text.length <= 3){
      result.error = true;
      result.text += "Dirección inválida"
    }
    else{
      var matches = text.match(/\d+/g);
      if (matches == null) {
        result.error = true;
        result.text += "Dirección inválida. "
      }
    }
    return result;
  }


}
