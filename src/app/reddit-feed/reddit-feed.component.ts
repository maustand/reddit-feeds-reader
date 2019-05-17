import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { SubReddit } from '../core/store/reddit/reddit';
import { RedditService } from '../core/store/reddit/reddit.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-reddit-feed',
  templateUrl: './reddit-feed.component.html',
  styleUrls: ['./reddit-feed.component.scss']
})
export class RedditFeedComponent implements OnInit {
  redditUrl = environment.redditBaseUrl;
  defaultSubReddit = 'israel';
  subReddit: SubReddit;

  searchSubject: Subject<string> = new Subject();

  constructor(private redditServ: RedditService) { }

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(searchTextValue => {
      this.load(searchTextValue);
    });

    this.load(this.defaultSubReddit);

  }

  onSearch(searchTextValue: string) {
    if (searchTextValue) {
      this.searchSubject.next(searchTextValue);
    }
  }


  load(subredit: string) {
    this.redditServ.getSubReddit(subredit).subscribe((data) => {
      this.subReddit = data;
    });

  }

}


