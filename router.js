import {Router} from `express`;
import {loginUser, registerUser} from './controllers/userController.js';

const router = Router();

router.post ('/register', registerUser);
router.post ('/login', loginUser);

export default router;

