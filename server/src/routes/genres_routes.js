import { Router } from 'express';
import { GENRES } from '../paths.js';
import { getGenres } from '../controllers/genres_controller.js';



const router = Router();


router.get(GENRES, getGenres);

export default router;
