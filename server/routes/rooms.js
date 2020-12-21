const express = require('express')
const router = express.Router()
const Room = require('../models/Room')

// GET ALL ROOMS
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find()
        res.json(rooms)
    } catch (err) {
        res.json({ mesage: err })
    }
})

// GET A ROOM BY NAME
router.get('/:roomId', async (req, res) => {
    try {
        const singleRoom = await Room.findById(req.params.roomId)
        res.json(singleRoom)
    } catch (err) {
        res.json({message: err})
    }
})

// DELETE A SINGLE ROOM
router.delete('/:roomId', async (req, res) =>{
    try {
        const deletedRoom = await Room.remove({_id: req.params.roomId})
        res.json(deletedRoom)
    } catch (error) {
        res.json({message: err})
    }
})

// SUBMIT A NEW ROOM
router.post('/', async (req, res) => {
    const room = new Room({
        name: req.body.name,
        description: req.body.description,
        capacity: req.body.capacity,
        equipements: req.body.equipements,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
    });

    try {
        const savedRoom = await room.save()
        res.json(savedRoom)
    } catch (err) {
        res.json({ message: err });
    }
})

// BOOK A ROOM BY UPDATING ITS STATE
router.patch('/:roomId', async (req, res) => {
    try {
        const bookedRoom = await Room.updateOne({ _id: req.params.roomId }, {$set: {createdAt: req.body.createdAt}})
        const deadLine = await Room.updateOne({ _id: req.params.roomId }, {$set: {updatedAt: req.body.updatedAt}})
        res.json(bookedRoom, deadLine)
    } catch (err) {
        res.json({ message: err });
    }
})


module.exports = router;
