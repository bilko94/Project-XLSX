import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { SearchComponent } from "./search/search.component";
import { AllComponent } from "./all/all.component";
import { AddComponent } from "./add/add.component";
import { BookmarksComponent } from "./bookmarks/bookmarks.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'all', component: AllComponent},
  { path: 'add', component: AddComponent},
  { path: 'bookmarks', component: BookmarksComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
  // { path: 'details/:id', component: DetailsComponent }   //depends if if we want to display all info on a new page or underneath selected person
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
