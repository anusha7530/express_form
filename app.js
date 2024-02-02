const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;

//EXPRESS SPECIFIC CONFIGURATION/STUFF
app.use('/static', express.static('static')); //end-point to show js without execution
app.use(express.urlencoded());

//PUG SPECIFIC CONFIGURATION/STUFF
app.set('view engine','pug');   //set the template engine as pug
app.set('views',path.join(__dirname,'views')); //set the views directory 

//ENDPOINTS
app.get('/', (req,res)=>{
    const params = {'title': 'LENSHUB','message': 'Get the lenshub membership for 50$ - Fill this form now'};
    res.status(200).render('index.pug',params);
})
app.post('/', (req,res)=>{
    name= req.body.name
    age= req.body.age
    gender= req.body.gender
    address= req.body.address
    more= req.body.more

    let outputToWrite = `The name of the client is ${name},${age} years old, ${gender}, residing at ${address}. More about client: ${more}                    `;
    fs.appendFileSync('output.txt',outputToWrite);
    const params = {'title': 'LENSHUB','message': 'Your form has been submitted successfully'};
    res.status(200).render('index.pug',params);
});

app.listen(port,()=>{
    console.log(`The application is started on port ${port}`)
}); 