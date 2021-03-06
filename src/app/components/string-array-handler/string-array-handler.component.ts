import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SpacesMessagesService } from 'spaces-ng';

@Component({
  selector: 'string-array-handler',
  templateUrl: './string-array-handler.component.html',
  styleUrls: ['./string-array-handler.component.less']
})
export class StringArrayHandlerComponent {
    newItem: string = '';
    @Input() items: any[];
    @Input() itemName: string;
    @Input() optionalValue: boolean = false;
    @Input() optionalCount: boolean = false;
    itemValue: string = '';
    itemCount: number = -1;
    itemIsRegex: boolean = false;

    constructor(
        private messages: SpacesMessagesService
    ) { }

    @Output()
    itemsEmitter: EventEmitter<string[]> = new EventEmitter<string[]>();

    queueItem() {
        if (this.newItem !== '') {
            if (this.optionalValue) {
                this.items.push({
                    type: this.newItem,
                    value: this.itemValue,
                    regex: this.itemIsRegex
                });
                this.itemValue = '';
            } else if (this.optionalCount) {
                this.items.push({
                    type: this.newItem,
                    num: this.itemCount
                });
                this.itemCount = -1;
            } else {
                this.items.push(this.newItem);
            }
            this.newItem = '';
            // emit the list of items back to parent component
            this.itemsEmitter.emit(this.items);
        } else {
            this.messages.showError('No value', 'Please enter a type/name for this item');
        }
    }

    deleteItem(item) {
        for (var i = this.items.length - 1; i >= 0; i--) {
            if (typeof(this.items[i]) === 'object') {
                if (this.items[i].type === item.type) {
                    if (!this.items[i].value && !this.items[i].num) {
                        this.items.splice(i, 1);
                        break;
                    }
                    else if (this.items[i].num) {
                        if (this.items[i].num === item.num) {
                            this.items.splice(i, 1);
                            break;
                        }
                    } else if (this.items[i].value) {
                        if (this.items[i].value === item.value) {
                            this.items.splice(i, 1);
                            break;
                        }
                    }
                }
            } else {
                if (this.items[i] === item) {
                    this.items.splice(i, 1);
                    break;
                }
            }
        }
    }
}
