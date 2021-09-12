namespace Guardian {
     const key = (
         ((new Date()).getTimezoneOffset()/60)+
         window.screen.width+
         navigator.product+
         window.screen.height+
         navigator.language+
         window.screen.colorDepth+
         navigator.platform+
         window.screen.pixelDepth+
         navigator.userAgent
    );

    export function encrypt(text: string, revert: boolean = false):string {
        if(text===null) return '' ;
        var newText = '' ;
        for(var i = 0 ; i<text.length ; i++) {
            newText += String.fromCharCode(text.charCodeAt(i)+(revert?key.charCodeAt(Math.abs(key.length-i)%key.length):key.charCodeAt(i%key.length)));
        }
        return (btoa(encodeURIComponent(newText)));
    }
    
    export function decrypt(text: string, revert: boolean = false):string {
        if(text==null) return '' ;
        text = decodeURIComponent(atob(text));
        var newText = '' ;
        for(var i = 0 ; i<text.length ; i++) {
            newText += String.fromCharCode(text.charCodeAt(i)-(revert?key.charCodeAt(Math.abs(key.length-i)%key.length):key.charCodeAt(i%key.length)));
        }
        return newText ;
    }
}

export default Guardian;
export const { encrypt, decrypt } = Guardian;