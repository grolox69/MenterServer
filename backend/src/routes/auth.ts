import { Router, Request, Response } from "express";
import User from "models/userModel";
import SessionType from "models/sessionTypeModel";
import { defaultSessionTypes } from "shared/defaultSessionTypes";

const router = Router();

// @route POST /auth
// @desc  Authenticate User
// @access Public

router.post("/", (req: Request, res: Response) => {

  const user = req.body.user;
  // TODO: Save default session types on sign up
  User.findOne({ uid: user.uid }).then((result) => {
    if (result) {
      console.log("Found user " + result.email);
      res.status(200).json({success: true, status: 'Login Successful!', user: result});
    } else {
      const userInfo = {
        uid: user.uid,
        name: user.name,
        email: user.email,
        vanity_name: user.name.trim().replace(/\s+/g, "."),
        title: user.name.concat("", "'s Bookings Page"),
        description: "Book a call with me!"
      };
      
      const currentUser = new User(userInfo);

      defaultSessionTypes.map((sessionTypeInfo) => {
        let tmp: any = sessionTypeInfo;
        tmp.owner = currentUser._id;
        const defaultST = new SessionType(tmp)

        defaultST.save((error: Error) => {
          if (error) console.log(error)
        })
        currentUser.sessionTypes.push(defaultST._id);
      })

      currentUser.save().then(() => {
        console.log("Created user", currentUser.email);
        req.currentUser = currentUser;
        res.status(200).json({success: true, status: 'Register Successful!', user: currentUser});
      })
    }
  })
  .catch((err: Error) => {
    res.status(500).json({success: false, status: 'Authentication Failed!'});
  })
  
});

export default router;