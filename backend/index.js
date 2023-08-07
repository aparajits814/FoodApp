const express = require('express')
const app = express()
const cors=require('cors');
const connectToMongo=require('./db.js');
connectToMongo();
app.use(cors());
app.use(express.json());
app.use('/api',require('./Routes/fetchData.js'));
app.use('/api',require('./Routes/Login.js'));
app.use('/api',require('./Routes/Register.js'));
app.use('/api',require('./Routes/FoodOrders.js'));
app.use('/api',require('./Routes/FoodFetch.js'));
app.listen(process.env.PORT, () => {
})