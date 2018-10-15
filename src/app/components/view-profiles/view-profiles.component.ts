import { Component, OnInit } from '@angular/core';

import { MainComponent } from '../../main.component';
import { DatastoreService } from '../../services/datastore.service';
import { TransferService } from '../../services/transfer.service';

@Component({
  selector: 'view-profiles',
  templateUrl: './view-profiles.component.html',
  styleUrls: ['./view-profiles.component.css'],
  providers: [MainComponent]
})
export class ViewProfilesComponent implements OnInit {
    constructor(
        public datastore: DatastoreService,
        private main: MainComponent,
        private transfer: TransferService
    ) {
        this.datastore.get('');
    }

    ngOnInit() {
        // this clears the profiles so that duplicates are not shown
        this.datastore.items = [];
    }

    editProfile(item) {
        this.transfer.itemForEditing = item;
        this.transfer.action = 'edit';
        this.main.goTo('edit');
    }

    createNewProfile() {
        this.transfer.itemForEditing = this.createEmptyProfile();
        this.transfer.action = 'create';
        this.main.goTo('edit');
    }

    createEmptyProfile() {
        return {
            settings:
            {
                attributes:
                {
                    required: [],
                    desired: [],
                    actionOnDuplicates: "fail",
                    minNumberOfAttributes: -1,
                    maxNumberOfAttributes: -1
                },
                associations:{
                    required: [],
                    desired:[]
                },
                tags:
                {
                    required: [],
                    desired: []
                }
            }
        };
    }
}
