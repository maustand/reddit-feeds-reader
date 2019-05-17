import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SubReddit, Feed } from './reddit';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RedditService {

  private entryPoint = environment.redditBaseUrl + '/r';

  constructor(private http: HttpClient) { }


  getSubReddit(subbredit: string, lastUrl?: string) {
    return this.http.get(`${this.entryPoint}/${subbredit}.json?raw_json=1`).pipe(
      map((res: any): SubReddit => {
        return {
          name: subbredit,
          after: res.after,
          feeds: res.data.children.map((child: any): Feed => {
            return {
              author: child.data.author,
              title: child.data.title,
              text: child.data.selftext,
              permalink: child.data.permalink,
              url: child.data.url,
              upVotes: child.data.ups,
              thumbnail: (child.data.preview) ? child.data.preview.images[0].resolutions.pop().url : null,
              date: new Date(child.data.created * 1000)
            };

          })
        };

      })
    );
  }
}
