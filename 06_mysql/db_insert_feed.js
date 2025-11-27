import { pool } from './lib/db.js';

// 投稿内容
const content = 'こんにちは';
try {
    // TODO: users テーブルからランダムに1件取得
    const userSQL = ``;
    const [userRows] = await pool.query(userSQL);
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