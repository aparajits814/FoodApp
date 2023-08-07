const express = require('express');
const router = express.Router();
const User = require('../User.js');
const bcryptjs = require('bcryptjs');
const jwt=require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const userData = await User.findOne({email:req.body.email});
    if (!userData) {
        return res.status(400).json({ msg: "User Does Not Exist", successUser: false,successPassword: true });
    }
    const cmp = await bcryptjs.compare(req.body.password, userData.password);
    if (cmp === false) {
        return res.status(400).json({ msg: "Password is Incorrect", successUser: true ,successPassword: false });
    }
    let data={
        user:{
            id:userData._id
        }
    }
    const authToken=jwt.sign(data,process.env.SECRET);
    res.json({ msg: "", successUser: true ,successPassword: true, authToken:authToken });
});
module.exports = router;