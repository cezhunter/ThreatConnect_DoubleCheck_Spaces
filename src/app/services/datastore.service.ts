import { Injectable } from '@angular/core';
import {
    SpacesLoggingService,
    SpacesMessagesService
} from 'spaces-ng';
import { TcExchangeDbService } from 'threatconnect-ng';


@Injectable()
export class DatastoreService {
    private domain: string = 'organization';
    private typeName: string = 'tc_doublecheck';
    public items: any[] = [];

    constructor(
        private exchangeDB: TcExchangeDbService,
        private logging: SpacesLoggingService,
        private messages: SpacesMessagesService
    ) { /* empty block */ }

    public get(searchCommand: string) {
        /*
         * Get the items from the datastore
         */
        this.exchangeDB.read(this.domain, this.typeName, searchCommand)
            .subscribe(
                response => {
                    for (var i = response.hits.hits.length - 1; i >= 0; i--) {
                        this.items.push({
                            'text': response.hits.hits[i]._source.text,
                            'id': response.hits.hits[i]._id
                        });
                    }
                },
                err => {
                  this.logging.error('Error', err);
                  this.messages.showError('Failed', 'Unable to retrieve the items: ' + err);
                }
            );
    }

    public save(searchCommand: string, body: string) {
        /*
         * Save an item to the datastore
         */
        let jsonifiedBody = JSON.parse('{"text": "' + body + '"}');

        this.exchangeDB.create(this.domain, this.typeName, searchCommand, jsonifiedBody)
                .subscribe(
                    response => {
                        // this.messages.showSuccess('Success', 'item saved');
                        // if a item is being updated, simply update the item's text rather than adding a new item
                        if (searchCommand !== '') {
                            for (var i = this.items.length - 1; i >= 0; i--) {
                                if (this.items[i].id === searchCommand) {
                                    this.items[i].text = body;
                                    break;
                                }
                            }
                        } else {
                            this.items.push({
                                'text': body,
                                'id': response._id,
                            });
                        }
                    },
                    err => {
                        this.logging.error('Error', err);
                        this.messages.showError('Failed', 'Unable to save item: ' + err);
                    }
                );
    }

    public delete(itemId: string) {
        this.exchangeDB.delete(this.domain, this.typeName, itemId)
                .subscribe(
                    response => {
                        for (var i = this.items.length - 1; i >= 0; i--) {
                            // remove the item from the list of items
                            if (this.items[i].id === itemId) {
                                this.items.splice(i, 1);
                                break;
                            }
                        }
                    },
                    err => {
                        this.logging.error('Error', err);
                        this.messages.showError('Failed', 'Unable to delete item: ' + err);
                    }
                );
    }
}