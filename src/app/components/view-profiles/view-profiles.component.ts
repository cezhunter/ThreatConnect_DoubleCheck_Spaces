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
        console.log("Data: ", this.datastore.get(''));
    }

    editProfile(item) {
        this.transfer.itemForEditing = item;
        this.main.goTo('edit')
    }

}
