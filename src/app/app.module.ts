import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './users/profile/profile.component';
import { RegisterComponent } from './users/register/register.component';
import { EditComponent } from './users/edit/edit.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ServicesService } from './services/services.service';
import { BsmanagerComponent } from './bsmanager/bsmanager.component';
import { MealplannerComponent } from './mealplanner/mealplanner.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    EditComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BsmanagerComponent,
    MealplannerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule, 
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '',   component: HomeComponent},
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'bsmanager', component: BsmanagerComponent },
      { path: 'mealplanner', component: MealplannerComponent },

    ]),
    FormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
  
  ],
  providers: [ServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
