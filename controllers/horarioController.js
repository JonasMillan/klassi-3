const Users = require('../models/user')
const Horario = require('../models/horario')

const createHorario = async (req, res) => {
    
    const {fecha, hora, idUsuario} = req.body
    const horario = new Horario({fecha, hora})
    const user = await Users.findById(idUsuario)
    horario.save()
    user.horarios.push(horario._id)
    user.save()
    res.status(200).json({result: user})
}

module.exports = {
    createHorario
}