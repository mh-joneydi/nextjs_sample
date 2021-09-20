import globalStorageItems from 'utility/constants/globalStorageItems';

type TKey = keyof typeof globalStorageItems;

namespace globalStorage { 

    export function getItem(key: TKey) {
        let item: any = localStorage.getItem(key);
        if(!item) return null;
        item = JSON.parse(item);
        if( typeof item === 'object' && '_expire' in item) {
            if(item._expire < Date.now()) {
                globalStorage.removeItem(key);
                return null;
            }
            return item.data
        }
        return item;
    }
    
    export function setItem(key: TKey, value: any, _expireDays?: number) {

        if(_expireDays && _expireDays>0){
            value = {
                _expire: ( _expireDays * 24 * 60 * 60 * 1000 ) + Date.now(),
                data: value
            }
        }

        localStorage.setItem( key, JSON.stringify(value) );
    }
    
    export function removeItem(key: TKey) {
        localStorage.removeItem(key)
    }
    
    export function key(index: number) { return localStorage.key(index) };
    export function clear(){ localStorage.clear() } ;
    export function getLength() { return localStorage.length };

}

export default globalStorage;