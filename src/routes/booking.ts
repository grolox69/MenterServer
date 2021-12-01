import { Router, Request, Response } from "express";
import SessionType from "models/sessionTypeModel";
import User from "models/userModel";

const router = Router();

// @route /
// @desc Book an Event
// @access Public

router.get("/:vanity_name", (req: Request, res: Response) => {
	User.findOne({ vanity_name: req.params.vanity_name }).populate('sessionTypes').then((user) => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User Not Found')
        }
    })
});

router.get("/:vanity_name/:slug", (req: Request, res: Response) => {
	User.findOne({ vanity_name: req.params.vanity_name }).populate('sessionTypes').then((user) => {
        if (user) {
            if (user.sessionTypes.length != 0) {
				const sessionType = user.sessionTypes.find(({ slug }: any) => slug === req.params.slug) || null;
                if (sessionType) {
                    res.status(200).json({user: user, sessionType: sessionType});
                } else {
                    res.status(404).send('Session Type Not Found')
                }
            }
        } else {
            res.status(404).send('User Not Found')
        }
    })
});

router.post("/:vanity_name/:slug", (req: Request, res: Response) => {
	res.end()
});

export default router;