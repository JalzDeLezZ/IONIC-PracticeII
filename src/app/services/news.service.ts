import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import {
  Article,
  ArticlesByCategoryAndPage,
  NewsResponse,
} from '../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {};

  constructor(private http: HttpClient) {}

  getTopHeadlines(): Observable<Article[]> {
    return this.executeQuery<NewsResponse>(`&category=business`).pipe(
      map(({ articles }) => articles)
    );
  }

  getTopHeadlinesByCategory(
    category: string,
    loadMore: boolean = false
  ): Observable<Article[]> {
    return this.executeQuery<NewsResponse>(`&category=${category}`).pipe(
      map(({ articles }) => articles)
    );
  }

  private executeQuery<T>(endpoint: string) {
    console.log('Dispatching a event with endpoint:');
    return this.http.get<T>(`${apiUrl}${endpoint}`, {
      params: { apiKey },
    });
  }

  private getArticlesByCategory(category: string): Observable<Article[]> {
    if (!Object.keys(this.articlesByCategoryAndPage).includes(category)) {
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: [],
      };
    }
    const page = (this.articlesByCategoryAndPage[category].page += 1);

    return this.executeQuery<NewsResponse>(
      `&category=${category}&page=${page}`
    ).pipe(
      map(({ articles }) => {
        if (articles.length < 1) {
          return [];
        }

        this.articlesByCategoryAndPage[category] = {
          page,
          articles: [
            ...this.articlesByCategoryAndPage[category].articles,
            ...articles,
          ],
        };
        return articles;
      })
    );
  }
}
