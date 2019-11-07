const Clase = require('../models/clases')
const Profesor = require('../models/profesor')
const Alumno = require('../models/alumno')
const Materia = require('../models/materias')
const Zona = require('../models/zona')
const Horario = require('../models/horario')

/** AGREGADO */
const UserProfesor = require('../models/user')
const UserAlumno = require('../models/user')

const createClass = async (req, res) => {
    const { idProfesor, idAlumno, idMateria, idZona, fecha, hora} = req.body
    /** AGREGADO */
    const profesor = await UserProfesor.findById(idProfesor)
    const alumno = await UserAlumno.findById(idAlumno)

    const materia = await Materia.findById(idMateria)
    const zona = await Zona.findById(idZona)

    // Hacer el post ?
    const horario = new Horario({
        fecha,
        hora
    })

    if( profesor ){
        if( alumno ){
            if( materia ){
                if( zona ){
                    
                    const clase = new Clase({
                        alumno: alumno._id,
                        profesor: profesor._id,
                        materia: materia._id,
                        zona: zona._id,
                        horario: horario._id,
                        notificada: false
                    })
                    
                    alumno.clases.push(clase._id)
                    profesor.clases.push(clase._id)
                    profesor.notificar = true;

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
    // console.log('findClassByUser ', req.params)
    if(idUsuario){
        /** AGREGADO */
        const user = await UserAlumno.findById(idUsuario).populate('clases')
        const { clases } = user

        const finalClases = clases.map( async (clase) => {
            const claseFinal = await Clase.findById(clase._id).populate('materia').populate('zona').populate('horario').populate('alumno')
            return {
                fecha: claseFinal.horario.fecha,
                hora: claseFinal.horario.hora,
                alumno: claseFinal.alumno.nombre,
                materia: claseFinal.materia.nombre,
                zona: claseFinal.zona.nombre
            } 
        })

        const clasesProcesada = await Promise.all(finalClases)
        
        res.status(200).json({result: clasesProcesada})

    }else {
        res.status(404).json({error: 'id usuario no encontrado'})
    }
}

const claseAceptada = async (req, res) => {
    const idClase = req.params.idClase
    const clase = await Clase.findById(idClase)

    if(clase){
        clase.notificada = true;
        await clase.save()
        res.status(200).json({result: clase.notificada})
    } else {
        res.status(404).json({error: 'id de clase no encontrado'})
    }

}

module.exports = {
    createClass,
    findClassByUser,
    claseAceptada
}