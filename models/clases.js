'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClaseSchema = new Schema({

    alumno: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    profesor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    materia: {
        type: Schema.Types.ObjectId,
        ref: 'Materias' 
    },
    zona: {
        type: Schema.Types.ObjectId,
        ref: 'Zona'
    },
    horario: {
        type: Schema.Types.ObjectId,
        ref: 'Horario'
    }
});

module.exports = mongoose.model('Clase', ClaseSchema);





// clase
// alumno
// profe
// materia
// zona
// fecha
// hora 