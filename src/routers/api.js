const express = require("express");
const router = new express.Router();
const AthleteRanking = require("../models/athletes");

// Insert into db
router.post("/athletes", async (req, res) => {
    try {
        const addAthelete = new AthleteRanking(req.body);
        const insertAthelete = await addAthelete.save();
        res.status(201).send(insertAthelete);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

// Read from db
router.get("/athletes", async (req, res) => {
    try {
        const getAthelete = await AthleteRanking.find({}, { '_id': 0, '__v': 0 }).sort({ "rank": 1 });
        console.log(getAthelete);
        res.send(getAthelete);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

// Read from db by rank
router.get("/athletes/rank/:rank", async (req, res) => {
    try {
        const _rank = req.params.rank;
        const getAthleteByRank = await AthleteRanking.findOne({ rank: _rank }, { '_id': 0, '__v': 0 });
        const present = await AthleteRanking.exists({ rank: _rank });
        if (!present) {
            res.status(400).send({ error: "Rank not found!" });
        }
        else {
            res.send(getAthleteByRank);
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
});

// Read from db by nationality
router.get("/athletes/nationality/:nat", async (req, res) => {
    try {
        const _nat = req.params.nat.toUpperCase();
        const getAthleteByNat = await AthleteRanking.find({ nationality: _nat }, { '_id': 0, '__v': 0 }).sort({ "rank": 1 });
        const present = await AthleteRanking.exists({ nationality: _nat });
        if (!present) {
            res.status(400).send({ error: "Nationality not found!" });
        }
        else {
            res.send(getAthleteByNat);
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
});

// update in db by rank
router.patch('/athletes/:rank', async (req, res) => {
    try {
        const _rank = req.params.rank;
        const getAthelete = await AthleteRanking.findOneAndUpdate({ rank: _rank }, req.body, { new: true });
        res.send(getAthelete);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

// delete from db by rank
router.delete('/athletes/:rank', async (req, res) => {
    try {
        const _rank = req.params.rank;
        const getAthelete = await AthleteRanking.findOneAndDelete({ rank: _rank });
        res.send(getAthelete);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;