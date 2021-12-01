import { Express } from 'express';
import { User } from 'models/userModel'

declare global{
    namespace Express {
        interface Request {
            currentUser: User
        }
    }
}