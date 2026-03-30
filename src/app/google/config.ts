import { isDevMode } from '@angular/core';
import { OauthClientConfiguration } from './types/services';

export const googleOauthConfig: OauthClientConfiguration = {
  name: 'google',
  id: '25888340653-9k0042lsaf3344rct089jh1575hksbf9.apps.googleusercontent.com',
  secret: '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',
  tokenUrl: 'https://oauth2.googleapis.com/token',
  authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  redirectUrl: isDevMode()
    ? 'http://localhost:4200/google/authorization'
    : 'https://camt-mmit.github.io/2025-02-954447-001-lab-11-asynchronous-http-requesting-kodchapron/google/authorization',
};
