import { Routes } from '@angular/router';
import { homeRoutes } from './home/home.routes';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', children: homeRoutes }
];
