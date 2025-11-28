import express from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import {postLogin, postRegistration, getLogout} from '../controller/auth.controller.js';
import { requireAuth , verifyAuthentication} from '../middleware/verifyAuthentication.js';
const router = express.Router();

router.post('/login', asyncHandler(postLogin))
router.get('/logout', verifyAuthentication, asyncHandler(getLogout))
router.post('/register', asyncHandler(postRegistration));

export default router;
