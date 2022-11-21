import { AppComponent } from 'src/app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from 'utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DetailsModule } from './pages/main/details/details.module';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MainComponent } from './pages/main/main.component';
import { MenuBarModule } from 'src/app/menu-bar/menu-bar.module';
import { NgModule } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { UiButtonModule } from 'aither-ui';

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    AuthModule.forRoot(environment),
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    DataViewModule,
    DetailsModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    MenuBarModule,
    PanelModule,
    RippleModule,
    ToastModule,
    UiButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
