import { Component, OnInit } from '@angular/core';

import { TransferService } from '../../services/transfer.service';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.less']
})
export class EditProfileComponent implements OnInit {
    item: any;

    constructor(
        private transfer: TransferService
    ) { }

    ngOnInit() {
        this.item = this.transfer.itemForEditing;
    }

}
