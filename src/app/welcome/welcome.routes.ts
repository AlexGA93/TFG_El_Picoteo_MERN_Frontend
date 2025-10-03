import { Routes } from "@angular/router";
import { WelcomeLayoutComponent } from "./layouts/welcome-layout/welcome-layout.component";
import { WelcomePageComponent } from "./pages/welcome-page/welcome-page.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";

export const storeFrontRoutes: Routes = [
    {
        // only one route, default 
        path: '',
        // component of layout
        component: WelcomeLayoutComponent,
        // child routes - pages
        children: [
            {
                // default route
                path: '',
                component: WelcomePageComponent,
            },
            // not found page
            {
                path: '**',
                component: NotFoundPageComponent
            }
        ]
    }
];

export default storeFrontRoutes;