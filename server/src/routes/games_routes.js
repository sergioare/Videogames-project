import { Router } from 'express';
import { VIDEOGAMES } from '../paths.js';
import { 
    getAllVideogames, 
    getGameById,
    createGame,
    updateGame,
    deleteGame
} from '../controllers/games_controller.js';

const router = Router();

router.get(VIDEOGAMES, getAllVideogames);
router.get(`${VIDEOGAMES}/:id`, getGameById);
router.post(VIDEOGAMES, createGame);
router.put(`${VIDEOGAMES}/:id`, updateGame);
router.delete(`${VIDEOGAMES}/:id`, deleteGame);


export default router;
