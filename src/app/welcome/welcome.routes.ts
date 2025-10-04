import { Routes } from "@angular/router";
import { WelcomeLayoutComponent } from "./layouts/welcome-layout/welcome-layout.component";
import { WelcomePageComponent } from "./pages/welcome-page/welcome-page.component";

export const welcomeFrontRoutes: Routes = [
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
            }
        ]
    }
];

export default welcomeFrontRoutes;