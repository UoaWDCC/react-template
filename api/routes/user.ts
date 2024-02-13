import { Router, Request, Response } from 'express';
import authRequired, { authOptional } from '../middleware/auth';
import { z } from 'zod';
import User from '../db/User';

const userRoutes = Router();

// Get info about the user
userRoutes.get('/', authOptional, async (req: Request, res: Response) => {
  if (!req.body.user || !req.body.user.email) return res.status(200).send(null);

  // Fetch data about the user
  try {
    const user = await User.findOne({
      email: req.body.user.email,
    });
    if (!user) return res.status(200).send(null);
    return res.status(200).send({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).send('could not find user');
  }
});

// Create an account
userRoutes.post(
  '/upsert',
  authRequired,
  async (req: Request, res: Response) => {
    const email = req.body.user.email;

    const createUserRequestSchema = z.object({
      firstName: z.string().min(2).max(40),
      lastName: z.string().min(2).max(40).optional(),
    });

    const result = createUserRequestSchema.safeParse(req.body);
    if (!result.success) return res.status(400).send(result.error);

    const { firstName, lastName }: z.infer<typeof createUserRequestSchema> =
      result.data;

    try {
      await User.updateOne(
        {
          email,
        },
        {
          $set: {
            firstName,
            lastName,
          },
        },
        {
          upsert: true,
        }
      );
    } catch (err) {
      console.error(err);
      return res.status(500).send('unable to upsert user');
    }

    return res.status(200).send('upserted user');
  }
);

export default userRoutes;
