import { Express } from "express";
import morgan from 'morgan';

export function applyMiddlewares(app: Express) {
    app.use(morgan('dev'))
}
