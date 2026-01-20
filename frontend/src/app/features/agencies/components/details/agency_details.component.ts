import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgencyService } from '../../services/agency.service';
import { Agencies } from '../../interfaces/api/agencies.interface';

@Component({
  selector: 'app-agencies',
  imports: [CommonModule],
  templateUrl: './agency_details.component.html',
  styleUrl: './agency_details.component.css',
})
export class Agency_detailsComponent implements OnInit {
  agencies: Agencies | null = null;
  loading = false;
  error: string | null = null;

  constructor(private agencyService: AgencyService) {}

  ngOnInit(): void {
    this.loadAgencies();
  }

  loadAgencies(): void {
    this.loading = true;
    this.error = null;

    this.agencyService.getAgencies().subscribe({
      next: (data) => {
        this.agencies = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des agences';
        this.loading = false;
        console.error('Erreur:', err);
      },
      complete: () => {
        console.log('Chargement terminé');
      }
    });
  }
}
