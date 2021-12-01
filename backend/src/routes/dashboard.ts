import { Router, Request, Response } from "express";
import SessionType from "models/sessionTypeModel";
import User from "models/userModel";

const router = Router();

// @route /dashboard
// @desc  User's dashboard
// @access Private

router.get("/session-types", (req: Request, res: Response) => {
  User.findById(req.currentUser._id).populate('sessionTypes').then((user) => {
    res.status(200).json(user);
  }).catch((err) => {
    console.log(err)
    res.status(400).json({success: false, msg: err.message});
  })
});

router.post("/session-types/create", (req: Request, res: Response) => {
  let body = req.body;
  body.owner = req.currentUser._id;
  const newST = new SessionType(body);
  newST.save().then(() => {
    User.findById(req.currentUser._id).then((user) => {
      user.sessionTypes.push(newST._id);
      user.save().then(() => {
        res.status(200).json({success: true});
      })
    });
  }).catch((err: Error) => {
    res.status(400).json({success: false, msg: 'Session Type creation failed'})
  })
});

router.get("/session-types/edit/:id", (req: Request, res: Response) => {
  SessionType.findById(req.params.id).then((stype) => {
    res.status(200).json(stype);
  }).catch((err) => {
    console.log(err)
    res.status(400).json({success: false, msg: err.message});
  })
});

router.post("/session-types/edit/:id", (req: Request, res: Response) => {
  SessionType.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(() => {
    res.status(200).json({success: true});
  }).catch((err) => {
    res.status(400).json({success: false, msg: err.message})
    console.log(err);
  })
});

router.delete("/session-types/delete/:id", (req: Request, res: Response) => {
  User.updateOne({ _id: req.currentUser._id}, {$pull: {sessionTypes: req.params.id}}).then(() => {
    SessionType.findByIdAndDelete(req.params.id).then(() => {
      res.status(200).json({success: true})
    })
  }).catch((err: Error) => {
    res.status(400).json({success: false, msg: 'Session Type deletion failed'})
  })
});

router.post("/session-types/disable-enable/:id", (req: Request, res: Response) => {
  SessionType.findById(req.params.id).then((sessionType) => {
    sessionType.isEnabled = !sessionType.isEnabled;

    sessionType.save().then((result: any) => {
      res.status(200).json({success: true, isEnabled: result.isEnabled})
    })
  }).catch(() => {
    res.status(400).json({success: false, msg: 'Session Type didnt update!'})
  })
});

router.get("/bookings", (req: Request, res: Response) => {
	res.end();
});

router.post("/bookings/cancel/:event_id", (req: Request, res: Response) => {
	res.end();
});

export default router;