import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuOpen = false;

  navLinks = [
    { label: 'Agences', route: '/agencies', active: true },
    { label: 'Locations', route: '/rentals', active: false },
    { label: 'Profil', route: '/profil', active: false },
    { label: 'Support', route: '/client', active: false },
    { label: 'Ticket', route: '/employee', active: false },
    { label: 'Déconnexion', route: '/logout', active: false }
  ];

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  setActiveLink(index: number): void {
    this.navLinks.forEach((link, i) => {
      link.active = i === index;
    });
  }
}
