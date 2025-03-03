import { ApplicationConfig } from '@angular/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: { disabled: true } }],
};
