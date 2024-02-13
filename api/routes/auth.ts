import { Router } from 'express';
import type { Request, Response } from 'express';
import { z } from 'zod';
import AuthCode from '../db/AuthCode';
import { sendContinueEmail } from '../utils/email';
import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';
import authRequired from '../middleware/auth';

config();

const authRoutes = Router();

const deleteExpired = async () => {
  const currentDate = new Date();
  await AuthCode.deleteMany({
    expiresAt: {
      $lt: currentDate,
    },
  });
};

authRoutes.post('/continue', async (req: Request, res: Response) => {
  await deleteExpired();

  const createAuthCodeRequestSchema = z.object({
    email: z.string().max(40).min(1),
  });

  const result = createAuthCodeRequestSchema.safeParse(req.body);
  if (!result.success) return res.status(400).send(result.error);

  const { email }: z.infer<typeof createAuthCodeRequestSchema> = result.data;

  try {
    // Create an auth code
    const newAuthCode = new AuthCode({
      email,
      code: Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, '0'),
    });
    await newAuthCode.save();
    await sendContinueEmail(newAuthCode.email, newAuthCode.code);
  } catch (err) {
    console.error(err);
    return res.status(500).send('failed to create auth code');
  }

  return res.status(200).send('sent auth code to your email');
});

authRoutes.post('/verify', async (req: Request, res: Response) => {
  console.log(`Verifying`);

  await deleteExpired();

  const verifyEmailRequestSchema = z.object({
    email: z.string().max(40).min(1),
    code: z.string(),
  });

  const result = verifyEmailRequestSchema.safeParse(req.body);
  if (!result.success) return res.status(400).send(result.error);

  const { email, code }: z.infer<typeof verifyEmailRequestSchema> = result.data;

  const foundAuthCode = await AuthCode.findOne({
    email,
    code,
  });

  if (!foundAuthCode) return res.status(400).send('invalid code');

  console.log(`Found ${foundAuthCode}`);

  // Delete the found authentication code
  await foundAuthCode.deleteOne();

  const JWT_SECRET: string = process.env.JWT_SECRET!;

  // Create a JWT secret with the email that expires in 90 days
  const token = sign(
    {
      email,
    },
    JWT_SECRET,
    {
      expiresIn: '90d',
    }
  );

  return res
    .status(200)
    .json({
      token,
    })
    .send();
});

export default authRoutes;
