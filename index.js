const express =require('express');
const app =express();

const port=5000;

customer={
    name:'kapil',
    contactNo:'9812345678',
    gender:'Male',
    customerID:4212
}
let customers=[customer];

app.listen(port,() => {
    console.log(`server is running on port${port}`);
})

app.get('/', function (req, res) {
    res.send('hello world')
})
app.get('/customers', function (req, res) {
    res.send(customers)
})

app.get('/customers/add', function (req, res) {
    let tempCust={
        name:'ap',
        contactNo:Math.floor((Math.random() * 100) + 900000),
        gender:'Male',
        customerID:Math.floor((Math.random() * 100) + 4000)
    }
    customers.push(tempCust);
    res.send(tempCust)
})

app.get('/customer/:id', function (req, res) {
    let custId=req.params.id;
    console.log("fetch details for custID:"+custId);
    res.send(customers.filter((cust)=>cust.customerID==custId))
})

app.get('/customer/delete/:id', function (req, res) {
    let custId=req.params.id;
    console.log("deleting custID:"+custId);
    let newCustomers=customers.filter((cust)=>cust.customerID!=custId)
    if(newCustomers.length!==customers.length){
        customers=newCustomers;
        res.send({status:"deleted",customerId:custId})
    }else{
        res.send({status:"Not Deleted",customerId:custId})
    }

})