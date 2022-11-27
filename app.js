const express = require('express');
const app = express();
const routes = require('./routes/cabinetSelector');
const connectDB = require('./db/connect');

require('dotenv').config();

const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.static('./public'));


//routes
app.use('/api/v1', routes);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();