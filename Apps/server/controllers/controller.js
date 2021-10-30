const { User, History } = require('../models')

class Controller {
    static balance(req, res){
        const id = 1
        User.findOne({
            where: { id }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(404).json({message: 'User Not Found'})
        })
    }

    static income(req, res){
        const id = 1
        const amount = +req.body.amount
        const action = 'income'
        const description = req.body.description
        let newBalance = 0
        
        User.findOne({
            where: { id }
        })
        .then(data => {

            newBalance = +data.balance + amount
            console.log(newBalance, '<<< newBalance')
            return User.update({balance: newBalance}, {where:{id}, returning: true})
        })
        .then(() => {
            return History.create({userId: id, action, description, amount})
        })
        .then(data => {
            data.newBalance = newBalance
            res.status(201).json({data, newBalance})
        })
        .catch(err => {
            res.status(404).json({message: 'User Not Found'})
        })
    }

    static expenses(req, res){
        const id = 1
        const amount = +req.body.amount
        const action = 'expenses'
        const description = req.body.description
        let newBalance = 0
        
        User.findOne({
            where: { id }
        })
        .then(data => {
            newBalance = +data.balance - amount
            console.log(newBalance, '<<< newBalance')
            return User.update({balance: newBalance}, {where:{id}, returning: true})
        })
        .then(() => {
            return History.create({userId: id, action, description, amount})
        })
        .then(data => {
            res.status(201).json({data, newBalance})
        })
        .catch(err => {
            res.status(404).json({message: 'User Not Found'})
        })
    }

    static history(req, res){
        const userId = 1
        History.findAll({
            where:{userId}
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message: "Internal Server Error"})
        })
    }
}

module.exports = Controller;