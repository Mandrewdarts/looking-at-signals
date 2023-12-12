import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Pokemon } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <mat-card class="m-12">
      <mat-card-header>
        <div mat-card-avatar>
          <img [src]="pokemon?.sprites?.front_default" alt="" />
        </div>
        <mat-card-title>{{ pokemon?.name }}</mat-card-title>
        <mat-card-subtitle>
          @for (type of pokemon?.types; track type.type.name; let last = $last)
          {
          {{ type.type.name }}
          }
        </mat-card-subtitle>
      </mat-card-header>
      <img
        mat-card-image
        [src]="pokemon?.sprites?.other?.['official-artwork']?.front_default"
        [alt]="'Photo of ' + pokemon?.name"
      />
      <mat-card-content>
        <p></p>
      </mat-card-content>
      <mat-card-actions>
        <button
          mat-flat-button
          [disabled]="disableAdd"
          color="primary"
          class="mr-2"
          (click)="add.next(null)"
        >
          Add
        </button>
        <button mat-stroked-button color="primary" (click)="remove.next(null)">
          Remove
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrl: './pokemon-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  @Input({ required: true }) pokemon: Pokemon | null = null;
  @Input() disableAdd = false;

  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter();
}
