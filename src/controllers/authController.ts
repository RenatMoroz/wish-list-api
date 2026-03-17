import { RequestHandler } from 'express';
import createHttpError from 'http-errors';

import * as authServices from '../services/authService.js';
import { ONE_DAY, ONE_MONTH } from '../helpers/constants.js';
import { sendEmail } from '../utils/sendEmail.js';
import { getTemplate } from '../utils/templates.js';
import { jwtToken } from '../utils/tokens.js';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import { UserCollection } from '../database/models/user.js';

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict' as const,
};

export const registerUserController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { email, password, nickname, role } = req.body as {
      email: string;
      password: string;
      nickname?: string;
      role?: 'user' | 'admin';
    };

    const result = await authServices.registerUserService({
      email,
      password,
      nickname,
      role,
    });

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const loginController: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const userAgent = req.headers['user-agent'];
    const tokens = await authServices.loginService(
      { email, password },
      {
        userAgent: typeof userAgent === 'string' ? userAgent : undefined,
        ip: req.ip,
      },
    );

    res.cookie('refreshToken', tokens.refreshToken, {
      ...cookieOptions,
      maxAge: ONE_MONTH,
    });

    res.cookie('accessToken', tokens.accessToken, {
      ...cookieOptions,
      maxAge: ONE_DAY,
    });

    res.status(200).json({ accessToken: tokens.accessToken });
  } catch (err) {
    next(err);
  }
};

export const getCurrentUserController: RequestHandler = (req, res, next) => {
  try {
    if (!req.user) {
      throw createHttpError(401, 'User is not authenticated');
    }

    res.status(200).json({ user: req.user });
  } catch (err) {
    next(err);
  }
};

export const logoutController: RequestHandler = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    await authServices.logoutService(refreshToken);

    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');

    res.status(200).json({ message: 'Logged out successfully!' });
  } catch (err) {
    next(err);
  }
};

export const refreshController: RequestHandler = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    const userAgent = req.headers['user-agent'];
    const session = await authServices.refreshService(refreshToken ?? '', {
      userAgent: typeof userAgent === 'string' ? userAgent : undefined,
      ip: req.ip,
    });

    res.cookie('refreshToken', session.refreshToken, {
      ...cookieOptions,
      maxAge: ONE_MONTH,
    });

    res.cookie('accessToken', session.accessToken, {
      ...cookieOptions,
      maxAge: ONE_DAY,
    });

    res.status(200).json({ accessToken: session.accessToken });
  } catch (err) {
    next(err);
  }
};

export const resetPasswordRequest: RequestHandler = async (req, res, next) => {
  const { email } = req.body;
  const token = jwtToken({ email });
  sendEmail({
    from: 'renatgolgol@gmail.com',
    to: email,
    subject: 'resset password',
    html: await getTemplate(`ressetPassword`, { email, token }),
  });
  res.status(200).json('Проверьте почту');
};

export const resetPasswordConfirm: RequestHandler = async (req, res, next) => {
  const { password, token } = req.body;
  let payload: {
    email: string;
  };
  try {
    payload = jwt.verify(token, env('JWT_SECRET')) as { email: string };
  } catch (error) {
    throw createHttpError(401, 'invalid or expire token');
  }
  const { email } = payload;
  await UserCollection.findOneAndUpdate({ email }, { password });
  sendEmail({
    from: 'renatgolgol@gmail.com',
    to: email,
    subject: 'resset password confirm',
    html: await getTemplate(`ressetPasswordSuccess`, { password }),
  });
  res.status(200).json('пароль успешно изменен ');
};
