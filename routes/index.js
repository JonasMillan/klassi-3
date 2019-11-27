'use strict'

const express = require('express');
const api = express.Router();

// /* Controllers */
const alumnoController = require("../controllers/alumnoController");
const profesoresController = require("../controllers/profesoresController");
const claseController = require("../controllers/claseController");
const utilsController = require("../controllers/utilsController");
const userController = require("../controllers/userController")

// /* Alumno ROUTES */
api.post("/register", userController.postRegister);
api.post("/login", userController.postLogin);
api.get("/getClasesNotificadas/:id", alumnoController.getClasesNotificadas);
api.get("/alumnos/:id", alumnoController.findAlumno);

// /* Profesores ROUTES */
api.get("/profesores/materias/:id", profesoresController.findProfesorByMateria);
api.get("/profesores/:id", profesoresController.findProfesorById);
api.get("/profesores/format/:id", profesoresController.formatProfesor);
api.post("/profesores", profesoresController.findPofesores);
api.post("/profesor/addmateria", profesoresController.addMateria);
api.post("/profesor/addhoras", profesoresController.addSimpleHora);
api.post("/profesor/removeHora", profesoresController.removeHora);
api.post("/profesor/generarMateria", profesoresController.generarMateriaProfesor);
api.get("/profesor/goPremiun/:id", profesoresController.goPremiun);
api.post("/profesor/addZona", profesoresController.addZona);
api.post("/profesor/removeMateria", profesoresController.removeMateria);


// /* Clases ROUTES */
api.post("/clase", claseController.createClass)
api.post("/removeClase", claseController.removeClass)
api.get("/clases/:idUsuario", claseController.findNotifyClassByUser)
api.get("/aceptarclase/:idClase", claseController.claseAceptada)
api.get("/misclases/:idUsuario", claseController.findClassByUser)

// /* Clases utils */
api.get("/utils/materias", utilsController.getMaterias)
api.get("/utils/escolaridad", utilsController.getEscolaridad)
api.get("/utils/zona", utilsController.getZona)
/** END ROUTES **/

module.exports = api;
