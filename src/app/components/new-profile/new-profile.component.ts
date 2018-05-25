import { Component, OnInit } from '@angular/core';

import { MainComponent } from '../../main.component';
import { Profile } from '../../entities';

@Component({
  selector: 'new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.less'],
  providers: [MainComponent]
})
export class NewProfileComponent implements OnInit {
    checkForDuplicateAttributes: boolean = false;
    requiredAttributes: string[] = [];
    desiredAttributes: string[] = [];
    requiredTags: string[] = [];
    desiredTags: string[] = [];
    minAttributes: number = 0;
    maxAttributes: number = 50;
    requiredAssociations: string[] = [];
    desiredAssociations: string[] = [];
    profileName: string = '';
    newProfile: Profile;

    constructor(
        private main: MainComponent
    ) { }

    ngOnInit() {
    }

    saveProfile() {
        // TODO: add code to split up required/desired attributes which only have types from those with values
    }

    viewExistingProfiles() {
        this.main.goTo('')
    }

}
