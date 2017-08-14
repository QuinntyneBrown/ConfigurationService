import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from "./shared/guards/auth-guard.service";
import {LoginPageComponent} from "./users/login-page.component";
import {SetTenantPageComponent} from "./tenants/set-tenant-page.component";
import {TenantGuardService} from "./shared/guards/tenant-guard.service";
import {EventHubConnectionGuardService} from "./shared/guards/event-hub-connection-guard.service";

import {ConfigurationItemKeyPaginatedListPageComponent, ConfigurationItemKeyEditPageComponent} from "./configuration-item-keys";

export const routes: Routes = [
    {
        path: 'tenants/set',
        component: SetTenantPageComponent
    },
    {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [
            TenantGuardService
        ]
    },
    {
        path: '',
        component: ConfigurationItemKeyPaginatedListPageComponent,
        canActivate: [
            TenantGuardService,
            AuthGuardService,
            EventHubConnectionGuardService
        ]
    },
    {
        path: 'configurationItemKeys',
        component: ConfigurationItemKeyPaginatedListPageComponent,
        canActivate: [
            TenantGuardService,
            AuthGuardService,
            EventHubConnectionGuardService
        ]
    },
    {
        path: 'configurationItemKeys/create',
        component: ConfigurationItemKeyEditPageComponent,
        canActivate: [
            TenantGuardService,
            AuthGuardService,
            EventHubConnectionGuardService
        ]
    },
    {
        path: 'configurationItemKeys/:id',
        component: ConfigurationItemKeyEditPageComponent,
        canActivate: [
            TenantGuardService,
            AuthGuardService,
            EventHubConnectionGuardService
        ]
    }
];

export const RoutingModule = RouterModule.forRoot([
    ...routes
]);

export const routedComponents = [
    LoginPageComponent,
    SetTenantPageComponent,
    ConfigurationItemKeyEditPageComponent,
    ConfigurationItemKeyPaginatedListPageComponent
];