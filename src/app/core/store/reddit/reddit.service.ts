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


  getSubReddit(subbredit: string) {
    return this.http.get(`${this.entryPoint}/${subbredit}.json`).pipe(
      map((res: any): SubReddit => {
        return {
          name: subbredit,
          after: res.after,
          feeds: res.data.children.map((child: any) => {
            child = child.data;
debugger;
            return {
              author: child.author,
              title: child.title,
              link: child.permalink,
              upVotes: child.ups,
              thumbnail: (child.preview) ? child.preview.images[0].resolutions.pop().url : null,
              date: '2019-05-16T15:13:23+0000'
            };

          })
        };

      })
    );
  }
}


///  (child.data.preview) ? child.preview.images[0].resolutions[child.preview.images[0].resolutions.length - 1].url : null,