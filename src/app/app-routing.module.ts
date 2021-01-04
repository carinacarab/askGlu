import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BsmanagerComponent } from './bsmanager/bsmanager.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MealplannerComponent } from './mealplanner/mealplanner.component';
import { ProfileComponent } from './users/profile/profile.component';
import { RegisterComponent } from './users/register/register.component';
import { AuthguardGuard } from './authguard.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '',   component: HomeComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthguardGuard]},
  { path: 'bsmanager', component: BsmanagerComponent, canActivate: [AuthguardGuard] },
  { path: 'mealplanner', component: MealplannerComponent, canActivate: [AuthguardGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
