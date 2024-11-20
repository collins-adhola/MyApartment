import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: any[] = [];
  private favoritesSubject = new BehaviorSubject<any[]>([]);

  constructor() {
    // Load favorites from localStorage if available
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      this.favorites = JSON.parse(savedFavorites);
      this.favoritesSubject.next(this.favorites);
    }
  }

  getFavorites() {
    return this.favorites;
  }

  getFavoritesObservable() {
    return this.favoritesSubject.asObservable();
  }

  addFavorite(property: any) {
    if (!this.isFavorite(property.id)) {
      this.favorites.push(property);
      this.updateStorage();
    }
  }

  removeFavorite(propertyId: number) {
    this.favorites = this.favorites.filter(f => f.id !== propertyId);
    this.updateStorage();
  }

  isFavorite(propertyId: number): boolean {
    return this.favorites.some(f => f.id === propertyId);
  }

  private updateStorage() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    this.favoritesSubject.next(this.favorites);
  }
} 