import { Component, OnInit } from '@angular/core';

import { DatastoreService } from '../../services/datastore.service';

@Component({
  selector: 'view-profiles',
  templateUrl: './view-profiles.component.html',
  styleUrls: ['./view-profiles.component.less']
})
export class ViewProfilesComponent implements OnInit {
    constructor(
        public datastore: DatastoreService
    ) { }

    ngOnInit() {
        this.datastore.get('');
    }

}
