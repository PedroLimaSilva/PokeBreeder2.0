import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { TimelineEventComponent } from './detail/timeline-event/timeline-event.component';
import { WINDOW_PROVIDERS, WINDOW } from './utils/window.service';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';
import { VerticalParalaxDirective } from './directives/vertical-paralax.directive';


@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    TimelineEventComponent,
    MenuButtonComponent,
    VerticalParalaxDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [WINDOW_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
