import { Router } from "express";
import { updateGmailSignature } from "../controllers/gmailController"; 

const router = Router();
router.post("/google",  updateGmailSignature);

export default router;