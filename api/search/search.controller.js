import { searchService } from "./search.service.js";

export async function getSearchRes(req, res) {
    const { text, lang } = req.query
    res.send(text)
    return
    try {
        const searchRes = lang === 'eng' ? await searchService.query(req) : await searchService.queryHeb(req)
        res.send(searchRes)
    } catch (err) {
        logger.error('Failed to get chapter', err)
        res.status(500).send({ err: 'Failed to get chapter' })
    }
}