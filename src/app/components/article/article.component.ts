import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Component, Input } from '@angular/core';
import { Article } from 'src/app/interfaces';
import {
  ActionSheetButton,
  ActionSheetController,
  Platform,
} from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input() article: Article;
  @Input() index: number;

  constructor(
    private iab: InAppBrowser,
    private actionSheetCtrl: ActionSheetController,
    private platform: Platform,
    private socialSharing: SocialSharing
  ) {}

  openArticle() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      const browser = this.iab.create(this.article.url);
      browser.show();
    }

    window.open(this.article.url, '_blank');
  }

  async onOpenMenu() {
    const normalBtns: ActionSheetButton[] = [
      {
        text: 'Favorito',
        icon: 'heart-outline',
        handler: () => {
          this.onToogleFavorite();
        },
      },
      {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel',
        cssClass: 'danger',
      },
    ];

    const shareBtn: ActionSheetButton = {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => {
        this.onShareArticle();
      },
    };

    if (this.platform.is('capacitor')) {
      normalBtns.unshift(shareBtn);
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Options',
      buttons: normalBtns,
    });

    await actionSheet.present();
  }

  onShareArticle() {
    const { title, source, url } = this.article;

    this.socialSharing.share(title, source.name, null, url);
  }
  onToogleFavorite() {
    console.log('Favorito');
  }
}
