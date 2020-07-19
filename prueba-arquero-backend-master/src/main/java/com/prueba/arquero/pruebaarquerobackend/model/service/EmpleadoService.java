package com.prueba.arquero.pruebaarquerobackend.model.service;

import com.prueba.arquero.pruebaarquerobackend.model.dao.IEmpleadoDao;
import com.prueba.arquero.pruebaarquerobackend.model.entity.Empleado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpleadoService implements IEmpleadoService{

    @Autowired
    private IEmpleadoDao empleadoDao;

    public List<Empleado> getEmpleados(){
        return empleadoDao.findAll();
    }

    public Empleado saveEmpleado(Empleado empleado){
    	return empleadoDao.save(empleado);
    }

    public Empleado updateEmpleado(Empleado empleado){
    	return empleadoDao.save(empleado);
    }
    
    @Override
    public void deleteEmpleado(Long id){
    	empleadoDao.deleteById(id);;
    }

}
