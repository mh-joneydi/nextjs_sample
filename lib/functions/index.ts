import Cookie from './cookie';
import Guardian from './guardian';

export const mapkeys = <ObjectType extends object, KeyName extends keyof ObjectType>(array: ObjectType[], key: KeyName): { [prop: string]: ObjectType }=> {
    const entries = array.map( item=> [ item[key], item ] );
    return Object.fromEntries(entries);
}
export const removeCommas = (stringText: string): string=> stringText.toString()?.split(',')?.join('');
export const splitAmount = (stringText: string): string=> {
    return removeCommas(stringText).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}
export const {deleteAllCookies, deleteCookie, getCookie, setCookie} = Cookie ;
export const {decrypt, encrypt} = Guardian;