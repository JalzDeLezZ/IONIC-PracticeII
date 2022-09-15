import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
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
    this.newsService
      .getTopHeadlinesByCategory(this.selectedCategory)
      .subscribe((res) => {
        this.articles = [...this.articles, ...res];
      });
  }

  segmentChanged(event) {
    this.selectedCategory = event.detail.value;
    this.newsService
      .getTopHeadlinesByCategory(this.selectedCategory)
      .subscribe((res) => {
        this.articles = [...res];
      });
  }
}
