const express = require('express')
const router = express.Router()
const Room = require('../models/Room')

router.get('/', (req, res) => {
    res.send('Select a room')
})


router.post('/', (req, res) => {
    const room = new Room({
        name: req.body.name,
        description: req.body.description,
        capacity: req.body.capacity,
        equipements: req.body.equipements,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
    });

    room.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        })
})


module.exports = router;
