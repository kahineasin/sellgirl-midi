import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SgPianoPlayComponent } from './sg-piano-play/sg-piano-play.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import zh from '@angular/common/locales/zh';
import { PfSelectModule } from 'pf-angular-helper-ui';
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    SgPianoPlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    PfSelectModule,
  ],
  providers: [//{ provide: NZ_I18N, useValue: zh_CN },
    {
    provide:LocationStrategy,
    useClass:HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }


