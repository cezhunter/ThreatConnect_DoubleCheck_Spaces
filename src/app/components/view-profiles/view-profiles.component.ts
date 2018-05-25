import { Component, OnInit } from '@angular/core';

import { MainComponent } from '../../main.component';
import { DatastoreService } from '../../services/datastore.service';
import { TransferService } from '../../services/transfer.service';

@Component({
  selector: 'view-profiles',
  templateUrl: './view-profiles.component.html',
  styleUrls: ['./view-profiles.component.less'],
  providers: [MainComponent]
})
export class ViewProfilesComponent implements OnInit {
    constructor(
        public datastore: DatastoreService,
        private main: MainComponent,
        private transfer: TransferService
    ) { }

    ngOnInit() {
        this.datastore.get('');
    }

    editProfile(item) {
        this.transfer.itemForEditing = item.settings;
        this.transfer.itemName = item.name;
        this.transfer.action = 'edit';
        this.main.goTo('edit');
    }

    createNewProfile() {
        this.transfer.itemForEditing = this.createEmptyProfile();
        this.transfer.itemName = '';
        this.transfer.action = 'create';
        this.main.goTo('edit');
    }

    createEmptyProfile() {
        return {
            settings: {
                attributes: {
                    required: [],
                    desired: [],
                    failOnDuplicates: false,
                    minNumberOfAttributes: 0,
                    // TODO: what should be the default here?
                    maxNumberOfAttributes: -1
                },
                associations: {
                    required: [],
                    desired: []
                },
                tags: {
                    required: [],
                    desired: []
                }
            }
        }
    }
}
