import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { TimelineEventComponent } from './detail/timeline-event/timeline-event.component';
import { WINDOW_PROVIDERS, WINDOW } from './utils/window.service';


@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    TimelineEventComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [WINDOW_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
