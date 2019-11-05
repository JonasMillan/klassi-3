const Profesor =  require('../models/user')
const Horario = require('../models/horario')

const findProfesorByMateria = async (req, res) => {
    // id de la ruta dinamica
    const id = req.params.id
    // encuentra a el profe y popula materias
    const profes = await Profesor.find().populate('materias')
    const data = []
    // encuentra profe por materia haciendo un loop
    profes.forEach( profe => {
        const encontro = profe.materias.find(mate => mate._id.toString() === id)
        if(encontro){
            data.push(profe)
        }
    })
    // validacion 
    if(data.length > 0){
        res.status(200).json({result: data})
    }else{
        res.status(404).json({error: 'No existen profesores para dicha materia'})
    }
}

const findProfesorById = async (req, res) => {
    // id de la ruta dinamica
    const id = req.params.id
    // encuentra el profe por id y popula materias y zonas
    const profe = await Profesor.findById(id).populate('materias').populate('zonas')
    if(profe){
        res.status(200).json({result: profe})
    }else{
        res.status(404).json({error: 'No existen profesores para dicho id'})
    }
}

const findPofesores = async (req, res) => {
    const {idZona, idMateria, fecha, hora} = req.body
    const profesores = await Profesor
    .find({
        materias: idMateria,
        zonas: idZona
    })
    .populate('clases')
    
    const profeConClase = profesores.filter(e => e.clases.length > 0)
    const profes = []
    profeConClase = profeConClase.forEach( async (prof) => {
        const idHorario = prof.clases.horario
        const horario = await Horario(idHorario)
        console.log(horario)
    })
    res.status(200).json({result: profesores})
}

module.exports = {
    findProfesorByMateria,
    findProfesorById,
    findPofesores
}