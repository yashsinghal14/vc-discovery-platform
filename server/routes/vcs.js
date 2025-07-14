const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// VC Model
const Vc = require('../models/Vc');

// Get all VCs
router.get('/', async (req, res) => {
    try {
        const vcs = await Vc.find();
        res.json(vcs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a VC
router.post('/', async (req, res) => {
    const vc = new Vc({
        name: req.body.name,
        firm: req.body.firm,
        email: req.body.email,
        specialties: req.body.specialties,
        location: req.body.location,
        website: req.body.website,
        portfolio: req.body.portfolio,
        fundSize: req.body.fundSize,
        description: req.body.description,
        linkedin: req.body.linkedin
    });
    try {
        const newVc = await vc.save();
        res.status(201).json(newVc);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a VC
router.patch('/:id', async (req, res) => {
    try {
        const vc = await Vc.findById(req.params.id);
        if (vc == null) {
            return res.status(404).json({ message: 'VC not found' });
        }

        Object.assign(vc, req.body);
        const updatedVc = await vc.save();
        res.json(updatedVc);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a VC
router.delete('/:id', async (req, res) => {
    try {
        const vc = await Vc.findById(req.params.id);
        if (vc == null) {
            return res.status(404).json({ message: 'VC not found' });
        }
        await vc.remove();
        res.json({ message: 'VC deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
