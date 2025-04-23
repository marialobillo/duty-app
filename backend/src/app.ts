import express from 'express';
import cors from 'cors';
import { config } from './config/config';
// import routes here later

const app = express();

app.use(cors({ origin: config.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use('/api/duties', dutyRoutes);

export default app;
