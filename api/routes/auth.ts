import { Router } from 'express';
import type { Request, Response } from 'express';
import User from '../db/User';
import { z } from 'zod';

const authRoutes = Router();

authRoutes.post('/create', async (req: Request, res: Response) => {
  const createUserRequestSchema = z.object({
    firstName: z.string(),
    lastname: z.string().optional(),
    email: z.string(),
  });

  const result = createUserRequestSchema.safeParse(req.body);
  if (!result.success) return res.status(400).send(result.error);

  const user: z.infer<typeof createUserRequestSchema> = result.data;

  try {
    await User.create(user);
  } catch {
    return res.status(500).send('failed to create user');
  }

  return res.status(200).send('created user');
});

export default authRoutes;
