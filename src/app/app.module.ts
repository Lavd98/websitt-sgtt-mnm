import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from "./auth/auth.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubsistemasComponent } from './common/pages/subsistemas/subsistemas.component';

// import { PdfMakeWrapper } from 'pdfmake-wrapper';
// import pdfFonts from 'pdfmake/build/vfs_fonts';


// PdfMakeWrapper.setFonts(pdfFonts);

@NgModule({
    declarations: [
        AppComponent,
        SubsistemasComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AppModule { }
