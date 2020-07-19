import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { empleado } from 'src/app/models/empleado.model';
import { HttpService } from 'src/app/services/http/http.service';
import { ValidatorService } from 'src/app/services/validator/validator.service';
import { valid } from 'src/app/models/valid.model';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Empleados : {empleado : empleado, valid : valid}[] = [];

  NuevosEmpleados : {empleado : empleado, valid : valid}[] = [];

  loading = true;
  error = false;

  EmpleadoSelected : empleado;
  

  constructor(private http: HttpService, private validator : ValidatorService) { 

  }

  ngOnInit() {
    
    this.getEmpleados();
  }

  public getEmpleados() {
    this.loading = true;
    this.Empleados = [];
    this.http.get("/all").subscribe(data => {
      for(let i = 0; i < data.length; i++){

        let e : empleado = data[i];
        let valido : valid = {name: {error:false, text : ""},
        surname1: {error:false, text : ""},
        surname2:{error:false, text : ""},
        dni:{error:false, text : ""},
        domicilio:{error:false, text : ""}};

        this.Empleados.push(
          {empleado : e, valid: valido}
        );
      }
      this.loading = false;
    }, err => {
        console.log(err);
        this.error = true;
    })
  }

  public anadirEmpleado() {
    let Empleado : empleado = new empleado();
    let valido : valid = {name: {error:false, text : ""},
        surname1: {error:false, text : ""},
        surname2:{error:false, text : ""},
        dni:{error:false, text : ""},
        domicilio:{error:false, text : ""}};

    this.NuevosEmpleados.push({empleado: Empleado, valid: valido});
  }

  public subirEmpleado (i :  number) {
    
    let e = this.NuevosEmpleados[i];
    e.empleado.dni = e.empleado.dni.toUpperCase();
    e.valid = this.validator.isValid(e.empleado);

    if(!e.valid.name.error && !e.valid.surname1.error && !e.valid.surname2.error && !e.valid.dni.error && !e.valid.domicilio.error)
    {
      this.http.post("", e.empleado).subscribe( () => {
        //añadido con éxito
        this.NuevosEmpleados.splice(i, 1);
        this.getEmpleados();
      }, () => {
        //error
        alert("Ha ocurrido un error, intentelo más tarde")
      })
    }
    
  }

  public eliminarEmpleado(e : empleado) {
    this.http.delete("/"+e.id).subscribe(()=>{
      this.getEmpleados();
    }, () => {
      alert("Ha ocurrido un error, intentelo más tarde")
    })
  }

  public editarEmpleado(i : number) {
    let e = this.Empleados[i];
    e.empleado.dni = e.empleado.dni.toUpperCase();
    e.valid = this.validator.isValid(e.empleado);

    if(!e.valid.name.error && !e.valid.surname1.error && !e.valid.surname2.error && !e.valid.dni.error && !e.valid.domicilio.error)
    {
      this.http.put("/"+e.empleado.id, e.empleado).subscribe( () => {
        e.empleado.edit = false;
        this.getEmpleados();
      }, () => {
        //error
        alert("Ha ocurrido un error, intentelo más tarde")
      })
    }
  }


}
