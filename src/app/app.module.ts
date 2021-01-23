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
import { DiabeticregComponent } from './users/diabeticreg/diabeticreg.component';
import { SupportregComponent } from './users/supportreg/supportreg.component';
import { SugarentryComponent } from './sugarentry/sugarentry.component';
import { SearchfieldComponent } from './searchfield/searchfield.component';
import { FilterPipe } from './filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { ReassignmedsComponent } from './users/reassignmeds/reassignmeds.component';


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
    MealplannerComponent,
    DiabeticregComponent,
    SupportregComponent,
    SugarentryComponent,
    SearchfieldComponent,
    FilterPipe,
    ReassignmedsComponent
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
      { path: 'diabeticreg', component: DiabeticregComponent},
      { path: 'supportreg', component: SupportregComponent},
      { path: 'searchfield', component: SearchfieldComponent},
      { path: 'edit', component: EditComponent},
      { path: 'reassignmeds', component: ReassignmedsComponent}


    ]),
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatRadioModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
  
  ],
  providers: [ServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
