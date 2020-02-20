import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';
import { SearchComponent } from './search/search.component';
import { AllComponent } from './all/all.component';
import { AddComponent } from './add/add.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DetailsFormComponent } from './add/details-form/details-form.component';
import { BackendFormComponent } from './add/backend-form/backend-form.component';
import { FrontendFormComponent } from './add/frontend-form/frontend-form.component';
import { NttsystemsFormComponent } from './add/nttsystems-form/nttsystems-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResultsComponent,
    SearchComponent,
    AllComponent,
    AddComponent,
    BookmarksComponent,
    NavbarComponent,
    DetailsFormComponent,
    BackendFormComponent,
    FrontendFormComponent,
    NttsystemsFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
