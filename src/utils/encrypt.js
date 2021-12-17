import {JSEncrypt} from "jsencrypt";

/**
 * 加密
 * @param data
 * @returns {Promise<ArrayBuffer>}
 */
export function encrypt(data) {
    var publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxELgao+H6YqVLDty5cWj\n' +
        'kVpT5gEXRoMNpAAhu80SbkPsJ9xweAlGm5UZzevT1OdiKg4+ZM2nysk66nvqev6l\n' +
        'oyn+/32uJah9eq1hhjIOVP6Sx1oWBGKTctxv7AitljS+o/NoC+LiY3JgQ+sTSvvN\n' +
        'UJfOWb09Os8qtvxeeXhJnZti8UG4jO2bo+qwTraoK0WS/CEa+VmKg0cX7iNbUKo1\n' +
        'XWIX7NvQgzmzSj8MP/rLI9/hB0vi+0dDFP4ogNizC+R+vx0J95SvZVDM+ZJyD3dQ\n' +
        'KAxCwYar5gJZ22oW0eHjQRFnQ1+SL/0xbXcF6dufK3TwO2lqwx6xsYgvVIlCseKx\n' +
        'PwIDAQAB'
    var encrypts = new JSEncrypt()
    encrypts.setPublicKey(publicKey);
    return encrypts.encrypt(JSON.stringify(data));
}