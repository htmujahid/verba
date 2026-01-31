import { betterAuth } from 'better-auth';
import { admin, openAPI, twoFactor } from 'better-auth/plugins';

import appConfig from '../config/app.config.js';
import { db } from '../database.js';
import { sendMail } from './mailer.js';
import { ac, allRoles } from './admin.js';

export const auth = betterAuth({
  appName: appConfig.name,
  baseURL: appConfig.url,
  database: {
    db,
    type: 'postgres',
  },
  rateLimit: {
    enabled: true,
    storage: 'database',
  },
  trustedOrigins: [process.env.BETTER_AUTH_URL!],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendMail({
        to: user.email,
        subject: 'Reset Password',
        html: `
          <p>Hi ${user.name},</p>
          <p>Click <a href="${url}">here</a> to reset your password</p>
          <p>Or copy and paste the link below into your browser:</p>
          <p>${url}</p>
        `,
      });
    },
  },
  user: {
    changeEmail: {
      enabled: true,
      requireVerification: true,
      sendChangeEmailVerification: async ({ user, newEmail, url }) => {
        await sendMail({
          to: user.email,
          subject: 'Change Email',
          html: `
            <p>Hi ${user.name},</p>
            <p>Click <a href="${url}">here</a> to change your email to ${newEmail}</p>
            <p>Or copy and paste the link below into your browser:</p>
            <p>${url}</p>
          `,
        });
      },
    },
    deleteUser: {
      enabled: true,
      deleteSessions: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        await sendMail({
          to: user.email,
          subject: 'Delete Account',
          html: `
            <p>Hi ${user.name},</p>
            <p>Click <a href="${url}">here</a> to delete your account</p>
            <p>Or copy and paste the link below into your browser:</p>
            <p>${url}</p>
          `,
        });
      },
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendMail({
        to: user.email,
        subject: 'Verify Email',
        html: `
          <p>Hi ${user.name},</p>
          <p>Click <a href="${url}">here</a> to verify your email</p>
          <p>Or copy and paste the link below into your browser:</p>
          <p>${url}</p>
        `,
      });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    admin({
      ac,
      roles: allRoles,
    }),
    twoFactor({
      otpOptions: {
        sendOTP: async ({ user, otp }) => {
          await sendMail({
            to: user.email,
            subject: 'OTP',
            html: `
              <p>Hi ${user.name},</p>
              <p>Your OTP is ${otp}</p>
            `,
          });
        },
      },
    }),
    openAPI({}),
  ],
});