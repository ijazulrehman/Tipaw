/*
 * @format
 */
import express from "express";
import { User } from "src/entities";

const withAuthenticate = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    if(!req.headers.authorization){
        res.status(403).json({
            message: 'not authorized'
        });
        return
    }

    let user: User;
    try {
        user = await User.findByToken(req.headers.authorization)
        if(!user){
            res.status(403).json({
                message: 'not authorized'
            });
            return;
        }
        req.locals = user
    } catch (error) {
        res.status(403).json({
            message: 'not authorized'
        });
        return;
    }

    next()
};

export default withAuthenticate;