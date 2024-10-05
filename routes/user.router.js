import express from 'express'
import { handleSignUp,handleLogIn,userInfo} from '../controllers/user.controller.js';
import multer from 'multer';
import { authenticateToken } from "../middlewares/authenticate.js";

const router = express.Router()

var uploader = multer({
    storage:multer.diskStorage({}),
    limits:{fileSize:500000}
})

router.post('/signup',uploader.single('file'),handleSignUp)
router.post('/login',handleLogIn)
router.get('/info',authenticateToken,userInfo)

export default router;