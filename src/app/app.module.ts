/* Core */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Routing */
import { AppRoutingModule } from './app-routing.module';

/* Third-Party */
import {
    BowserModule,
    BowserService
} from 'ngx-bowser';

import {
    AccordionModule,
    ButtonModule,
    DataTableModule,
    DialogModule,
    DropdownModule,
    GrowlModule,
    InputTextModule,
    PanelModule,
    SharedModule,
    StepsModule,
    TabViewModule
} from 'primeng/primeng';

import { TableModule } from 'primeng/table';

/* Components */
import { AppComponent } from './app.component';
import { MainComponent } from './main.component';

/* Services */
import {
    SpacesBaseService,
    SpacesLoggingService,
    SpacesMessagesService,
    SpacesRequestService,
    SpacesStorageService,
    SpacesUtilityService
} from 'spaces-ng';

import {
    // Address,
    // EmailAddress,
    // Host,
    TcExchangeDbService,
    TcGroupService,
    TcIndicatorService,
    TcOwnerService
    // Url
} from 'threatconnect-ng';

import { StringArrayHandlerComponent } from './components/string-array-handler/string-array-handler.component';
import { ViewProfilesComponent } from './components/view-profiles/view-profiles.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { DatastoreService } from './services/datastore.service';
import { TransferService } from './services/transfer.service';

@NgModule({
    imports: [
        /* Core */
        AppRoutingModule,
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        /* Bowser */
        BowserModule,
        /* PrimeNG */
        AccordionModule,
        ButtonModule,
        DataTableModule,
        DialogModule,
        DropdownModule,
        GrowlModule,
        InputTextModule,
        PanelModule,
        SharedModule,
        StepsModule,
        TabViewModule,
        TableModule
    ],
    declarations: [
        AppComponent,
        MainComponent,
        StringArrayHandlerComponent,
        ViewProfilesComponent,
        EditProfileComponent,
    ],
    providers: [
        DatastoreService,
        TransferService,
        /* Bowser Service */
        BowserService,
        /* TC Service */
        SpacesBaseService,
        SpacesLoggingService,
        SpacesMessagesService,
        SpacesRequestService,
        SpacesStorageService,
        SpacesUtilityService,
        TcExchangeDbService,
        TcGroupService,
        TcIndicatorService,
        TcOwnerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
