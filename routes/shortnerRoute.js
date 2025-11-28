import express from 'express';
import {getShortnerPage, createLink, deleteLink, updateLink} from '../controller/shortner.controller.js';
import { asyncHandler } from "../middleware/asyncHandler.js";
import { requireAuth } from '../middleware/verifyAuthentication.js';
const router = express.Router();
router.use(requireAuth);

router.get("/", asyncHandler(getShortnerPage));
router.post("/add", asyncHandler(createLink));
router.delete("/delete/:id", asyncHandler(deleteLink));
router.put("/update/:id", asyncHandler(updateLink));

export default router;