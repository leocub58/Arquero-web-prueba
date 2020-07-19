package com.prueba.arquero.pruebaarquerobackend.model.dao;

import com.prueba.arquero.pruebaarquerobackend.model.entity.Empleado;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IEmpleadoDao extends CrudRepository<Empleado, Long> {
	List<Empleado>findAll();
	Empleado save(Empleado e);
	void delete(Empleado e);
}
