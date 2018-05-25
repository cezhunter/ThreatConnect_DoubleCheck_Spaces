import { Injectable } from '@angular/core';

@Injectable()
export class TransferService {
    itemForEditing: any;
    itemName: string;
    action: string;

    constructor() { }
}