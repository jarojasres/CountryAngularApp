import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit {

  private debouncer: Subject<string> = new Subject();
  private debouncerSubscription?: Subscription;

  @Input()
  public placeholder: string = 'Search...';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValueChange: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime(300)
      ).subscribe(value => {
        this.onDebounce.emit(value);
      })
  }

  ngOnDestroy() {
    this.debouncerSubscription?.unsubscribe();
  }

  public emitValue(value: string) {
    this.onValueChange.emit(value);
  }

  public onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}
