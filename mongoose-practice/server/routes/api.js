const express = require('express')
const { db } = require('../models/Person')
const router = express.Router()

const Person = require('../models/Person')

router.get('/people', function (req, res) {
    Person.find({}, function (err, people) {
        res.send(people)
    })
})

router.post('/person', function(req, res){
let person = req.body
let newPerson = new Person({ firstName: person.firstName, lastName: person.lastName, age: person.age})
   newPerson.save()
   res.end()
})

router.put('/person/:id', function(req, res){
    let id = req.params.id
    Person.findByIdAndUpdate(id, { age: 70 }, { new: true }, function (err, response) {
       res.end()
    })
})

router.delete('/apocalypse', function(req, res) {
    Person.find({}, function (err, people) {
        people.forEach(p => p.remove())
    })
    res.end()
} )



module.exports = router