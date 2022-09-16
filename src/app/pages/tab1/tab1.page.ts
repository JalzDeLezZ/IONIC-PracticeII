import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;
  public articles: Article[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.newsService
      .getTopHeadlines()
      .subscribe((resp) => (this.articles = [...resp, ...this.articles]));
    // .subscribe((resp) => this.articles.push(...resp));
  }

  loadData() {
    this.newsService
      .getTopHeadlinesByCategory('business', true)
      .subscribe((response) => {
        if (response.length === this.articles.length) {
          this.infiniteScroll.disabled = true;
          return;
        }

        this.articles = response;
        this.infiniteScroll.complete();
      });
  }
}
