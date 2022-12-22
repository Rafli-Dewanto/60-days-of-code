const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members')

// Chaining method
router.route('/')
    .get((req, res) => res.json(members))
    .post((req, res) => {
        const newMember = {
            id: uuid.v4(),
            name: req.body.name,
            email: req.body.email,
            status: 'active '
        };
        if (!newMember.name || !newMember.email) {
            return res.status(400).json({ "message": "Please include a name and email.", "Status code": 400 })
        }
        members.push(newMember);
        res.status(201).json(members)
    })

// get all members
router.get('/', (req, res) => {
    res.json(members)
})

// get single member
router.get('/:id', (req, res) => {
    const found = members.some((member) => member.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter((member) => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ "message": `no member with the id of ${req.params.id}`, "status code": 400 });
    }
})

// Update member
router.put('/:id', (req, res) => {
    const found = members.some((member) => member.id === parseInt(req.params.id));
    if (found) {
        const updateMember = req.body;
        members.forEach((member) => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;
                res.json({ "message": "Update data succeed", member });
            }
        });
    } else {
        res.status(400).json({ "message": `no member with the id of ${req.params.id}`, "status code": 400 });
    }
})

// delete member
router.delete('/:id', (req, res) => {
    const found = members.some((member) => member.id === parseInt(req.params.id));
    if (found) {
        members.splice(req.params.id - 1, 1)
        res.status(200).json({ "message": "member deleted", members })
    } else {
        res.status(400).json({ "message": `no member with the id of ${req.params.id}`, "status code": 400 });
    }
})

// Create Member
// router.post('/', (req, res) => {
//     const newMember = {
//         id: uuid.v4(),
//         name: req.body.name,
//         email: req.body.email,
//         status: 'active '
//     };
//     if (!newMember.name || !newMember.email) {
//         return res.status(400).json({ "message": "Please include a name and email", "Status code": 400 })
//     }
//     members.push(newMember);
//     res.status(201).json(members)
// })

module.exports = router 