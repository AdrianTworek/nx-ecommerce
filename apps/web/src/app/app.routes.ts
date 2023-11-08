import { Route } from '@angular/router';
import { featureAuthRoutes } from '@web/feature-auth';
import { featureHomeRoutes } from '@web/feature-home';

export const appRoutes: Route[] = [...featureHomeRoutes, ...featureAuthRoutes];
