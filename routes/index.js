'use strict'

const express = require('express');
const api = express.Router();

// /* Controllers */
const alumnoController = require("../controllers/alumnoController");
const profesoresController = require("../controllers/profesoresController");
const claseController = require("../controllers/claseController");
const utilsController = require("../controllers/utilsController");
const userController = require("../controllers/userController");
const horarioController = require("../controllers/horarioController");

// /* Alumno ROUTES */
api.post("/register", userController.postRegister);
api.post("/login", userController.postLogin);
api.get("/alumnos/:id", alumnoController.findAlumno);

// /* Profesores ROUTES */
api.get("/profesores/materias/:id", profesoresController.findProfesorByMateria);
api.get("/profesores/:id", profesoresController.findProfesorById);
api.post("/profesores", profesoresController.findPofesores);

// /* Clases ROUTES */
api.post("/clase", claseController.createClass)
api.get("/clases/:idUsuario", claseController.findClassByUser)

// /* Clases HORARIOS */
api.post("/horario", horarioController.createHorario)


// /* Clases utils */
api.get("/utils/materias", utilsController.getMaterias)
api.get("/utils/escolaridad", utilsController.getEscolaridad)
api.get("/utils/zona", utilsController.getZona)
/** END ROUTES **/

module.exports = api;
