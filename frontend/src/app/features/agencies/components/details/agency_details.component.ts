import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgencyService } from '../../services/agency.service';
import { Agency } from '../../interfaces/model/agency.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-agencies',
  imports: [CommonModule],
  templateUrl: './agency_details.component.html',
  styleUrl: './agency_details.component.css',
})
export class Agency_detailsComponent implements OnInit {
  agencies: Agency[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private agencyService: AgencyService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAgencies();
  }

  loadAgencies(): void {
    this.loading = true;
    this.error = null;

    this.agencyService.getAgencies()
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (data: Agency[]) => {
          this.agencies = data;
        },
        error: (err) => {
          this.error = 'Erreur lors du chargement des agences';
          console.error('Erreur:', err);
        }
      });
  }
}
