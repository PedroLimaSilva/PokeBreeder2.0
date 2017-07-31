import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import {
  BsDropdownModule,
  ProgressbarModule
} from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PokedexComponent } from './pokemon/pokedex/pokedex.component';
import { PokemonCenterComponent } from './pokemon/pokemon-center/pokemon-center.component';
import { LoginComponent } from './login/login.component';
import { PokemonItemComponent } from './pokemon/pokemon-center/pokemon-item/pokemon-item.component';

import { PokeAPIService } from './services/poke-api.service';
import { PokemonService } from './pokemon/pokemon.service';
import { PokedexService } from './pokemon/pokedex/pokedex.service';
import { ClickService } from './services/click.service';
import { AdventureService } from './pokemon/adventure-list/adventure.service';
// import { ChatService } from './services/chat.service';

import { PcDetailComponent } from './pokemon/pokemon-center/pc-detail/pc-detail.component';
import { TypeComponent } from './pokemon/_components/type/type.component';
import { PokedexEntryComponent } from './pokemon/pokedex/pokedex-entry/pokedex-entry.component';
import { ExpBarComponent } from './pokemon/_components/exp-bar/exp-bar.component';
// import { SocketPcComponent } from './pokemon/socket-pc/socket-pc.component';
import { PokemonPickerComponent } from './pokemon/_components/pokemon-picker/pokemon-picker.component';
import { BuddyIndicatorComponent } from './pokemon/_components/buddy-indicator/buddy-indicator.component';
import { AdventureListComponent } from './pokemon/adventure-list/adventure-list.component';
import { TimePipe } from './pipes/time.pipe';

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
    TypeComponent,
    PokedexEntryComponent,
    ExpBarComponent,
    // SocketPcComponent,
    PokemonPickerComponent,
    BuddyIndicatorComponent,
    AdventureListComponent,
    TimePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  providers: [
    AngularFireDatabase,
    PokeAPIService,
    PokemonService,
    PokedexService,
    AdventureService,
    ClickService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
