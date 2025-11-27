import { pool } from './lib/db.js';

// 投稿内容
const content = 'こんにちは';
try {
    // TODO: users テーブルからランダムに1件取得
    const userSQL = `SELECT id FROM users
                        ORDER BY RAND()
                        LIMIT 1;`;
    // クエリ実行
    const [userRows] = await pool.query(userSQL);
    // users.id を取得
    const userId = userRows[0].id;

    // TODO: feeds テーブルに新しいレコードを追加
    const feedSQL = ``;
    const [rows] = await pool.query(feedSQL);

    console.table(rows);
} catch (error) {
    console.error('Error executing query:', error);
} finally {
    // DB切断
    pool.end();
}