import express from 'express';
import { register } from 'ts-node';
import mainRoutes from './routes/mainRoutes';

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.use(mainRoutes);

app.listen(port, () => {
    return console.log(`server is running on ${port}...`);
});
