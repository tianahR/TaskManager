require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require ('cors');

const taskRoutes = require('./routes/taskRoutes');



const app = express();


const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);


app.use(express.json());
app.use(cors());

// Use task routes
app.use('/api', taskRoutes);

const port = process.env.PORT ||5000;


// connect to DB 
const connectDB = require('./db/connect')



const start = async () => {
    try {
      // connectDB
      await connectDB(process.env.MONGO_URI)
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
   
  };
  
  start();