const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const logger = require("./middleware/loggerMiddleware");
connectDB();

const app = express();

app.use(express.json());
app.use(logger);
app.use(cors());
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/product', require('./routes/productRoutes'));

const PORT = process.env.PORT || 5000;

app.get('/', (req,res)=>{
    res.send("Hello from Backend!!!")
})

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})
