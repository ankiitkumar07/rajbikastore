
export class UserProfileData {
    constructor(
        public displayName: string,
        public phoneNum: string,
        public photoUrl: string = null,
        public completed: boolean = false
    ) { }
}