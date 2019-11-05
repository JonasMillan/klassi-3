const Materia = require('../models/materias')
const Zona = require('../models/zona')
const Esconalidad = require('../models/escolaridad')

const getMaterias = async (req, res) => {
    const result = await Materia.find().populate('escolaridad')
    res.status(200).json({result})
}

const getZona = async (req, res) => {
    const result = await Zona.find()
    res.status(200).json({result})
}

const getEscolaridad = async (req, res) => {
    const result = await Esconalidad.find()
    res.status(200).json({result})
}

module.exports = {
    getZona, getEscolaridad, getMaterias
}