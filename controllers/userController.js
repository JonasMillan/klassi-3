const User = require('../models/user')
const Escolaridad = require('../models/escolaridad') 
const Zona = require('../models/zona')

const postRegister = async (req, res) => {
    const {
        rol = undefined,
        nombre = undefined,
        apellido = undefined,
        email = undefined,
        password = undefined,
        descripcion= undefined,
        premiun = undefined,
        notificar = false,
        clases = [],
        zonas =  [],
        materias = [],
        horarios = []
    } = req.body    

    const user = new User({
        rol,
        nombre,
        apellido,
        email,
        password,
        descripcion,
        premiun,
        notificar,
        clases,
        zonas,
        materias,
        horarios,
    })

    await user.save()
    res.send(200).json({result: user})
}

const postLogin = async (req, res) => {
    // destructuracion del body
    const { email, password } = req.body
    // busqueda de alumno
    const user = await User.find({email})
    // validacion
    if(user.length > 0){
        if(user[0].password === password){
            res.status(200).json({
                result: {
                    _id : user[0]._id,
                    rol : user[0].rol,
                    notificar: user[0].notificar
                }
            })
        }
    }else{
        res.status(404).json({error:'Email no encontrada'})
    }
}


module.exports = {
    postRegister,
    postLogin
}

