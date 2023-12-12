import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, map, merge, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  template: `
    <!-- RXJS -->
    <div class="p-8">
      <h1>
        Hello <span>{{ fullName$ | async }}!</span>
      </h1>
      <input
        (input)="updateFirstName($event)"
        type="text"
        class="border rounded p-2 mb-2"
        placeholder="First Name"
      />
      <br />
      <input
        (input)="updateLastName($event)"
        type="text"
        class="border rounded p-2"
        placeholder="Last Name"
      />
    </div>

    <!-- Signals -->
    <!-- <div class="p-8">
      <h1>
        Hello <span>{{ fullName() }}!</span>
      </h1>
      <input
        (input)="updateFirstName($event)"
        type="text"
        class="border rounded p-2 mb-2"
        placeholder="First Name"
      />
      <br />
      <input
        (input)="updateLastName($event)"
        type="text"
        class="border rounded p-2"
        placeholder="Last Name"
      />
    </div> -->
  `,
})
class AppTest {
  // RXJS
  public firstName$ = new BehaviorSubject('');
  public lastName$ = new BehaviorSubject('');

  public fullName$ = combineLatest([
    this.firstName$.asObservable(),
    this.lastName$.asObservable(),
  ]).pipe(map(([firstName, lastName]) => `${firstName} ${lastName}`));

  updateFirstName(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.firstName$.next(value);
  }

  updateLastName(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.lastName$.next(value);
  }

  // Signals
  // firstName = signal('');
  // lastName = signal('');
  // fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

  // updateFirstName(e: Event) {
  //   const value = (e.target as HTMLInputElement).value;
  //   this.firstName.set(value);
  // }

  // updateLastName(e: Event) {
  //   const value = (e.target as HTMLInputElement).value;
  //   this.lastName.set(value);
  // }
}

bootstrapApplication(AppTest, appConfig).catch((err) => console.error(err));
