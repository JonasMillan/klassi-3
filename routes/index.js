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
// gets
api.get("/alumnos/:id", alumnoController.findAlumno);

// /* Profesores ROUTES */
api.get("/profesores/materias/:id", profesoresController.findProfesorByMateria);
api.get("/profesores/:id", profesoresController.findProfesorById);
api.post("/profesores", profesoresController.findPofesores);
api.post("/profesor/addmateria", profesoresController.addMateria);
api.post("/profesor/addhoras", profesoresController.addHoras);

// /* Clases ROUTES */
api.post("/clase", claseController.createClass)
api.get("/clases/:idUsuario", claseController.findNotifyClassByUser)
api.get("/aceptarclase/:idClase", claseController.claseAceptada)
api.get("/misclases/:idUsuario", claseController.findClassByUser)

// /* Clases utils */
api.get("/utils/materias", utilsController.getMaterias)
api.get("/utils/escolaridad", utilsController.getEscolaridad)
api.get("/utils/zona", utilsController.getZona)
/** END ROUTES **/

module.exports = api;
