import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Feed, SubReddit } from './reddit';

@Injectable({
  providedIn: 'root'
})
export class RedditService {

  private entryPoint = environment.redditBaseUrl + '/r';

  constructor(private http: HttpClient) { }


  getSubReddit(subbredit: string, lastUrl?: string) {

    let urlRequest = `${this.entryPoint}/${subbredit}.json?count=25&raw_json=1`;

    if (lastUrl) {
      urlRequest += `&after=${lastUrl}`;
    }

    return this.http.get(urlRequest).pipe(
      map((res: any): SubReddit => {
        return {
          name: subbredit,
          after: res.data.after,
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

      }),
      catchError((err, obsr) => {
        return of(undefined);
      })
    );
  }
}
