const express = require('express')
const router = express.Router()
const Order = require("../models/Orders")

router.post("/orderdata", async (req, res) => {
    let order_data = req.body.order_data
    await order_data.splice(0, 0, {Order_Date: req.body.order_date})

    let cous_data = await Order.findOne({'email' : req.body.email})
    if(cous_data === null){
        try{
            await Order.create({
                email: req.body.email,
                order_data : [order_data]
            }).then(() => {
                res.json({success: true})
            })
        }
        catch (error){
            console.error(error.message)
            res.send("Server Error", error.message)
        }
    }
    else{
        try{
            await Order.findOneAndUpdate({email : req.body.email},{
                $push: {order_data: order_data}
            }).then(() => {
                res.json({success: true})
            })
        }
        catch (error){
            console.error(error.message)
            res.send("Server Error", error.message)
        }
    }
})

router.post('/myorderdata', async (req, res) => {
    try{
        let orderData = await Order.findOne({email : req.body.email})
        res.send(orderData["order_data"])
    }
    catch (error){
        res.send("Server Error", error.message)
    }
})

module.exports = router