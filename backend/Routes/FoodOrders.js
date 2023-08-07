const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Food = require('../Food.js');

router.post("/foodOrder", async (req, res) => {
    const token = req.header('authtoken');
    if (!token) {
        return res.status(400).json({ msg: "Authentication Error" });
    }
    const data = jwt.verify(token, process.env.SECRET);
    const user_id = data.user.id;
    await Food.create({
        user: user_id,
        data: req.body
    });


    res.json({ "msg": "Order Placed!" });
})
module.exports = router;