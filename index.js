const express =require('express');
const app =express();
const bodyParser     =        require("body-parser");
const port=5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

customer={
    name:'kapil',
    contact:'98123456',
    gender:'Male',
    custId:4212
}
let customers=[customer];

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


app.listen(port,() => {
    console.log(`server is running on port${port}`);
})

app.get('/', function (req, res) {
    res.send('hello world')
})
app.get('/customers', function (req, res) {
    res.send(customers)
})
//handling post request to server

app.post('/', function (req, res) {
    console.log("got post request");
    console.log(req.body);
    let tempCustId=Math.floor((Math.random() * 100) + 4000);
    let tempCust={
        name:req.body.name,
        contact:req.body.contact,
        gender:req.body.gender,
        custId:tempCustId
    }
    customers.push(tempCust);
    res.send({"customerID":tempCustId})
})

app.post('/deleteCustomer', function (req, res) {
    console.log("got post request to delete customer : " +req.body.customerID);
    console.log(req.body);
    let tempCustId=req.body.customerID;
    let newCustomers=customers.filter((cust)=>cust.custId!=tempCustId)
    if(newCustomers.length!==customers.length){
        customers=newCustomers;
        res.send({status:"deleted",customerId:tempCustId})
    }else{
        res.send({status:"Not Deleted",customerId:tempCustId})
    }
})

app.get('/customer/add', function (req, res) {
    let tempCust={
        name:'ap',
        contact:Math.floor((Math.random() * 100) + 900000),
        gender:'Male',
        custId:Math.floor((Math.random() * 100) + 4000)
    }
    customers.push(tempCust);
    res.send(tempCust)
})

app.get('/customer/:id', function (req, res) {
    let custId=req.params.id;
    console.log("fetch details for custID:"+custId);
    res.send(customers.filter((cust)=>cust.custId==custId))
})

app.get('/customer/delete/:id', function (req, res) {
    let custId=req.params.id;
    console.log("deleting custID:"+custId);
    let newCustomers=customers.filter((cust)=>cust.custId!=custId)
    if(newCustomers.length!==customers.length){
        customers=newCustomers;
        res.send({status:"deleted",customerId:custId})
    }else{
        res.send({status:"Not Deleted",customerId:custId})
    }

})