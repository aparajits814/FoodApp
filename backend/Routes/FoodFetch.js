const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Food = require('../Food.js');

router.get('/foodfetch', async (req, res) => {
    const token = req.header('authtoken');
    if (!token) {
        return res.status(400).json({ msg: "Authentication Error" });
    }
    const data = jwt.verify(token, process.env.SECRET);
    const user_id = data.user.id;
    const response = await Food.find({ user: user_id });
    res.json(response);
});
module.exports=router;