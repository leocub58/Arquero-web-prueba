package com.prueba.arquero.pruebaarquerobackend.rest;

import com.prueba.arquero.pruebaarquerobackend.model.entity.Empleado;
import com.prueba.arquero.pruebaarquerobackend.model.service.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping (value="/api")
public class EmpleadoController {

	@Autowired
	IEmpleadoService empleado;
	
	@GetMapping("/all")
	public List<Empleado>getEmpleados() {
		return empleado.getEmpleados();
	}
	
	@PostMapping
	public Empleado Add (@RequestBody Empleado e) {
		return empleado.saveEmpleado(e);
	}
	
	@PutMapping(path = {"/{id}"})
	public Empleado Edit (@RequestBody Empleado e, @PathVariable("id") Long id) {
		e.setId(id);
		return empleado.updateEmpleado(e);
	}
	
	@DeleteMapping(path = {"/{id}"})
	public void Delete (@PathVariable("id") Long id) {
		empleado.deleteEmpleado(id);
	}
	
}
