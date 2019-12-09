const path= require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')

const port = process.env.PORT || 3000


//Define paths for express config
const pubDir = path.join(__dirname,'../public')
const viewpath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//set up handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewpath )
hbs.registerPartials(partialsPath)
//Set up static Directory to Serve
app.use(express.static(pubDir))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Christian Hall'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Christian Hall'
    }
    )
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Help",
        mess:"this is a message for help",
        name: "Christian Hall"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You need to include an address'
        })
    }

    geocode(req.query.address,(error, {lat,long,loc}={})=>{
        if (error){
            return res.send({error})
        }
        forecast(lat, long, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            console.log(loc)
            console.log(forecastData)
            res.send({
                location:loc,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
    
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error: ' you must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        mess:'help article not found',
        name:'Christian Hall',
        title:'Help'})
})
app.get('*',(req,res)=>{
    res.render('404',{
        mess:'Page not found',
        name:'Christian Hall',
        title:'404'})
})

app.listen(port, ()=>{
    console.log('Server is up on port '+ port)
})