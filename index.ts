import express from 'express';
import { register } from 'ts-node';
import mainRoutes from './routes/mainRoutes';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { getParsedCommandLineOfConfigFile } from 'typescript';

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended : true
}));

app.use(mainRoutes);

mongoose.connect("mongodb://localhost:27017/main", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(!err)
    {
        console.log("success");
    }
    else 
    {
        console.log("error connecting to db")
    }
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    return console.log(`server is running on ${port}...`);
});
