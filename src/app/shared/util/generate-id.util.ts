export default class GenerateId {

    static getUniqueId(length: number): string {
        var result = '';
        var char =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = char.length;
        for ( var i = 0; i < length; i++ ) {
            result += char.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}