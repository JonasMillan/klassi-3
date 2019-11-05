const Clase = require('../models/clases')
const Profesor = require('../models/profesor')
const Alumno = require('../models/alumno')
const Materia = require('../models/materias')
const Zona = require('../models/zona')
const Horario = require('../models/horario')

const createClass = async (req, res) => {
    const { idProfesor, idAlumno, idMateria, idZona, fecha, hora} = req.body
    
    const profesor = await Profesor.findById(idProfesor)
    const alumno = await Alumno.findById(idAlumno)
    const materia = await Materia.findById(idMateria)
    const zona = await Zona.findById(idZona)
    const horario = new Horario({fecha, hora})

    if( profesor ){
        if( alumno ){
            if( materia ){
                if( zona ){
                    
                    const clase = new Clase({
                        alumno: alumno._id,
                        profesor: profesor._id,
                        materia: materia._id,
                        zona: zona._id,
                        horario: horario._id
                    })
                    
                    alumno.clases.push(clase._id)
                    profesor.clases.push(clase._id)
                    
                    await horario.save()
                    await clase.save()
                    await alumno.save()
                    await profesor.save()

                    res.status(200).json({result: clase})
                }else{
                    res.status(404).json({error: 'id zona no encontrado'})
                }
            }else{
                res.status(404).json({error: 'id materia no encontrado'})
            }
        }else{
            res.status(404).json({error: 'id alumno no encontrado'})
        }
    }else{
        res.status(404).json({error: 'id profesor no encontrado'})
    }
}

const findClassByUser = async (req, res) => {
    const idUsuario = req.params.idUsuario

    if(idUsuario){
        const almuno = await Alumno.findById(idUsuario).populate('clases')
        const { clases } = almuno

        const finalClases = clases.map( async (clase) => {
            const claseFinal = await Clase.findById(clase._id).populate('profesor').populate('zona')
            return {
                fecha: clase.fecha,
                hora: clase.hora,
                profesor: claseFinal.profesor.nombre,
                zona:claseFinal.zona.nombre
            } 
        })

        const clasesProcesada = await Promise.all(finalClases)
        
        res.status(200).json({result: clasesProcesada})

    }else {
        res.status(404).json({error: 'id usuario no encontrado'})
    }
}

module.exports = {
    createClass,
    findClassByUser
}