const express = require('express');
const router = express.Router();
const Score = require('../../models/Score');

router.get('/scores', async (req, res) => {
  try {
    const scores = await Score.find().sort({ score: -1 }).limit(10); // Get top 10 scores
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/scores', async (req, res) => {
  const score = new Score({
    username: req.body.username,
    score: req.body.score
  });

  try {
    const newScore = await score.save();
    res.status(201).json(newScore);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
