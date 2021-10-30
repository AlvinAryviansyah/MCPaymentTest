const router = require('express').Router();
const Controller = require('../controllers/controller')

router.get('/balance', Controller.balance)
router.patch('/income', Controller.income)
router.patch('/expenses', Controller.expenses)
router.get('/history', Controller.history)

module.exports = router;