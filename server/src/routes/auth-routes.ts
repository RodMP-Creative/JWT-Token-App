import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
// TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;

  console.log(`Login attempt for username: ${username}`);

  // Check if the user exists
  let user = await User.findOne({ where: { username } });

  // If the user does not exist, create a new user
  if (!user) {
    console.log('User not found, creating new user');
    user = await User.create({ username, password });
    console.log('New user created');
    res.status(201).json({ message: 'New user created' });
  } else {
    const passwordCheck = await bcrypt.compare(password, user.password);

    // If the password does not match, return an error
    if (!passwordCheck) {
      console.log('Password does not match');
      return res.status(401).json({ error: 'Incorrect username or password' });
    }
  }

  const secretKey = process.env.JWT_SECRET_KEY;

  // If the JWT_SECRET_KEY is not set, return an error
  if (!secretKey) {
    console.log('JWT_SECRET_KEY is not set');
    return res.status(500).json({ error: 'server error' });
  }

  // Generate a JWT token
  const token = jwt.sign({ username }, secretKey, { expiresIn: '2h' });

  console.log('Login successful, token generated');
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
