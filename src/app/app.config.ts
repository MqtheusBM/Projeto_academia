import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {
  Activity,
  CalendarDays,
  Dumbbell,
  LifeBuoy,
  LogOut,
  LucideAngularModule,
  MessageCircle,
  Users,
} from 'lucide-angular';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(
      LucideAngularModule.pick({
        Activity,
        CalendarDays,
        Dumbbell,
        LifeBuoy,
        LogOut,
        MessageCircle,
        Users,
      }),
    ),
  ],
};
