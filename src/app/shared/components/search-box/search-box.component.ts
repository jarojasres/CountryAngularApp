import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = 'Search...';

  @Output()
  public onValueChange: EventEmitter<string> = new EventEmitter();

  public emitValue(value: string) {
    this.onValueChange.emit( value );
  }
}
