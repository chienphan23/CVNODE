import express from "express"
import { createNotification, getAllNotification, getCountNotificationsCheck, getHanldeNotifications, updateCheckedNotifications } from "../controllers/notificationController.js";
import { protect } from "../controllers/authController.js";


const router = express.Router();

// router.route("/test").post()

router.use(protect)
router.route("/createNotification").post(createNotification)
router.route("/updateCheckedNotifications").post(updateCheckedNotifications)
router.route("/getCountNotifications").post(getCountNotificationsCheck)
router.route("/getNotifications").get(getAllNotification)


export default router