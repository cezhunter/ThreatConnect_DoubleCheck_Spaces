import { Component, OnInit } from '@angular/core';

import { TransferService } from '../../services/transfer.service';
import { MainComponent } from '../../main.component';
import { Profile } from '../../entities';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.less'],
  providers: [MainComponent]
})
export class EditProfileComponent implements OnInit {
    profile: any;
    action: string;

    constructor(
        private transfer: TransferService,
        private main: MainComponent
    ) { }

    ngOnInit() {
        this.profile = this.transfer.itemForEditing;
        this.action = this.transfer.action;
    }

    saveProfile() {
        // TODO: add code to split up required/desired attributes which only have types from those with values
        // TODO: implement
    }

    viewExistingProfiles() {
        this.main.goTo('')
    }
}
