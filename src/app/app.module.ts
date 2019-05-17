import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RedditService } from './core/store/reddit/reddit.service';
import { RedditFeedComponent } from './reddit-feed/reddit-feed.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';



/** Material  */
import {
  MatButtonModule,
  MatCardModule,
  MatButtonToggleModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule
} from '@angular/material';






@NgModule({
  declarations: [
    AppComponent,
    RedditFeedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FlexLayoutModule,
    InfiniteScrollModule,

    /** Material  */
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule

  ],
  providers: [RedditService],
  bootstrap: [AppComponent]
})
export class AppModule { }
