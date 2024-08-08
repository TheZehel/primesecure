import JSEncrypt from 'jsencrypt';

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2PaexvylfZvxKclEs1OQ
MT9Ip+mI7VYWrh3P0JahFmf/j+7/nhCnY063iImITtuFPCQ+NQT3kZjtwkU0D9Ah
Pbq28Mb1V1SiX8VJcX5/0/7xeGecyQg+5e8sSeEj5WQXH5daRXroEHjVeYP0sKvH
w3O7CrRVrCei7hg0CiXWqeNIRjTAZ+cPOC38OBTvgvl5ZUFsBxRi9qRzlQ6gb0OX
ndrmz/PUH4k8tfOzreeE6V2k1REC3qEAi+Bxalp1R4sUDW0AUvCD599MB+D/Gi+x
H5cRC3XhsedaDsRLViu/d/I+jmqQcTdNKe2ywuFvmYQdcnNMD0hkkB6FK/8t5Mlr
UwIDAQAB
-----END PUBLIC KEY-----
`;

var jsEncrypt = new JSEncrypt();

export default class CryptoFunctions extends Object {
    constructor(){
        super();
    }

    encryptData(data, key){
        jsEncrypt.setPublicKey(key);
        return jsEncrypt.encrypt(data);
    }
}