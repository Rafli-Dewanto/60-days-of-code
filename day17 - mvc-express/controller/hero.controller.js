import express from 'express'
import { getHero, getHeroById, updateHeroByid, addHero, removeHero } from '../model/Hero.model.js';

export const router = express.Router();

// Get all heroes
router.get('/', (req, res) => {
    getHero(req, res)
})

// Get hero by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    getHeroById(req, res, id)
})

// Update hero by id
router.post('/update', (req, res) => {
    const { id, name, role } = req.body;
    const data = {
        id,
        name,
        role
    }
    updateHeroByid(req, res, data)
})

// Insert data
router.post('/add', (req, res) => {
    const { name, role } = req.body;
    const data = {
        name,
        role
    }
    addHero(req, res, data)
})

// Delete Data
router.post('/remove', (req, res) => {
    const { id } = req.body;
    removeHero(req, res, id)
})