import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SpacesMessagesService } from 'spaces-ng';

@Component({
  selector: 'string-array-handler',
  templateUrl: './string-array-handler.component.html',
  styleUrls: ['./string-array-handler.component.less']
})
export class StringArrayHandlerComponent {
    newItem: string = '';
    items: any[] = [];
    @Input() itemName: string;
    @Input() optionalValue: boolean = false;
    @Input() optionalCount: boolean = false;
    itemValue: string = '';
    itemCount: number = 0;
    itemIsRegex: boolean = false;

    constructor(
        private messages: SpacesMessagesService
    ) { }

    @Output()
    itemsEmitter: EventEmitter<string[]> = new EventEmitter<string[]>();

    queueItem() {
        if (this.newItem !== '') {
            if (this.itemValue !== '') {
                this.items.push({
                    type: this.newItem,
                    value: this.itemValue,
                    regex: this.itemIsRegex
                });
            } else if (this.optionalCount) {
                this.items.push({
                    type: this.newItem,
                    count: this.itemCount
                });
            } else {
                this.items.push(this.newItem);
            }
            this.newItem = '';
            this.itemsEmitter.emit(this.items);
        } else {
            this.messages.showError('No value', 'Please enter some text for the value of this item');
        }
    }
}
