import express from 'express';
import User from '../models/user.model.js';

const router = express.Router();


router.get('/search', async (req, res) => {
    const { query } = req.query;
  
    if (!query) {
      return;
    }
  
    try {
      const users = await User.find({
        username: { $regex: query, $options: 'i' }  // case-insensitive
      }).select('_id username'); // only return needed fields
  
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });


  export default router;    

