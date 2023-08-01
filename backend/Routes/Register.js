const express = require('express');
const router = express.Router();
const User = require('../User.js');
const { body, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');

router.post("/register", [body('email', 'Incorrect email').isEmail()], async (req, res) => {
    const salt = await bcryptjs.genSalt(10);
    const secPass = await bcryptjs.hash(req.body.password, salt);
    const userData =await User.findOne({ email: req.body.email });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    } else {
        try {
            if (userData !== null) {
                return res.json({ msg: "User Already Exists", msgType: "warning" });
            }
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
                location: req.body.location
            })
            res.json({ msg: "Registered Successfully", msgType: "success" });
        } catch (error) {
            res.json({ msg: "Error", msgType: "error" });
        }
    }
});
module.exports = router;