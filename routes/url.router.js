import express from 'express'
import { handleGenerateNewShortURL,redirectURL,handleGetAnalytics , getAllUrl} from '../controllers/url.controller.js'
import { authenticateToken } from "../middlewares/authenticate.js";

const router = express.Router()

router.post('/',authenticateToken,handleGenerateNewShortURL)
router.get('/',authenticateToken,getAllUrl)
router.get('/:shortId',redirectURL)
router.get('/analytics/:shortId',authenticateToken,handleGetAnalytics)

export default router;