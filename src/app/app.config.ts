import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "danotes-a4073", "appId": "1:219243772322:web:e290a411f78c350a46dafb", "storageBucket": "danotes-a4073.firebasestorage.app", "apiKey": "AIzaSyCm3H9O2dY3wSus8f0EGyRUHL-DHrSF7GU", "authDomain": "danotes-a4073.firebaseapp.com", "messagingSenderId": "219243772322", "projectNumber": "219243772322", "version": "2" }))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
