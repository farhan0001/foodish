const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")

const router = express.Router()
const jwtSecret = "dsk#@HKJ5#KH$%LK^LK$LK*LKHJ@kj54"

router.post('/createuser',
    [body('email', 'Invalid Email').isEmail(), body('name', 'Name must contain min 4 characters').isLength({ min: 4 }), body('password', 'Password must be atleast 8 characters long').isLength({ min: 8 })],
    async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const salt = await bcryptjs.genSalt(10)
        const securePassword = await bcryptjs.hash(req.body.password, salt)

        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securePassword,
                location: req.body.location
            }).then(res.json({ success: true }))
        }
        catch (err) {
            console.log(err)
            res.json({ success: false })
        }
    })

router.post('/login',
    [body('email', 'Invalid Email').isEmail(), body('password', 'Password must be atleast 8 characters long').isLength({ min: 8 })],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            let email = req.body.email
            let response = await User.findOne({email})
            if (!response)
                return res.status(400).json({ errors: "Incorrect Credentials" })

            let pwdCompare = bcryptjs.compare(req.body.password, response.password)
            if (!pwdCompare)
                return res.status(400).json("Incorrect Credentials")

            const data = {
                user: {
                    id: response.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret)
            
            return res.json({ success: true, authToken: authToken })
        }
        catch (err) {
            console.log(err)
            res.json({ success: false })
        }
    })

module.exports = router