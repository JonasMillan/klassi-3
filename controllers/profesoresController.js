const Profesor =  require('../models/user')
const Horario = require('../models/horario')
const Materia = require('../models/materias')
const Escolaridad = require('../models/escolaridad')
const Zona = require('../models/zona')


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
    const result = profes.sort((e) => (e.premiun)?-1:1)
    res.status(200).json({result})
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

const addSimpleHora = async (req, res) => {
    const { idProfesor, horas } = req.body
    const hora = horas;
    let flag = true;
    const profesor = await Profesor.findById(idProfesor)
    if(profesor){
        flag = true;
        profesor.horas.forEach( (myHora) => {
            if(myHora == hora){
                flag = false;
            }
        })
        if(flag){
            profesor.horas.push(hora)
        }

        await profesor.save()
        res.status(200).json({
            result: {
            horas : profesor.horas
            }
        })
    } else {
        res.status(404).json({error: 'No existen profesores para dicho id'})
    }
}

const removeHora = async (req, res) => {
    const { idProfesor, horas } = req.body
    const profesor = await Profesor.findById(idProfesor)
    if(profesor){
        const  horasProf  = profesor.horas
        const newHoras = horasProf.filter(e => e != horas)
        profesor.horas = newHoras
        await profesor.save()
        res.status(200).json({
            result: {
                horas : profesor.horas
            }
        })
    } else {
        res.status(404).json({error: 'No existen profesores para dicho id'})
    }
}

const generarMateriaProfesor = async (req, res) => {

    const {idProfesor, materia, escolaridad} = req.body
    const materias = await Materia.find().populate('escolaridad')
    const profesor = await Profesor.findById(idProfesor)
    const escolaridadFound = await Escolaridad.find({nivel: escolaridad})
    const materiaFound = materias.find(e => e.nombre === materia && e.escolaridad.nivel === escolaridad)

    if(materiaFound){
        const materiaProfesorFound = profesor.materias.find(e => e._id === materiaFound._id)
        if(materiaProfesorFound){
            let mostrarMaterias = profesor.materias.map(async(e) => await Materia.findById(e))
            mostrarMaterias = await Promise.all(mostrarMaterias)
            res.status(200).json({result: mostrarMaterias})
        }else{
            profesor.materias.push(materiaFound._id)
            await profesor.save()
            let mostrarMaterias = profesor.materias.map(async(e) => await Materia.findById(e))
            mostrarMaterias = await Promise.all(mostrarMaterias)
            res.status(200).json({result: mostrarMaterias})
        }
    }else{

        const newMateria = new Materia({
            nombre: materia, 
            escolaridad: escolaridadFound[0]._id
        })
        profesor.materias.push(newMateria._id)

        await newMateria.save()
        await profesor.save()
        let mostrarMaterias = profesor.materias.map(async(e) => await Materia.findById(e))
        mostrarMaterias = await Promise.all(mostrarMaterias)
        res.status(200).json({result: mostrarMaterias})
    }
}

const formatProfesor = async (req, res) => {
    const { id } = req.params

    const profe = await Profesor.findById(id).populate('materias').populate('zonas')
    let materias = profe.materias.map(async (e) => {
        const escolaridad = await Escolaridad.findById(e.escolaridad)
        return{
            nombre: e.nombre,
            escolaridad: escolaridad.nivel
        }
    })
    materias = await Promise.all(materias)
    const zonas = profe.zonas.map(e =>({nombre:e.nombre}))
    res.status(200).json({result: {
        materias,
        zonas
    }})
}

const goPremiun = async (req, res) => {
    const { id } = req.params
    const profe = await Profesor.findById(id)
    profe.premiun = true
    await profe.save()
    res.status(200).json({ result: profe })
}

const addZona = async (req, res) => {
    const {zona, idProfesor} = req.body
    const zonaFound = await Zona.find({nombre:zona})
    const profe = await Profesor.findById(idProfesor)

    if(zonaFound.length > 0){
        const zonaProfe = profe.zonas.find(e => e.nombre === zonaFound[0].nombre)
        if(zonaProfe){
            res.status(200).json({result:'profesor con zona ya asignada'})
        }else{
            profe.zonas.push(zonaFound[0])
            await profe.save()
            res.status(200).json({result:profe})
        }
    }else{
        const newZona = new Zona({nombre:zona})
        profe.zonas.push(newZona)
        await profe.save()
        await newZona.save()
        res.status(200).json({result:profe})
    }
}

const removeMateria = async (req, res) => {
    const {idMateria, idProfesor} = req.body
    const profe = await Profesor.findById(idProfesor).populate('materias')
    profe.materias.filter(e => e._id.toString() != idMateria)
    await profe.save()
    res.status(200).json({result: profe.materias})
}

module.exports = {
    removeMateria,
    addZona,
    goPremiun,
    formatProfesor,
    generarMateriaProfesor,
    findProfesorByMateria,
    findProfesorById,
    findPofesores,
    addMateria,
    addHoras,
    removeHora,
    profesorNotificar,
    addSimpleHora
}