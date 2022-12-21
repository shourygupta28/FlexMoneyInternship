import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
// import data from '../data.js';
import User from '../models/userModel.js'

const userRouter = express.Router();

// userRouter.get('/seed', expressAsyncHandler (async(req, res) => {
//     // await User.remove({});
//     const createdUsers = await User.insertMany(data.users);
//     res.send({ createdUsers });
// }));

userRouter.post('/register', expressAsyncHandler (async(req, res) => {
    console.log("jejje");
    const user = new User ({
        name: req.body.name, 
        email: req.body.email, 
        password: bcrypt.hashSync(req.body.password, 8),
        dob: req.body.dob,
        gender: req.body.gender,
        batch: req.body.batch,
        // image: req.body.image,
    });
    const createdUser = await user.save();
    res.send({
        name: createdUser.name, 
        email: createdUser.email, 
        dob: createdUser.dob,
        gender: createdUser.gender,
        batch: createdUser.batch,
        // image: createdUser.image,
    });
    // res.send("jekke");
}));

// userRouter.get('/:id', expressAsyncHandler(async(req, res) => {
//     const user = await User.findById(req.params.id);
//     if(user){
//         res.send(user);
//     } else{
//         res.status(404).send({ message: 'User Not Found' });
//     }
// }));


//   userRouter.get(
//     '/',
//     isAuth,
//     isAdmin,
//     expressAsyncHandler(async (req, res) => {
//       const users = await User.find({});
//       res.send(users);
//     })
//   );

//   userRouter.delete(
//     '/:id',
//     isAuth,
//     isAdmin,
//     expressAsyncHandler(async (req, res) => {
//       const user = await User.findById(req.params.id);
//       if (user) {
//         if (user.email === 'admin@example.com') {
//           res.status(400).send({ message: 'Can Not Delete Admin User' });
//           return;
//         }
//         const deleteUser = await user.remove();
//         res.send({ message: 'User Deleted', user: deleteUser });
//       } else {
//         res.status(404).send({ message: 'User Not Found' });
//       }
//     })
//   );

export default userRouter;