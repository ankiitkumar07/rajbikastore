import { Address } from './address.model';
import { Cart } from './cart.model';

export class User {
    id?: string;
    displayName: string;
    email: string;
    phoneNum: number;
    photoUrl?: string;
    address?: Address;
    cartItems?: Cart[]
    isAdmin: boolean = false;
    isSuperAdmin: boolean = false;
    isInvetoryManager: boolean = false;
    inventoryLocation?: string = null;
}
