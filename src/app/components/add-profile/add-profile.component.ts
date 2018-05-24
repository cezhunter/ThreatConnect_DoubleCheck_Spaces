import { Component, OnInit } from '@angular/core';

import { MainComponent } from '../../main.component';

@Component({
  selector: 'add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.less'],
  providers: [MainComponent]
})
export class AddProfileComponent implements OnInit {
    requiredAttributes: string[] = [];
    desiredAttributes: string[] = [];
    requiredTags: string[] = [];
    desiredTags: string[] = [];
    minAttributes: number = 0;
    maxAttributes: number = 50;
    requiredAssociations: string[] = [];
    desiredAssociations: string[] = [];

    constructor(
        private main: MainComponent
    ) { }

    ngOnInit() {
    }

    saveProfile() {
        // TODO: add code to split up required/desired attributes which only have types from those with values
        console.log(this.requiredAttributes);
        console.log(this.desiredAttributes);
        console.log(this.requiredTags);
        console.log(this.desiredTags);
    }

    viewExistingProfiles() {
        this.main.goTo('')
    }
}
