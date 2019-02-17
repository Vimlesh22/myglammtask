const express = require('express');
const app = express();
const router = express.Router();
const userController = require('../controller/userController');

router.post('/addUser',userController.addUser);
router.delete('/deleteUser/:id',userController.deleteUser);
router.get('/getUser/:id',userController.getUserById);
router.get('/getUser',userController.getUser);
router.put('/updateUser/:id',userController.updateUser);


module.exports = router;