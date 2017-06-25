import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PokedexComponent } from './pokemon/pokedex/pokedex.component';
import { PokemonCenterComponent } from './pokemon/pokemon-center/pokemon-center.component';
import { LoginComponent } from './login/login.component';
import { PokemonItemComponent } from './pokemon/pokemon-center/pokemon-item/pokemon-item.component';

import { PokeAPIService } from './services/poke-api.service';
import { PcDetailComponent } from './pokemon/pokemon-center/pc-detail/pc-detail.component';
import { TypeComponent } from './pokemon/_components/type/type.component';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    data: {
      title: 'Home',
      display: 'left'
    }
  },
  {
    path: 'pokemon-center',
    pathMatch: 'full',
    component: PokemonCenterComponent,
    data: {
      title: 'PokeCenter',
      display: 'left'
    }
  },
  {
    path: 'pokedex',
    pathMatch: 'full',
    component: PokedexComponent,
    data: {
      title: 'Pokedex',
      display: 'left'
    }
  },
  {
    path: 'log-in',
    pathMatch: 'full',
    component: LoginComponent,
    data: {
      title: 'Log In',
      display: 'right'
    }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PokedexComponent,
    PokemonCenterComponent,
    LoginComponent,
    PokemonItemComponent,
    PcDetailComponent,
    TypeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [
    AngularFireDatabase,
    PokeAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
