import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../services/favorites.service';

interface Property {
  id: number;
  image: string;
  type: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  price: number;
  contactName: string;
  contactPhone: string;
  isFavorite?: boolean;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class Tab1Page {
  allProperties: Property[] = [];
  currentPage = 1;
  pageSize = 6;
  properties: Property[] = [];
  favCount = 0;

  // Collection of Unsplash real estate images
  private unsplashImages = [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800',
    'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800',
    'https://images.unsplash.com/photo-1592595896616-c37162298647?w=800',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800',
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
  ];

  constructor(private favoritesService: FavoritesService) {
    this.generateProperties();
    this.updateFavCount();
  }

  private generateProperties() {
    const areas = [
      '23 Cross, Hrbr Layout, Bangalore',
      'Indiranagar, Bangalore',
      'Koramangala, Bangalore',
      'HSR Layout, Bangalore',
      'JP Nagar, Bangalore'
    ];
    const types = [
      'Studio Apartment',
      'Luxury Apartment',
      'Penthouse',
      'Villa',
      'Duplex'
    ];

    this.allProperties = Array(20).fill(null).map((_, index) => ({
      id: index + 1,
      image: this.unsplashImages[index],
      type: types[Math.floor(Math.random() * types.length)],
      area: areas[Math.floor(Math.random() * areas.length)],
      bedrooms: Math.floor(Math.random() * 3) + 1,
      bathrooms: Math.floor(Math.random() * 2) + 1,
      parking: Math.floor(Math.random() * 2) + 1,
      price: Math.floor(Math.random() * 30000) + 15000,
      contactName: 'John Smith',
      contactPhone: '07123 456789',
      isFavorite: this.favoritesService.isFavorite(index + 1)
    }));
    
    this.loadProperties();
  }

  loadProperties() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.properties = this.allProperties.slice(startIndex, endIndex);
  }

  loadMore(event: any) {
    this.currentPage++;
    this.loadProperties();
    event.target.complete();

    if (this.currentPage * this.pageSize >= this.allProperties.length) {
      event.target.disabled = true;
    }
  }

  toggleFavorite(property: Property, event: Event) {
    event.stopPropagation();
    property.isFavorite = !property.isFavorite;
    
    if (property.isFavorite) {
      this.favoritesService.addFavorite(property);
    } else {
      this.favoritesService.removeFavorite(property.id);
    }
    
    this.updateFavCount();
  }

  private updateFavCount() {
    this.favCount = this.favoritesService.getFavorites().length;
  }
}
