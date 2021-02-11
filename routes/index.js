var express = require('express');
var router = express.Router();
var articles = require('../models/articles')
var orders = require('../models/orders')
var clients = require('../models/clients')
var mongoose = require('mongoose')


/* GET home page. */
router.get('/', async function(req, res, next) {
    var catalogItems = await articles.articlesModel.find({ stock: { $lte: 2 } })
    var oosCte = catalogItems.length

    var adminQuery = await clients.userModel.findById('5c52e4efaa4beef85aad5e52')
    var unreadCte = adminQuery.messages.filter(ele => ele.read === false).length
    var taskCte = adminQuery.tasks.filter(ele => ele.dateCloture === null).length

    res.render('index', { oosCte: oosCte, unreadCte: unreadCte, taskCte: taskCte });
});

/* GET tasks page. */
router.get('/tasks-page', async function(req, res, next) {
    var taskList = await clients.userModel.findById('5c52e4efaa4beef85aad5e52')
        // console.log(taskList.tasks)
    console.log(taskList.tasks[0].dateInsert)
    console.log(typeof taskList.tasks[0].dateInsert)
    res.render('tasks', { taskList: taskList.tasks });
});

/* GET Messages page. */
router.get('/messages-page', async function(req, res, next) {
    var msgList = await clients.userModel.findById('5c52e4efaa4beef85aad5e52')
    console.log(msgList.messages)
    res.render('messages', { msgList: msgList.messages });
});

/* GET Users page. */
router.get('/users-page', async function(req, res, next) {
    var clientList = await clients.userModel.find({ status: "customer" })
        // console.log(clientList[0].messages[0])
    res.render('users', { clientList: clientList });
});

/* GET Catalog page. */
router.get('/catalog-page', async function(req, res, next) {
    var catalogItems = await articles.articlesModel.find()
    res.render('catalog', { catalogItems: catalogItems });
});

/* GET Orders-list page. */
router.get('/orders-list-page', async function(req, res, next) {
    var ordersList = await orders.ordersModel.find()
    console.log(ordersList)
    res.render('orders-list', { ordersList: ordersList });
});

/* GET Order detail page. */
router.get('/order-page', async function(req, res, next) {
    var orderDetail = await orders.ordersModel.findById(req.query.orderID).populate('articles').exec()
    res.render('order', { orderDetail: orderDetail, });
});

/* GET chart page. */
router.get('/charts', async function(req, res, next) {
    var clientsAggregate = clients.userModel.aggregate()
    var genderAggregate = clientsAggregate.match({ 'status': 'customer' })
    genderAggregate.group({ _id: '$gender', usercount: { $sum: 1 } })
    genderAggregate.sort({ _id: -1 })
    var clientData = await genderAggregate.exec()

    var adminFind = await clients.userModel.findById('5c52e4efaa4beef85aad5e52')
    var msgRead = 0
    var msgUnread = 0
    for (i = 0; i < adminFind.messages.length; i++) {
        if (adminFind.messages[i].read) {
            msgRead++
        } else {
            msgUnread++
        }
    }

    // var adminId = mongoose.Types.ObjectId('5c52e4efaa4beef85aad5e52')
    // var adminAgg = clients.userModel.aggregate()
    // adminAgg.match({ '_id': adminId })
    // adminAgg
    // var adminData = await adminAgg.exec()
    // console.log(adminData)

    var ordersAggregate = orders.ordersModel.aggregate()
    ordersAggregate.match({ 'status_payment': 'validated' })
    ordersAggregate.group({ _id: '$status_shipment', ordercount: { $sum: 1 } })
    ordersAggregate.sort({ _id: -1 })
    var ordersData = await ordersAggregate.exec()

    var salesAggregate = orders.ordersModel.aggregate()
    salesAggregate.match({ 'status_payment': 'validated' })
        // salesAggregate.match({ 'date_payment': { $ne: null } })
    salesAggregate.group({
            _id: {
                sales_year: { $year: '$date_payment' },
                sales_month: { $month: '$date_payment' }
            },
            total: { $sum: '$total' }
        })
        // salesAggregate.sort({ _id: 1 })
    var salesData = await salesAggregate.exec()

    res.render('charts', { clientData: clientData, msgRead: msgRead, msgUnread: msgUnread, ordersData: ordersData, salesData: salesData });
});

module.exports = router;