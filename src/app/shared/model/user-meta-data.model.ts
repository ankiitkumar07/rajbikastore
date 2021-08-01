export class UserMetaData {
    constructor(
        public admin: boolean = false,
        public superAdmin: boolean = false,
        public inventoryManager: boolean = false,
        public createdAt: Date = new Date(),
        public emailVerified: boolean = false, 
        public phoneVerified: boolean = false
    ) { }

    // get admin() {
    //     return this._admin
    // }

    // get superAdmin() {
    //     return this._superAdmin
    // }

    // get inventoryManager() {
    //     return this._inventoryManager
    // }
}