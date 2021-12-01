import { Router, Request, Response, NextFunction } from "express";
import auth from "./auth";
import dashboard from "./dashboard";
import profile from "./profile";
import booking from "./booking"; 

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Menter Backend")
});

// Routes
router.use("/auth", auth);
router.use("/dashboard", dashboard);
router.use("/profile", profile);
router.use("/", booking);

export default router;