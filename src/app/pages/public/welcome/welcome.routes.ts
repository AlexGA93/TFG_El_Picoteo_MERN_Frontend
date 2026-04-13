import { Routes } from "@angular/router";
import { WelcomeLayoutComponent } from "../layouts/welcome-layout/welcome-layout.component";
import { WelcomePageComponent } from "./pages/welcome-page/welcome-page.component";
import { PublicMenuPageComponent } from "./pages/public-menu-page/public-menu-page.component";
import { PublicCartPageComponent } from "./pages/public-cart-page/public-cart-page.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";

export const welcomeFrontRoutes: Routes = [
    {
        // only one route, default 
        path: '',
        // component of layout
        component: WelcomeLayoutComponent,
        // child routes - pages
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'welcome',
            },
            {
                // default route
                path: 'welcome',
                component: WelcomePageComponent,
            },
            {
                path: 'menu',
                component: PublicMenuPageComponent,
            },
            {
                path: 'cart',
                component: PublicCartPageComponent,
            },
            {
                path: '**',
                component: NotFoundPageComponent,
            }
        ]
    }
];

export default welcomeFrontRoutes;
