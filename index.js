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