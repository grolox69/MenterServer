import { Request, Response, NextFunction } from "express";
import User from "models/userModel";
import auth from 'config/firebase/firebaseAdminSetup';

class AuthMiddleware {

    async decodeToken(req: Request, res: Response, next: NextFunction) {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            try {
                const decodedToken = await auth.verifyIdToken(token);
                if (decodedToken) {
                    console.log("Valid Token");
                    User.findOne({ uid: decodedToken.uid }).then((result) => {
                        req.currentUser = result || decodedToken;
                        next();

                    }).catch((error) => {
                        console.log(error);
                    })
                }
            }
            catch (err) {
                console.log("Invalid Token");
                console.log(err);
            }
        }
    }
}

export default new AuthMiddleware();
