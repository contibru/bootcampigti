import { mongoose } from "mongoose";

mongoose.connect('mongodb+srv://contibru:180fhf@cluster0.rs4sz.mongodb.net/my-bank-api?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })
    .catch(e => {
        const msg = 'ERRO! Não foi possível conectar com o MongoDB!'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })

    export mongoose