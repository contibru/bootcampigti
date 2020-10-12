import express from "express"
import {
    promises as fs
} from "fs";
import {
    stringify
} from "querystring";

const app = express();
app.use(express.json())

const db = JSON.parse(await fs.readFile("./db/grades.json"))

// //
// // Logs
// //
// const myFormat = winston.format.printf(({
//     level,
//     message,
//     label,
//     timestamp
// }) => {
//     return `${timestamp} [${label}] ${level}: ${message} `
// })

// const logger = winston.createLogger({
//     level: "silly",
//     transports: [
//         new(winston.transports.Console)(),
//         new(winston.transports.File)({
//             filename: "debug.log"
//         }),
//     ],
//     format: winston.format.combine(
//         winston.format.label({
//             label: "my-app"
//         }),
//         winston.format.timestamp(),
//         myFormat
//     )
// })

// logger.error("Error log")
// logger.warn("Warn log")
// logger.info("Info log")
// logger.verbose("verbose log")
// logger.debug("debug log")
// logger.silly("silly log")

// app.use((req, res, next) => {
//     console.log(req.body);
//     next()
// })

// app.get("/", (req, res) => {
//     res.send("Sou um get")
// })
// // Exemplos de caracteres que podem ser usados nas rotas.

// // Aceita qualquer caractere no ?.
// app.get("/teste?", (req, res) => {
//     res.send("Teste com ?")
// })

// // Aceita vários caracteres iguais ao anterior ao +.
// app.get("/buzz+", (req, res) => {
//     res.send("Teste com +")
// })

// // Aceitar qualquer coisa entre one e Blue.
// app.get("/one*Blue", (req, res) => {
//     res.send("Teste com *")
// })

// // Aceitar tanto test quanto testing.
// app.get("/test(ing)", (req, res) => {
//     res.send("Teste com ()")
// })


// app.post("/", (req, res) => {
//     res.send("Sou um post")
// })

app.route("/grades")
    .get(async (req, res) => {
        res.send(db.grades)
    })
    .post((req, res) => {
        let newGrade = req.body

        newGrade = {id: db.nextId, ...newGrade, timestamp: new Date()}
        db.grades.push(newGrade)
        db.nextId++
        fs.writeFile('./db/grades.json',JSON.stringify(db))
        res.send(newGrade)
    })

app.route("/grades/sumValueStudentSubject")
    .get(async (req, res) => {

        const sumValues = db.grades.reduce((acc, curr) => {
            return acc + (curr.student === req.body.student && curr.subject === req.body.subject ? curr.value : 0);
        },0)
        console.log(sumValues);
        res.status(200).send(sumValues.toString())
    })

app.route("/grades/avgValueSubjectType")
    .get(async (req, res) => {
        let totFounded = 0
        const sumValues = db.grades.reduce((acc, curr) => {
            if (curr.subject === req.body.subject && curr.type === req.body.type) {
                totFounded++
                return acc + curr.value
            } else {
                return acc + 0
            }
        }, 0)
        console.log(sumValues);
        console.log(totFounded);
        res.status(200).send((sumValues / totFounded).toString())
    })    

    app.route("/grades/orderByValueSubjectType")
    .get(async (req, res) => {
        
        const gradesFiltered = db.grades.filter(value => {
            return value.subject === req.body.subject && value.type === req.body.type
        })
        console.log(gradesFiltered);
        const gradesSorted = gradesFiltered.sort((a, b) => {
            return a.value - b.value
        }).reverse().splice(0,3)

        res.status(200).send(gradesSorted)
    })    

    app.route("/grades/:id")
    .get(async (req, res) => {
        const grade = db.grades.find(el => {
            return el.id === parseInt(req.params.id)
        })
        res.send(grade)
    })
    .put((req, res) => {
        let grade = req.body
        const index = db.grades.findIndex(el => el.id === parseInt(req.params.id))
        if (index < 0) {
            res.status(404).send(`Grade ${req.params.id} not found!`)
        }
        grade = { id: db.grades[index].id, ...grade, timestamp: new Date() }
        db.grades[index] = grade
        fs.writeFile('./db/grades.json',JSON.stringify(db))
        res.send(grade)
    })
    .delete((req, res) => {
        const index = db.grades.findIndex(el => el.id === parseInt(req.params.id))
        if (index < 0) {
            res.status(404).send(`Grade ${req.params.id} not found!`)
        }
        
        db.grades.splice(index, 1)
        fs.writeFile('./db/grades.json',JSON.stringify(db))
        res.send(`Grade ${req.params.id} deleted!`)
    })

// Tratamento de erro.
app.use((err, req, res, next) => {
    res.status(500).send("Ocorreu um erro")
})

app.listen(3000, () => {

    console.log("Ouvindo na porta 3000.");
})