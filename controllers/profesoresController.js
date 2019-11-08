const Profesor =  require('../models/user')
const Horario = require('../models/horario')
const Materia = require('../models/materias')

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
    
    let profeConClase = []
    let profes = []
    profesores.forEach( (myProf) => {
        myProf.horas.forEach( (myHora) => {
            if(myHora == hora){
                if(myProf.clases.length > 0) {
                    profeConClase.push(myProf);
                } else {
                    profes.push(myProf);
                } 
            }
        })
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

const addMateria = async (req, res) => {
    const { idMateria, idProfesor } = req.body

    const profesor = await Profesor.findById(idProfesor)
    const materia = await Materia.findById(idMateria)
    let flag = true

    if(profesor){
        if(materia){
            profesor.materias.forEach( async (myMateria) => {
                if(idMateria == myMateria) {
                    flag = false
                }
            })
            if(flag){
                profesor.materias.push(materia)
                await profesor.save()
                res.status(200).json({result: 'ok'})
            } else {
                res.status(404).json({error: 'La materia ya existe en la lista'})
            }
        }else {
            res.status(404).json({error: 'No existen Materia para dicho id'})
        }
    } else {
        res.status(404).json({error: 'No existen profesores para dicho id'})
    }
}

const addHoras = async (req, res) => {
    const { idProfesor, horas } = req.body
    let flag = true;
    const profesor = await Profesor.findById(idProfesor)
    if(profesor){
        horas.forEach( (hora) => {
            flag = true;
            profesor.horas.forEach( (myHora) => {
                if(myHora == hora){
                    flag = false;
                }
            })
            if(flag){
                profesor.horas.push(hora)
            }
        })
        await profesor.save()
        res.status(200).json({result: 'ok'})
    } else {
        res.status(404).json({error: 'No existen profesores para dicho id'})
    }
}

async function profesorNotificar(idProfesor) {
    const profesor = await Profesor.findById(idProfesor)
    let flag = true;
    profesor.clases.forEach( (clase) => {
        if(!clase.notificada){
            flag = false;
        }
    })

    if(flag){
        profesor.notificar = false;
        await profesor.save();
    }
}

module.exports = {
    findProfesorByMateria,
    findProfesorById,
    findPofesores,
    addMateria,
    addHoras,
    profesorNotificar
}