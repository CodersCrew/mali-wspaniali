export function getCookie(name: string) {
    return document.cookie.split(';').filter(cookie => {
        const [k] = cookie.split('=');

        return k.trim() === name;
    })[0];
}
export function setCookie(name: string, value: string) {
    document.cookie = `${name}=${value}`;
}
