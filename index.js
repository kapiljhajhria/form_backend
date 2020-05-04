const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const port = 5000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb+srv://kapil:aspace@cluster0-84mgq.mongodb.net/test?retryWrites=true&w=majority';

// Database Name
const dbName = 'myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log(err)
    console.log("Connected successfully to server");

    const db = client.db("forms");

    client.close();
});
customer = {
    name: 'kapil',
    contact: '98123456',
    gender: 'Male',
    customerID: 4212
}
let customers = [customer];
let deleteCustomers = [];
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});


app.listen(port, () => {
    console.log(`server is running on port${port}`);
})

app.get('/', function (req, res) {
    res.send('hello world')
})
app.get('/customers', function (req, res) {
    res.send(customers)
})
app.get('/deletedCustomers', function (req, res) {
    res.send(deleteCustomers.map((delCust) => delCust[0]))
})
//handling post request to server

app.post('/', function (req, res) {
    console.log("got post request");
    console.log(req.body);
    let tempcustomerID = Math.floor((Math.random() * 100) + 4000);
    let tempCust = {
        name: req.body.name,
        contact: req.body.contact,
        gender: req.body.gender,
        customerID: tempcustomerID
    }
    customers.push(tempCust);
    res.send({"customerID": tempcustomerID})
})

app.post('/deleteCustomer', function (req, res) {
    console.log("got post request to delete customer : " + req.body.customerID);
    console.log(req.body);
    let tempcustomerID = req.body.customerID;
    let deletedCustIndex = req.body.index;
    deleteCustomers.push([customers.filter((cust) => cust.customerID == tempcustomerID)[0], deletedCustIndex, new Date().getTime()])
    let newCustomers = customers.filter((cust) => cust.customerID != tempcustomerID)
    if (newCustomers.length !== customers.length) {
        customers = newCustomers;
        res.send({status: "deleted", customerID: tempcustomerID})
    } else {
        res.send({status: "Not Deleted", customerID: tempcustomerID})
    }
})
app.post('/undoDelete', function (req, res) {
    console.log("got post request to delete customer : " + req.body.customerID);
    console.log(req.body);
    let tempcustomerID = req.body.customerID;
    let custData = deleteCustomers.filter((cust) => cust[0].customerID == tempcustomerID)[0];
    customers.push(custData[0])
    if (custData.length !== 0) {
        res.send({status: 'Found', deletedCustomer: custData[0], deletedCustomerIndex: custData[1]})
    } else {
        res.send({status: "notFound",})
    }
})

app.get('/customer/add', function (req, res) {
    let tempCust = {
        name: 'ap',
        contact: Math.floor((Math.random() * 100) + 900000),
        gender: 'Male',
        customerID: Math.floor((Math.random() * 100) + 4000)
    }
    customers.push(tempCust);
    res.send(tempCust)
})

app.get('/customer/:id', function (req, res) {
    let customerID = req.params.id;
    console.log("fetch details for customerID:" + customerID);
    res.send(customers.filter((cust) => cust.customerID == customerID))
})

app.get('/customer/delete/:id', function (req, res) {
    let customerID = req.params.id;
    console.log("deleting customerID:" + customerID);
    let newCustomers = customers.filter((cust) => cust.customerID != customerID)
    if (newCustomers.length !== customers.length) {
        customers = newCustomers;
        res.send({status: "deleted", customerId: customerID})
    } else {
        res.send({status: "Not Deleted", customerId: customerID})
    }

})