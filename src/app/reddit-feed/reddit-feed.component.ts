import { Component, OnInit } from '@angular/core';
import { RedditService } from '../core/store/reddit/reddit.service';
import { Feed, SubReddit } from '../core/store/reddit/reddit';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-reddit-feed',
  templateUrl: './reddit-feed.component.html',
  styleUrls: ['./reddit-feed.component.scss']
})
export class RedditFeedComponent implements OnInit {
  redditUrl = environment.redditBaseUrl;
  defaultSubReddit = 'israel';
  subReddit: SubReddit;


  constructor(private redditServ: RedditService) { }

  ngOnInit() {
    this.redditServ.getSubReddit(this.defaultSubReddit).subscribe((subredit) => {
      console.log(subredit);
      this.subReddit = subredit;
    });
  }

}
