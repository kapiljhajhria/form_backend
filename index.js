const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');

// Connection URL
const url = 'mongodb+srv://kapil:aspace@cluster0-84mgq.mongodb.net/test?retryWrites=true&w=majority';
// Database Name
const dbName = 'myproject';
let dbClient;


const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const port = 5000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


// Use connect method to connect to the server

customer = {
    name: 'kapil',
    contact: '98123456',
    gender: 'Male',
    customerID: 4212
}
let customers = [];
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


app.listen(port, async () => {
    dbClient = await MongoClient.connect(url);
    listDatabases(dbClient)
    console.log(`server is running on port${port}`);
})

app.get('/', function (req, res) {
    res.send('hello world')
})
app.get('/customers', async function (req, res) {
    let collectionData = await dbClient.db('forms').collection('customers').find({"active": true}).toArray();
    res.send(collectionData)
})

//handling post request to

app.post('/', async function (req, res) {
    console.log("got post request");
    console.log(req.body);
    let tempcustomerID = Math.floor((Math.random() * 100) + 4000);
    let tempCust = {
        active: true,
        name: req.body.name,
        contact: req.body.contact,
        gender: req.body.gender,
        customerID: tempcustomerID
    }
    customers.push(tempCust);
    let result = await dbClient.db('forms').collection('customers').insertOne(tempCust);
    // console.log(result.ops)
    res.send(result.ops[0])
})
app.post('/signup', async function (req, res) {
    console.log("got user request to login");
    console.log(req.body);
    let userSignUpDetails = {
        email: req.body.email,
        password: req.body.pswd,
    }
    let result = await dbClient.db('forms').collection('users').insertOne(userSignUpDetails);
    console.log("printing result.ops[0]")
    console.log(result.ops[0].email)
    if (result.ops[0].email === req.body.email)
        res.send({"successful": true})
    else
        res.send({"successful": false})
})
app.post('/deleteCustomer', async function (req, res) {
    console.log("got post request to delete customer : " + req.body.customerID);
    console.log(req.body);
    let tempcustomerID = req.body.customerID;
    let result = await dbClient.db('forms').collection('customers').updateOne({"_id": ObjectId(tempcustomerID)}, {$set: {active: false}});
    if (result.deletedCount === 1) {
        res.send({status: "deleted", customerID: tempcustomerID})
    } else {
        res.send({status: "Not Deleted", customerID: tempcustomerID})
    }
})
app.post('/undoDelete', async function (req, res) {
    console.log("got post request to delete customer : " + req.body.customerID);
    console.log(req.body);
    let tempcustomerID = req.body.customerID;
    let result = await dbClient.db('forms').collection('customers').updateOne({"_id": ObjectId(tempcustomerID)}, {$set: {active: true}});
    // if (custData.length !== 0) {
    //     res.send({status: 'Found', deletedCustomer: custData[0], deletedCustomerIndex: custData[1]})
    // } else {
    //     res.send({status: "notFound",})
    // }
})

app.get('/customer/add', function (req, res) {
    let tempCust = {
        active: true,
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