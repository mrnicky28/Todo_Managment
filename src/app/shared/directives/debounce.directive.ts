import {
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: '[ngModel][appDebounce]',
})
export class DebounceDirective implements OnInit, OnDestroy {
  @Output()
  public appDebounce = new EventEmitter<any>();
  @Input()
  appDebounceTime = 500;

  subscription: Subscription;
  private isFirstChange = true;

  constructor(private model: NgControl) {}

  ngOnInit(): void {
    console.log(this.model);

    this.subscription = this.model.valueChanges
      .pipe(debounceTime(this.appDebounceTime), distinctUntilChanged())
      .subscribe((v) => {
        console.log(v);

        if (!this.isFirstChange) {
          this.appDebounce.emit(v);
        } else {
          this.isFirstChange = false;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
