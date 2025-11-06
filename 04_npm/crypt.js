// TODO: カスタム暗号化モジュールのインポート: ./utils/cryptoUtil
// メソッド: encrypt, decrypt, generateKey
// req で入力補完
const { encrypt, decrypt, generateKey } = require('./utils/cryptoUtil');

const message = "Hello";
// 鍵の生成
const key = generateKey("mySecretKey");
// TODO: メッセージを暗号化
const encrypted = encrypt(message, key);
// TODO: 暗号文を復号化
const decrypted = decrypt(encrypted, key);

// 結果表示
let result = { message, encrypted, decrypted };
console.table(result);