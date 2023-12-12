import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Pokemon, PokemonService } from './services/pokemon.service';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { IncludesPipe } from './pipes/includes.pipe';
import { concat } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,

    PokemonCardComponent,
    IncludesPipe,
  ],
  providers: [PokemonService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  pokemons = this.pokemonService.pokemons;
  loading = this.pokemonService.loading;

  selectedPokemon = signal<Pokemon | null>(null);

  deck = signal<Array<string>>(
    JSON.parse(localStorage.getItem('pokemon-deck') || '[]')
  );
  deckSearch = signal('');
  deckOfPokemon = computed(() => {
    return this.deck().map((name) =>
      this.pokemons().find((p) => p.name === name)
    );
  });
  visibleDeck = computed(() => {
    return this.deckOfPokemon().filter((pokemon) =>
      pokemon?.name.includes(this.deckSearch())
    );
  });

  constructor(private pokemonService: PokemonService) {
    effect(() => {
      localStorage.setItem('pokemon-deck', JSON.stringify(this.deck()));
    });
  }

  async ngOnInit() {
    await this.pokemonService.index().toPromise();
    await this.pokemonService.nextPage().toPromise();
    await this.pokemonService.nextPage().toPromise();
  }

  async loadMore() {
    await this.pokemonService.nextPage().toPromise();
  }

  async selectPokemon(pokemon: Pokemon) {
    this.selectedPokemon.set(pokemon);
  }

  removePokemonFromDeck(name: string) {
    this.deck.update((deck) => {
      return [...deck.filter((pokemon) => pokemon !== name)];
    });
  }

  addPokemonToDeck(name: string) {
    this.deck.update((deck) => {
      deck.push(name);
      return [...deck];
    });
  }

  handleDeckSearchInput($event: Event) {
    const value = ($event.target as HTMLInputElement).value;
    this.deckSearch.set(value);
  }
}
