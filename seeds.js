const Zona = require('./models/zona')
const Materia = require('./models/materias')
const Escolaridad = require('./models/escolaridad')
// const Profesor = require('./models/profesor')
const User = require('./models/user')


const seeds = async () => {
    const escolaridades = await Escolaridad.find() 

    
    if(escolaridades.length === 0){
        const Belgrano = new Zona({nombre:'Belgrano'})
        const Palermo = new Zona({nombre:'Palermo'})
        const Colegiales = new Zona({nombre:'Colegiales'})
        const Saavedra = new Zona({nombre:'Saavedra'})
        const arrZonas = [Belgrano,Palermo,Colegiales, Saavedra]
        
        const Primario = new Escolaridad({nivel:'Primario'})
        const Secundario = new Escolaridad({nivel:'Secundario'})
        const Terciario = new Escolaridad({nivel:'Terciario'})
        const arrEsco = [Primario,Secundario,Terciario]
        
        const MatematicaPrimaria = new Materia({nombre:'Matematica', escolaridad: Primario._id})
        const MatematicaSecundario = new Materia({nombre:'Matematica', escolaridad: Secundario._id})
        const MatematicaTerciario = new Materia({nombre:'Matematica', escolaridad: Terciario._id})
        const FisicaPrimaria = new Materia({nombre:'Fisica', escolaridad: Primario._id})
        const FisicaSecundario = new Materia({nombre:'Fisica', escolaridad: Secundario._id})
        const FisicaTerciario = new Materia({nombre:'Fisica', escolaridad: Terciario._id})
        const LiteraturaPrimaria = new Materia({nombre:'Literatura', escolaridad: Primario._id})
        const LiteraturaSecundario = new Materia({nombre:'Literatura', escolaridad: Secundario._id})
        const LiteraturaTerciario = new Materia({nombre:'Literatura', escolaridad: Terciario._id})
        const QuimicaPrimaria = new Materia({nombre:'Quimica', escolaridad: Primario._id})
        const QuimicaSecundario = new Materia({nombre:'Quimica', escolaridad: Secundario._id})
        const QuimicaTerciario = new Materia({nombre:'Quimica', escolaridad: Terciario._id})
        const seedsMaterias = [
            MatematicaPrimaria,
            MatematicaSecundario,
            MatematicaTerciario,
            FisicaPrimaria,
            FisicaSecundario,
            FisicaTerciario,
            LiteraturaPrimaria,
            LiteraturaSecundario,
            LiteraturaTerciario,
            QuimicaPrimaria,
            QuimicaSecundario,
            QuimicaTerciario,
        ]

        const felipe = new User({
            rol: 'Profesor',
            nombre: 'Felipe',
            apellido: 'williams',
            email: 'felipe@gmail.com',
            password: '123',
            descripcion: 'Tengo 10 años de experiencia en escuela primaria, secundaria y terciaria',
            premiun: false,
            notificar: false,
            horas:["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"],
            clases: [],
            zonas: [Belgrano._id, Saavedra._id, Palermo._id, Colegiales._id],
            materias: [MatematicaPrimaria._id, FisicaPrimaria._id, LiteraturaPrimaria._id, QuimicaPrimaria._id, MatematicaSecundario._id, FisicaSecundario._id, LiteraturaSecundario._id, QuimicaSecundario._id, MatematicaTerciario._id, FisicaTerciario._id, LiteraturaTerciario._id, QuimicaTerciario._id],
            horarios: []    
        })

        const pancaracio = new User({
            rol: 'Profesor',
            nombre: 'Luis',
            apellido: 'Gutierrez',
            email: 'luis@gmail.com',
            password: '123',
            descripcion: 'Soy un profesor con 8 años de experiencia',
            premiun: false,
            notificar: false,
            horas:["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"],
            clases: [],
            zonas: [Belgrano._id, Saavedra._id],
            materias: [MatematicaPrimaria._id, FisicaPrimaria._id, LiteraturaPrimaria._id, QuimicaPrimaria._id, MatematicaSecundario._id, FisicaSecundario._id, LiteraturaSecundario._id, QuimicaSecundario._id],
            horarios: []    
        })
        const Mora = new User({
            rol: 'Profesor',
            nombre: 'Mora',
            apellido: 'Suarez',
            email: 'mora@gmail.com',
            password: '123',
            descripcion: 'Hice una licensiatura para profesora de primaria',
            premiun: false,
            notificar: false,
            horas:["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"],
            clases: [],
            zonas: [Palermo._id, Colegiales._id],
            materias: [MatematicaPrimaria._id, FisicaPrimaria._id, LiteraturaPrimaria._id, QuimicaPrimaria._id, MatematicaTerciario._id, FisicaTerciario._id, LiteraturaTerciario._id, QuimicaTerciario._id],
            horarios: []     
        })
        const Jonas = new User({
            rol: 'Profesor',
            nombre: 'Jonas',
            apellido: 'Sanchez',
            email: 'jonas@gmail.com',
            password: '123',
            descripcion: 'Estoy terminando mi carrera de profesorado de letras',
            premiun: false,
            notificar: false,
            horas:["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"],
            clases: [],
            zonas: [Palermo._id, Belgrano._id],
            materias: [MatematicaSecundario._id, FisicaSecundario._id, LiteraturaSecundario._id, QuimicaSecundario._id],
            horarios: []     
        })
        const Jor = new User({
            rol: 'Profesor',
            nombre: 'Jorge',
            apellido: 'Gutierrez',
            email: 'jorge@gmail.com',
            password: '123',
            descripcion: 'esto es una descripcion bastante descriptiva...',
            premiun: false,
            notificar: false,
            horas:["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"],
            clases: [],
            zonas: [Palermo._id, Colegiales._id],
            materias: [MatematicaSecundario._id, FisicaSecundario._id, LiteraturaSecundario._id, QuimicaSecundario._id, MatematicaPrimaria._id, FisicaPrimaria._id, LiteraturaPrimaria._id, QuimicaPrimaria._id],
            horarios: []     
        })
        const Santi = new User({
            rol: 'Profesor',
            nombre: 'Santiago',
            apellido: 'Pueihgyredon',
            email: 'santi@gmail.com',
            password: '123',
            descripcion: 'esto es una descripcion bastante descriptiva...',
            premiun: false,
            notificar: false,
            horas:["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"],
            clases: [],
            zonas: [Colegiales._id, Saavedra._id],
            materias: [MatematicaTerciario._id, FisicaTerciario._id, LiteraturaTerciario._id, QuimicaTerciario._id],
            horarios: []     
        })
        const Lau = new User({
            rol: 'Profesor',
            nombre: 'Lautaro',
            apellido: 'Penia',
            email: 'lautaro@gmail.com',
            password: '123',
            descripcion: 'Doy clases relajadas, con tiempos de distercion',
            premiun: false,
            notificar: false,
            horas:["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"],
            clases: [],
            zonas: [Colegiales._id, Belgrano._id],
            materias: [MatematicaTerciario._id, FisicaTerciario._id, LiteraturaTerciario._id, QuimicaTerciario._id, MatematicaSecundario._id, FisicaSecundario._id, LiteraturaSecundario._id, QuimicaSecundario._id], 
            horarios: []     
        })

        const profes = [pancaracio,Mora,Santi,Lau,Jonas,Jor,felipe]

        const allSeeds = [...arrEsco,...seedsMaterias, ...arrZonas, ...profes]
        allSeeds.map(e => e.save())
        console.log('done!!!!')
    }
}

module.exports = {
    seeds
}