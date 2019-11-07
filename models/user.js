'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    
    rol: {
        type: String
    },
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    descripcion:{
        type: String
    },
    premiun: {
        type: Boolean
    },
    notificar: {
        type: Boolean
    },
    clases: [{
        type: Schema.Types.ObjectId,
        ref: 'Clase' 
    }],
    zonas: [{
        type: Schema.Types.ObjectId,
        ref: 'Zona' 
    }],
    materias: [{
        type: Schema.Types.ObjectId,
        ref: 'Materias' 
    }],
    horarios: [{
        type: Schema.Types.ObjectId,
        ref: 'Horarios' 
    }]
});

module.exports = mongoose.model('User', UserSchema);