const Alumno = require('../models/user')
const Escolaridad = require('../models/escolaridad') 
const Zona = require('../models/zona')

const postRegister = async (req, res) => {
    // destructuracion del body
    const {nombre, apellido, email, password, escolaridad, zona} = req.body
    // find en los modelos
    const nivel = await Escolaridad.find({nivel: escolaridad})
    const ubicacion = await Zona.find({nombre: zona})
    // validacion 
    if(nivel.length > 0){
        if(ubicacion.length > 0){
            const alumno = new User({
                nombre,
                apellido,
                email,
                password,
                escolaridad: nivel[0]._id,
                zona:ubicacion[0]._id,
                clases:[]
            })
            await alumno.save()
            res.send(200).json({result: alumno})
        }else{
            res.send(404).json({error:'Zona no encontrada'})
        }
    }else{
        res.send(404).json({error:'Escolaridad no encontrada'})
    }
}

const postLogin = async (req, res) => {
    // destructuracion del body
    const { email, password } = req.body
    // busqueda de alumno
    const alumno = await Alumno.find({email})
    // validacion
    if(alumno.length > 0){
        if(alumno[0].password === password){
            res.status(200).json({
                result: alumno[0]._id
            })
        }
    }else{
        res.status(404).json({error:'Email no encontrada'})
    }
}

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

module.exports = {
    postRegister,
    postLogin,
    findAlumno
}

