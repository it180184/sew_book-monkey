import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {BookListComponent} from "./components/book-list/book-list.component";
import {BookDetailsComponent} from "./components/book-details/book-details.component";
import {CreateBookComponent} from "./components/create-book/create-book.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'books', component: BookListComponent},
  {path: 'books/:isbn', component: BookDetailsComponent},
  {path: 'admin', redirectTo: 'admin/create', pathMatch: 'full'},
  {path: 'admin/create', component: CreateBookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
