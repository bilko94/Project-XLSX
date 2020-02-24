import * as crypto from 'crypto-js';

export class vaultClass {
    encrypt(string, pass) {
        var cipher = crypto.AES.encrypt(string, pass);
        cipher = cipher.toString();
        return cipher;
    }
    decrypt(string, pass) {
        var decipher = crypto.AES.decrypt(string, pass);
        decipher = decipher.toString(crypto.enc.Utf8);
        return decipher;
    }
    validate(message, users) {
        try {
            if ( JSON.parse(message) ){
                let i = users.length;
                let parsedMessage = JSON.parse(message);
                console.log("Parsedmessage user "+parsedMessage.user);
                while(i--)
                    if (users[i].username === parsedMessage.user){
                        let decrypted = this.decrypt( parsedMessage.data, users[i].password);
                        try {
                            let result = JSON.parse(decrypted);
                            return {
                                status:"valid",
                                recipient: users[i],
                                request: result
                            };
                        } catch { return({status:"passErr"}); }
                    }
            }
        } catch { return({status:"passErr/formErr"}); }
    }

    package(data, recipient) {
        let stringData = JSON.stringify(data);
        let encryptedData = this.encrypt(stringData, recipient.password);
        let message = {
            user: recipient.username,
            data: encryptedData
        }
        return ( JSON.stringify(message) );
    }
}