import express from "express"
import {
    promises as fs
} from "fs";
import mongoose from "mongoose";
import {
    accountsModel
} from './db/AccountsModel.js';

mongoose.connect('mongodb+srv://contibru:180fhf@cluster0.rs4sz.mongodb.net/my-bank-api?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch(e => {
        const msg = 'ERRO! Não foi possível conectar com o MongoDB!'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })

const app = express();
app.use(express.json())

app.route("/deposit")
    .post(async (req, res) => {
        let deposit = req.body
        const account = await accountsModel.findOne({
            agencia: deposit.agencia,
            conta: deposit.conta
        }, (err, doc) => {

            if (err)
                res.sendStatus(400)
            if (doc) {
                doc.balance += deposit.valor
                doc.save()
                res.send(doc)
            }
        });

        if (!account)
            res.sendStatus(404)
    })

app.route("/withdrew")
    .post(async (req, res) => {
        let withdrew = req.body
        const account = await accountsModel.findOne({
            agencia: withdrew.agencia,
            conta: withdrew.conta
        }, (err, doc) => {

            if (err)
                res.sendStatus(400)
            if (doc) {
                if (doc.balance - withdrew.valor < 0) {
                    res.status(500).send('Saldo insuficiente!')
                }

                doc.balance = doc.balance - withdrew.valor
                doc.save()
                res.send(doc)
            }
        });

        if (!account)
            res.sendStatus(404)
    })


app.route("/checkbalance")
    .get(async (req, res) => {
        let check = req.body
        const account = await accountsModel.findOne({
            agencia: check.agencia,
            conta: check.conta
        }, (err, doc) => {

            if (err)
                res.sendStatus(400)
            if (doc) {
                console.log(doc);
                res.send(doc.balance.toString())
            }
        });

        if (!account)
            res.sendStatus(404)
    })

app.route("/delete")
    .delete(async (req, res) => {
        let check = req.body
        const account = await accountsModel.findOne({
            agencia: check.agencia,
            conta: check.conta
        }, async (err, doc) => {

            if (err)
                res.sendStatus(400)
            if (doc) {
                await doc.deleteOne()
                await accountsModel.count({ agencia: check.agencia }, (err, count) => {
                    res.status(200).send(count.toString())
                })
        

            }
        });

        if (!account)
            res.sendStatus(404)

        




    })



// Tratamento de erro.
app.use((err, req, res, next) => {
    res.status(500).send("Ocorreu um erro")
})

app.listen(3000, () => {

    console.log("Ouvindo na porta 3000.");
})