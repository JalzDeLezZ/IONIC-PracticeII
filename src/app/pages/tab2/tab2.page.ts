import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;
  public categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];
  public selectedCategory: string = this.categories[0];
  public articles: Article[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    console.log(IonInfiniteScroll);
    this.newsService
      .getTopHeadlinesByCategory(this.selectedCategory)
      .subscribe((response) => {
        this.articles = [...response];
      });
  }

  segmentChanged(event: Event) {
    this.selectedCategory = (event as CustomEvent).detail.value;
    this.newsService
      .getTopHeadlinesByCategory(this.selectedCategory)
      .subscribe((response) => {
        this.articles = [...response];
      });
  }

  loadData() {
    this.newsService
      .getTopHeadlinesByCategory(this.selectedCategory, true)
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
