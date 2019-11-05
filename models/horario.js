'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HorarioSchema = new Schema({
    fecha: {
        type: String,
    },
    hora: {
        type: String
    }
});

module.exports = mongoose.model('Horario', HorarioSchema);