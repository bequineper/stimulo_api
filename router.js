import {Router,json,} from 'express';
import { getUsers, getUser, postUser} from './controllers/user.controller.js';
import { getFiles, getFile, getFilesByUserId, postFile} from './controllers/file.controller.js';

const router = Router();
router.use(json());



router.get(`/users`, getUsers);
router.get(`/users/:id`, getUser);
router.get(`/files`, getFiles);
router.get(`/files/:id`, getFile);
router.get(`/user/files/:id`, getFilesByUserId);



export default router;




