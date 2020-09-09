const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config

const publicFileDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)


// Setup static directory to serve
app.use(express.static(publicFileDirectory))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name:'Chrioni eponde'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title:"Help page",
        name:'Crioni Eponde',
        helpMessage:"There is no helper message"

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:"About me",
        name:'Crioni Eponde'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error:"Must provide an address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            console.log(forecastData)
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})


app.get('/products', (req, res) =>{

    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title:"Not found",
        errorMessage:'Help data not found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        errorMessage:"Page not found"
    })
})


app.listen(3000, () => {
    console.log("The server is running to port 3000")
})