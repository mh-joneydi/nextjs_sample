import { decrypt, encrypt } from './guardian';

namespace Cookie {
      /**
       * @param cookieName name of cookie that should be string, like: "example"
       * @param cookieValue value of cookie which can recevie any value
       * @param expireDays? an optional param that number of days to expire
      */
      export function setCookie(cookieName: string, cookieValue: any, expireDays?: number ): void {
        var expires = "";
        if (expireDays) {
          var d = new Date();
          d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
          expires = ";expires=" + d.toUTCString();
        }
        document.cookie = encrypt(cookieName) + "=" + encrypt(JSON.stringify(cookieValue)) + expires + ";path=/";
      }

      /**
       * @param cookieName name of existing cookie
       * @return value of cookie | null
      */
      export function getCookie(cookieName: string) {
        var name = encrypt(cookieName) + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return JSON.parse(decrypt(c.substring(name.length, c.length))) ;
          }
        }
        return null;
      }
      
      /**
       * @param cookieName name of existing cookie
      */
      export function deleteCookie(cookieName: string): void {
        document.cookie = `${encrypt(cookieName)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }

      /**
       * @description delete all cookies
       */
      export function deleteAllCookies(): void {
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            document.cookie = `${ca[i]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
      }
}

export default Cookie;
export const { deleteCookie, setCookie, getCookie, deleteAllCookies } = Cookie;