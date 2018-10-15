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
        // TODO: this needs to get more than 10 results (it will currently only return 10 results)
        this.exchangeDB.read(this.domain, this.typeName, searchCommand)
            .subscribe(
                response => {
                    for (var i = response.hits.hits.length - 1; i >= 0; i--) {
                        this.items.push({
                            settings: response.hits.hits[i]._source.settings,
                            name: response.hits.hits[i]._id
                        });
                    }
                },
                err => {
                  this.logging.error('Error', err);
                  this.messages.showError('Failed', 'Unable to retrieve the items: ' + err);
                }
            );
    }

    public save(searchCommand: string, body: string, oldIndexName: string) {
        /*
         * Save an item to the datastore
         */
        let jsonifiedBody = JSON.parse('{"text": "' + body + '"}');

        // delete the old entry from the datastore
        for (var i = this.items.length - 1; i >= 0; i--) {
            if (this.items[i].name === oldIndexName) {
                this.delete(this.items[i].name);
                // I intentionally do not break out of this loop so that any duplicates will be removed
                // break;
            }
        }

        this.exchangeDB.create(this.domain, this.typeName, searchCommand, jsonifiedBody)
            .subscribe(
                response => {
                    // this.messages.showSuccess('Success', 'item saved');
                    this.items.push({
                        settings: body,
                        name: searchCommand
                    });
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
                        if (this.items[i].name === itemId) {
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