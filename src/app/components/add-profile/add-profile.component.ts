import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.less']
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

    constructor() { }

    ngOnInit() {
    }

    saveProfile() {
        // TODO: add code to split up required/desired attributes which only have types from those with values
        console.log(this.requiredAttributes);
        console.log(this.desiredAttributes);
        console.log(this.requiredTags);
        console.log(this.desiredTags);
    }
}
