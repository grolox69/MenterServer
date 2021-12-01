import { Router, Request, Response } from "express";
import User from "models/userModel";

const router = Router();

// @route /profile
// @desc  User's profile
// @access Private

router.get("/", (req: Request, res: Response) => {
    User.findById(req.currentUser._id).then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        console.log(err)
        res.status(400).json({success: false, msg: err.message});
    })
});

router.post("/", (req: Request, res: Response) => {
    User.findByIdAndUpdate(req.currentUser._id, req.body, { new: true }).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(400).json({success: false, msg: err.message})
        console.log(err);
    })
})


export default router;