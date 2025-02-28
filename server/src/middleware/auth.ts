import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization;

  // Check if the authorization header is present
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
      if (err) {
        console.log('Token verification failed', err);
        return res.sendStatus(403);
      }

      // Add the user data to the request object
      req.user = user as JwtPayload;

      // Continue with the request
      console.log('Token verified successfully');
      return next();
    });

    // If the token is not present
  } else {
    console.log('Authorization header not found');
    res.sendStatus(401); 
  }
};
