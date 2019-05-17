import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SubReddit } from '../core/store/reddit/reddit';
import { RedditService } from '../core/store/reddit/reddit.service';

@Component({
  selector: 'app-reddit-feed',
  templateUrl: './reddit-feed.component.html',
  styleUrls: ['./reddit-feed.component.scss']
})
export class RedditFeedComponent implements OnInit {
  redditUrl = environment.redditBaseUrl;
  isLoading = false;
  defaultSubReddit = 'lucky';
  subReddit: SubReddit;

  searchSubject: Subject<string> = new Subject();

  constructor(private redditServ: RedditService) { }

  ngOnInit() {
    this.searchSubject.pipe(
      filter(a => (a !== '')),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(searchTextValue => {

      this.subReddit = null;
      this.load(searchTextValue);
    });

    this.load(this.defaultSubReddit);

  }

  load(subredit: string, lastPostName?: string) {
    this.isLoading = true;
    this.redditServ.getSubReddit(subredit, lastPostName).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe((data) => {

      if (!this.subReddit) { // first time or different subreddit
        this.subReddit = data;
      } else {
        this.subReddit.after = data.after;
        this.subReddit.feeds.push(...data.feeds);
      }

    });
  }

  onScroll() {
    if (this.subReddit.after) { // else means no more data.
      this.load(this.subReddit.name, this.subReddit.after);
    }
  }

  onSearch(searchTextValue: string) {
    this.searchSubject.next(searchTextValue);
  }

}


