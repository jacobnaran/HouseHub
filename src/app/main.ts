import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

import 'rxjs/add/operator/first';

platformBrowserDynamic().bootstrapModule(AppModule);
