import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ResultsComponent } from "./results/results.component";
import { SearchComponent } from "./search/search.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'search', component: SearchComponent }
  // { path: 'details/:id', component: DetailsComponent }   //depends if if we want to display all info on a new page or underneath selected person
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
