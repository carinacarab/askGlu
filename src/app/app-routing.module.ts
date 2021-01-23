import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BsmanagerComponent } from './bsmanager/bsmanager.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MealplannerComponent } from './mealplanner/mealplanner.component';
import { ProfileComponent } from './users/profile/profile.component';
import { RegisterComponent } from './users/register/register.component';
import { AuthguardGuard } from './authguard.guard';
import { DiabeticregComponent } from './users/diabeticreg/diabeticreg.component';
import { SupportregComponent } from './users/supportreg/supportreg.component';
import { SearchfieldComponent } from './searchfield/searchfield.component';
import { EditComponent } from './users/edit/edit.component';
import { ReassignmedsComponent} from './users/reassignmeds/reassignmeds.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'diabeticreg', component: DiabeticregComponent},
  { path: 'supportreg', component: SupportregComponent},
  { path: '',   component: HomeComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthguardGuard], runGuardsAndResolvers: 'always'},
  { path: 'bsmanager', component: BsmanagerComponent, canActivate: [AuthguardGuard] },
  { path: 'mealplanner', component: MealplannerComponent, canActivate: [AuthguardGuard] },
  { path: 'searchfield', component: SearchfieldComponent},
  { path: 'edit', component: EditComponent, canActivate: [AuthguardGuard]},
  { path: 'reassignmeds', component: ReassignmedsComponent, canActivate: [AuthguardGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
