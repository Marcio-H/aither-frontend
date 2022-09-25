import { AppComponent } from 'src/app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from 'utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './pages/main/main.component';
import { MenuBarModule } from 'src/app/menu-bar/menu-bar.module';
import { NgModule } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';

@NgModule({
	declarations: [AppComponent, MainComponent],
	imports: [
		AuthModule.forRoot(environment),
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		ButtonModule,
		HttpClientModule,
		MenuBarModule,
		RippleModule,
		ToastModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
