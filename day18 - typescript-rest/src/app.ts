import express from 'express';
import ProductRoute from './app/Product/Route';
import notfound from './middleware/404';
import handleError from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use('/api/v1', ProductRoute);
app.use(notfound);
app.use(handleError);

app.listen(process.env.PORT || 3000, (): void => {
    console.log('listening on http://localhost:3000');
})