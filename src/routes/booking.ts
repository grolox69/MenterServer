import { Router, Request, Response } from "express";
import User from "models/userModel";
import SessionType from "models/sessionTypeModel";
import Session from "models/sessionModel";

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
	User.findOne({ vanity_name: req.params.vanity_name }).populate('sessionTypes').populate('sessions').then((user) => {
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
	const guest = req.body.guest
    const sessionType = req.body.sessionType
    const newSession = new Session(req.body)
    newSession.save().then(() => {
        User.findById(guest).then((user) => {
          user.sessions.push(newSession._id);
          user.save().then(() => {
            SessionType.findById(sessionType).then((sessionType) => {
                User.findById(sessionType.owner).then((owner) =>{
                    owner.sessions.push(newSession._id);
                    owner.save().then(() => {
                        res.status(200).json({success: true});
                    })
                })
            })
          })
        });
    }).catch((err: Error) => {
        res.status(400).json({success: false, msg: 'Session Type creation failed'})
    })
});

export default router;