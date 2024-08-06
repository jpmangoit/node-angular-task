import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegularComponent } from './shared/regular/regular.component';

const routes: Routes = [
  { path: '', component: RegularComponent },
  { path: 'hello', loadChildren: () => import('./modules/hello/hello.module').then(m => m.HelloModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
