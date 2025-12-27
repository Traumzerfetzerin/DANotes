import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'danotes-a4073',
        appId: '1:219243772322:web:e290a411f78c350a46dafb',
        storageBucket: 'danotes-a4073.firebasestorage.app',
        apiKey: 'AIzaSyCm3H9O2dY3wSus8f0EGyRUHL-DHrSF7GU',
        authDomain: 'danotes-a4073.firebaseapp.com',
        messagingSenderId: '219243772322',
      })
    ),

    provideFirestore(() => getFirestore()),
  ],
};

