import * as express from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import fileRouter from "./file";
import mailRouter from "./mail";
import otpRouter from "./otp";
import oauth2Router from "./oauth2";
import songRouter from "./song";
import bannerRouter from "./banner";
import albumRouter from "./album";
import artistRouter from "./artist";
import chartRouter from "./chart";
import searchRouter from "./search";
import paymentRouter from "./payment";
import librayRouter from "./library";
import hubRouter from "./hub";
import countryRouter from "./country";
import transactionRouter from "./transaction";

const router = express.Router();

/** GET /health-check - Check service health */
router.get("/health-check", (req, res) => res.send("OK"));

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/file", fileRouter);
router.use("/mail", mailRouter);
router.use("/otp", otpRouter);
router.use("/oauth2", oauth2Router);
router.use("/song", songRouter);
router.use("/banner", bannerRouter);
router.use("/album", albumRouter);
router.use("/artist", artistRouter);
router.use("/chart", chartRouter);
router.use("/search", searchRouter);
router.use("/payment", paymentRouter);
router.use("/library", librayRouter);
router.use("/hub", hubRouter);
router.use("/country", countryRouter);
router.use("/transaction", transactionRouter);
export default router;
