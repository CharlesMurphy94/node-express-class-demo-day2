const express = require('express'),
        bodyParser = require('body-parser'),
        cors = require('cors'),
        app = express(),
        port = 3000,
        data = require('./data')

app.use(bodyParser.json())        
app.use(cors());
app.get('/api/student',(req,res)=>{
    let matches = data
    if(req.query.grade){
        matches = matches.filter(e=>{
            if (e.grade === +req.query.grade[0]
            || e.grade === +req.query.grade[1]){
                return e
            }
        })
        // console.log(matches)
    } 
    if(req.query.name){
        matches = matches.filter(e=>{
            if (e.name === req.query.name){
                return e
            }
        })
        // console.log(matches)
    } 
    res.status(200).send(matches)
})

app.post('/api/newStudent', (req,res)=>{
    // res.end() -- no data sent back but end request
    // res.send() -- send data and end request 
    data.push(req.body)
    res.status(200).end()


})

app.post('/api/admin', (req,res) =>{
    let admin = {
        username: 'Ironman',
        password: 'IH8CaptainAmerica'}
    let {username, password } = req.body
    if (username === admin.username && password === admin.password){
        res.status(200).redirect('http://google.com')
    }
    else {
        res.status(403).send('get outta here')
    }

})
app.get('/api/age', (req,res) =>{
    let matches = data;
    if (req.query.over){
        matches = matches.filter(e=>{
            if (e.age>+req.query.over) return e 
        })
    }
    if (req.query.under){
        matches = matches.filter(e=>{
            if (e.age<+req.query.under) return e
        })
    }
    res.status(200).send(matches)
})
app.get('/api/grade/:grade',(req,res)=>{
    let matches = data.filter(e=>{
        if (e.grade === +req.params.grade) return e
    })
    if (req.query.age){
        matches = matches.filter(e=>{
            if (e.age === +req.query.age) return e
        })
    }
    res.status(200).send(matches)
})


app.listen(port,()=> console.log(`listening on port ${port}`))

