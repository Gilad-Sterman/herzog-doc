import { dbService } from '../../services/db.service.js'

export const searchService = {
    query,
    queryHeb,
}

async function query(text) {
    const criteria = {}
    try {
        const collection = await dbService.getCollection('herzog_chapters')
        var searcRes = await collection.find(criteria).limit(10).toArray()
        return searcRes
    } catch (err) {
        logger.error('cannot find results', err)
        throw err
    }
}

async function queryHeb(text) {
    const criteria = {}
    try {
        const collection = await dbService.getCollection('herzog_chapters_heb')
        var searcRes = await collection.find(criteria).limit(10).toArray()
        return searcRes
    } catch (err) {
        logger.error('cannot find results', err)
        throw err
    }
}