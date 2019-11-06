const Profesor2 =  require('../models/user')
const Horario = require('../models/horario')

const findProfesorByMateria = async (req, res) => {
    // id de la ruta dinamica
    const id = req.params.id
    // encuentra a el profe y popula materias
    const profes = await Profesor2.find().populate('materias')
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
    const profe = await Profesor2.findById(id).populate('materias').populate('zonas')
    if(profe){
        res.status(200).json({result: profe})
    }else{
        res.status(404).json({error: 'No existen profesores para dicho id'})
    }
}

const findPofesores = async (req, res) => {
    const {idZona, idMateria, fecha, hora} = req.body
    const profesores = await Profesor2
    .find({
        materias: idMateria,
        zonas: idZona
    })
    .populate('clases')
    
    let profeConClase = []
    let profes = []
    profesores.forEach( (myProf) => {
        if(myProf.clases.length > 0) {
            profeConClase.push(myProf);
        } else {
            profes.push(myProf);
        }
    });
    
    let valido = true;
    profeConClase.forEach((prof) => {
        valido = true;
        prof.clases.forEach( async (myClase) => {
            const horario = await Horario.findById(myClase.horario)
            if(horario.fecha === fecha &&  horario.hora === hora) {
                valido = false;
            }
        });
        if(valido){
            profes.push(prof);
        }       
    });

    res.status(200).json({result: profes})
}

module.exports = {
    findProfesorByMateria,
    findProfesorById,
    findPofesores
}