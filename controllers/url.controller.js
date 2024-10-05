import { nanoid } from "nanoid"
import URL from "../models/url.model.js";

const handleGenerateNewShortURL = async (req, res) => {
    try {
        const body = req.body;
        const userId = req.user.user._id
        
        if (!body.url) {
            res.status(400).json({ error: 'URL is required' })
        }

        const shortID = nanoid(8);

        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
            createdBy:userId,
        })

        return res.json({ message:'ShortID genereated..', id: shortID })
    }
    catch (err) {
        console.log(err)
    }
}

const redirectURL = async(req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            {
                shortId
            }, {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                },
            }
            }
        )
        res.redirect(entry.redirectURL);
    }
    catch (err) {
        console.log(err)
    }
}

const getAllUrl = async (req,res) => {
    try {
        const id = req.user.user._id
        const urls = await URL.find({createdBy:id})
        res.send({message:'All Urls fetched..' , urls})
        
    }catch(err){
        console.log(err)
    }
}

const handleGetAnalytics = async (req, res) => {
    try {
        const shortId = req.params.shortId
        const result = await URL.findOne({ shortId })
        res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory })
    } catch (err) {
        console.log(err)
    }
}

export { handleGenerateNewShortURL, redirectURL, handleGetAnalytics ,getAllUrl };