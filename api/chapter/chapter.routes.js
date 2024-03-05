import express from 'express'
import { getChapter, getChapters } from './chapter.controller.js'

export const chapterRoutes = express.Router()

chapterRoutes.get('/', getChapters)
chapterRoutes.get('/:num', getChapter)
