import {create,update,login,check,drink} from '../Controller/UserController.js';
import express from 'express';

const router=express.Router()

router.post('/create',create)
router.put('/update/:id',update)
router.get('/login/:name/:password',login)
router.get('/check/:id',check)
router.put('/drink/:id/:drink',drink)

export default router;