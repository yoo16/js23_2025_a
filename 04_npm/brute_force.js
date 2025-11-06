const bcrypt = require('bcrypt');

// 既存のハッシュ値
const hash = '$2b$10$DZfvGBqDyS2TVal7PfxpreZMIyG7OWu4ocUodf3FhfYtJmasfujYq';

// スタートパスワード
let password = '10000';

// フラグは let
let isAuth = false;

while (!isAuth) {
    password = (parseInt(password) - 1).toString().padStart(4, '0');
    console.log(`試行中のパスワード: ${password}`);
    isAuth = bcrypt.compareSync(password, hash);
    if (isAuth) break;

    if (password === '10000') {
        console.log("一致するものが見つかりませんでした");
        process.exit(0);
    }
}

console.log('平文とハッシュの比較結果:');
console.table({ password, hash, isAuth });
