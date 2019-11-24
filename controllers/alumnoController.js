const Alumno = require('../models/user')
const Escolaridad = require('../models/escolaridad') 
const Zona = require('../models/zona')
const Clase = require('../models/clases')


const findAlumno = async (req, res) => {
    // setea el id de la ruta dinamica
    const id = req.params.id
    // busca por id y popula la data
    const alumno = await Alumno.findById(id).populate('escolaridad').populate('zona').populate('clases')
    if(alumno){
        res.status(200).json({ result: alumno })
    }else{
        res.status(404).json({ error:'id no encontrada' })
    }
}

const getClasesNotificadas = async (req, res) => {
    const id = req.params.id
    const user = await Alumno.findById(id).populate('clases')

    if(user){
        const { clases } = user
        const finalClases = clases.map( async (clase) => {
            if(clase.notificada){
                const claseFinal = await Clase.findById(clase._id).populate('zona').populate('horario').populate('profesor').populate('alumno')
                return {
                    fecha: claseFinal.horario.fecha,
                    hora: claseFinal.horario.hora,
                    profesor: claseFinal.profesor.nombre,
                    alumno: claseFinal.alumno.nombre,
                    zona: claseFinal.zona.nombre
                } 
            }
        })
        const clasesProcesada = await Promise.all(finalClases)
        res.status(200).json({result: clasesProcesada})
    } else {
        res.status(404).json({error: 'id usuario no encontrado'})
    }
}

module.exports = {
    findAlumno,
    getClasesNotificadas
}

