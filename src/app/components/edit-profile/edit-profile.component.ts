import { Component, OnInit } from '@angular/core';

import { TransferService } from '../../services/transfer.service';
import { MainComponent } from '../../main.component';
import { Profile } from '../../entities';
import { DatastoreService } from '../../services/datastore.service';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.less'],
  providers: [MainComponent]
})
export class EditProfileComponent implements OnInit {
    profile: any;
    profileName: string;
    originalProfileName: string;
    action: string;

    constructor(
        private transfer: TransferService,
        private main: MainComponent,
        private datastore: DatastoreService
    ) {}

    ngOnInit() {
        this.profile = this.transfer.itemForEditing;
        this.classifyIncomingAttributes();
        this.classifyIncomingAssociations();
        this.profileName = this.transfer.itemForEditing.name;
        this.originalProfileName = this.transfer.itemForEditing.name;
        this.action = this.transfer.action;
    }

    /* Classify attributes as required or desired. This is done because the data coming from the datastore is not in a form that is convenient for this app. */
    classifyIncomingAttributes() {
        this.profile.settings.attributes.required = [];
        this.profile.settings.attributes.desired = [];

        for (let attribute in this.profile.settings.attributes.chosen) {
            if (this.profile.settings.attributes.chosen.hasOwnProperty(attribute)) {
                for (var i = this.profile.settings.attributes.chosen[attribute].length - 1; i >= 0; i--) {
                    let thisAttributeData = this.profile.settings.attributes.chosen[attribute][i];
                    thisAttributeData.type = attribute;
                    if (this.profile.settings.attributes.chosen[attribute][i].required) {
                        this.profile.settings.attributes.required.push(thisAttributeData);
                    } else {
                        this.profile.settings.attributes.desired.push(thisAttributeData);
                    }
                }
            }
        }
    }

    /* Same principle as the `classifyIncomingAttributes` function, but for associations. */
    classifyIncomingAssociations() {
        this.profile.settings.associations.required = [];
        this.profile.settings.associations.desired = [];

        for (let assocType in this.profile.settings.associations.chosen) {
            if (this.profile.settings.associations.chosen.hasOwnProperty(assocType)) {
                let thisAssociationData = this.profile.settings.associations.chosen[assocType];
                thisAssociationData.type = assocType;
                if (this.profile.settings.associations.chosen[assocType].required) {
                    this.profile.settings.associations.required.push(thisAssociationData);
                } else {
                    this.profile.settings.associations.desired.push(thisAssociationData);
                }
            }
        }
    }

    private recordAttributes(attributeData, required: boolean) {
        let attributeType = attributeData.type;
        delete attributeData.type;
        attributeData.required = required;

        if (!this.profile.settings.attributes.chosen.hasOwnProperty(attributeType)) {
            this.profile.settings.attributes.chosen[attributeType] = [];
        }

        this.profile.settings.attributes.chosen[attributeType].push(attributeData);
    }

    /* Move the attributes into the form required by the datastore. In short, this function removes the 'type' key and value from each attribute and moves the attributes from required/desired arrays into the profile.settings.attributes.chosen object with the proper 'required' key-value pair. */
    prepareOutgoingAttributes() {
        // clear the existing attributes in profile.settings.attributes.chosen
        this.profile.settings.attributes.chosen = {};
        // record required attributes
        for (var i = this.profile.settings.attributes.required.length - 1; i >= 0; i--) {
            this.recordAttributes(this.profile.settings.attributes.required[i], true);
        }
        delete this.profile.settings.attributes.required;
        // record desired attributes
        for (var i = this.profile.settings.attributes.desired.length - 1; i >= 0; i--) {
            this.recordAttributes(this.profile.settings.attributes.desired[i], false);
        }
        delete this.profile.settings.attributes.desired;
    }

    private recordAssociation(associationData, required: boolean) {
        let associationType = associationData.type;
        delete associationData.type;
        associationData.required = true;
        this.profile.settings.associations.chosen[associationType] = associationData;
    }

    /* Same principle as the `prepareOutgoingAttributes` function, but for associations. */
    prepareOutgoingAssociations() {
        this.profile.settings.associations.chosen = {};
        for (var i = this.profile.settings.attributes.required.length - 1; i >= 0; i--) {
            this.recordAssociation(this.profile.settings.attributes.required[i], true);
        }
        delete this.profile.settings.associations.required;

        for (var i = this.profile.settings.attributes.desired.length - 1; i >= 0; i--) {
            this.recordAssociation(this.profile.settings.attributes.desired[i], false);
        }
        delete this.profile.settings.associations.desired;
    }

    saveProfile() {
        this.prepareOutgoingAttributes();
        this.prepareOutgoingAssociations();
        console.log(this.profile);
        console.log(this.profile.settings.attributes.chosen);
        this.datastore.save(this.profileName, this.profile, this.originalProfileName);
    }

    viewExistingProfiles() {
        this.main.goTo('')
    }
}
