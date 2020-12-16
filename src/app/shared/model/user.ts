import { Address } from './address.model';

export class User {
    id?: string;
    displayName: string;
    email: string;
    phoneNum: number;
    photoUrl?: string;
    address?: Address;

    isAdmin: boolean = false;
    isSuperAdmin: boolean = false;
    isInvetoryManager: boolean = false;
    inventoryLocation?: string = null;
}
