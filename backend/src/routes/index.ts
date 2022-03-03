/*
 * @format
 */

import { Router } from "express";
import withAuthenticate from "src/middlewares/withAuthenticate";
import { login, signup } from "./user";

const routes = Router();


// user 
routes.post('/sign-in', login)
routes.post('/sign-up', signup)


export default routes;
