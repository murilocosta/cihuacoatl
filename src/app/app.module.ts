import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { AuthInterceptor } from '../interceptors/auth';
import { HomePage } from '../pages/home/home';
import { SignInPage } from '../pages/sign-in/sign-in';
import { InventoryPage } from '../pages/inventory/inventory';
import { StoragePage } from '../pages/inventory/storage/storage';
import { MeasureUnitPage } from '../pages/inventory/measure-unit/measure-unit';
import { StorageFormPage } from '../pages/inventory/storage/storage-form/storage-form';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AuthService } from '../services/auth';
import { StorageService } from '../services/storage';
import { UserService } from '../services/user';
import { ChangeNamePage } from '../pages/user/change-name/change-name';
import { ChangePasswordPage } from '../pages/user/change-password/change-password';
import { StorageChildPage } from '../pages/inventory/storage/storage-child/storage-child';
import { LongPressDirective } from '../pages/directives/long-press';
import { MeasureUnitService } from '../services/measure-unit';
import { MeasureUnitFormPage } from '../pages/inventory/measure-unit/measure-unit-form/measure-unit-form';

@NgModule({
  declarations: [
    MyApp,
    LongPressDirective,
    SignInPage,
    HomePage,
    DashboardPage,
    ChangeNamePage,
    ChangePasswordPage,
    InventoryPage,
    StoragePage,
    StorageChildPage,
    StorageFormPage,
    MeasureUnitPage,
    MeasureUnitFormPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignInPage,
    HomePage,
    DashboardPage,
    ChangeNamePage,
    ChangePasswordPage,
    InventoryPage,
    StoragePage,
    StorageChildPage,
    StorageFormPage,
    MeasureUnitPage,
    MeasureUnitFormPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AuthService,
    UserService,
    StorageService,
    MeasureUnitService
  ]
})
export class AppModule {
}
