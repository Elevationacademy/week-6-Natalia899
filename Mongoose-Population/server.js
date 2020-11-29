const express = require('express')
const app = express()
const path = require('path')
const urllib = require('urllib')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/solarSystemDB', { useNewUrlParser: true })
const Schema = mongoose.Schema

app.use(express.static(path.join(__dirname, 'node_modules')))

const systemSchema = new Schema({ 
    starName: String,
    planets: [{type: Schema.Types.ObjectId, ref: 'Planet'}] 
  })
  
const planetSchema = new Schema({ 
    name: String,
    system: {type: Schema.Types.ObjectId, ref: 'System'},
    visitors: [{type: Schema.Types.ObjectId, ref: 'Visitor'}]
  })
  
  const visitorSchema = new Schema({ 
    name: String,
    homePlanet: {type: Schema.Types.ObjectId, ref: 'Planet'},
    visitedPlanets: [{type: Schema.Types.ObjectId, ref: 'Planet'}], 
  })
const System = mongoose.model("System", systemSchema)
const Planet = mongoose.model("Planet", planetSchema)
const Visitor = mongoose.model("Visitor", visitorSchema)

let system = new System({
    starName: 'SolarSystem',
    planets: []
})
let planet1 = new Planet({
    name: 'Mars',
    system: system,
    visitors: []
})

let planet2 = new Planet({
    name: 'Earth',
    system: system,
    visitors: []
})

let visitor = new Visitor({
   name: "Gagarin",
   homePlanet: planet2,
   visitedPlanets: []
})

// system.planets.push(planet1, planet2)
// planet1.visitors.push(visitor)
// planet2.visitors.push(visitor)
// visitor.visitedPlanets.push(planet1)

// system.save()
// planet1.save()
// planet2.save()
// visitor.save()
//1
// Visitor.findOne({}).populate('visitedPlanets').exec(function(err, planets){
//     console.log(planets);
// })

//2
// Planet.findOne({}).populate('visitors').exec(function(err, visitors){
//     console.log(visitors);
// })

//3
System.findOne({}).populate({
    path: 'planets',
    populate: {
        path: 'visitors'
    }
}).exec(function(err, allVisitors){
    console.log(allVisitors.planets);
})



const port = 3002
app.listen(port, function () {
    console.log(`Server is up and running smoothly`)
})
