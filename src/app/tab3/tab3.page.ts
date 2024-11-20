import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class Tab3Page {
  favorites: any[] = [];

  constructor(private favoritesService: FavoritesService) {
    this.favoritesService.getFavoritesObservable().subscribe(favs => {
      this.favorites = favs;
    });
  }

  removeFavorite(propertyId: number) {
    this.favoritesService.removeFavorite(propertyId);
  }
}
