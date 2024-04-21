const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const mongoURI = 'mongodb+srv://mdfarhanquamar2023:pSSbk2emfoSL5LhK@cluster1.i4ygmel.mongodb.net/FoodishDB?retryWrites=true&w=majority&appName=Cluster1'
const mongoDB = async () => {
    await mongoose.connect(mongoURI, {useNewUrlParser : true}, async (err, result) => {
        if(err)
            console.log(err)
        else{
            console.log("Connected successfully")
            const food_data = await mongoose.connection.db.collection("food_items")
            try{
                const fData = await food_data.find({}).toArray()
                const food_category = await mongoose.connection.db.collection("food_category")
                const fCategory = await food_category.find({}).toArray()
                global.food_items = fData
                global.food_category = fCategory
            }
            catch(err){
                console.error(err);
            }
        }
    })
}

module.exports = mongoDB