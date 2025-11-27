import { pool } from './lib/db.js';

try {
    // TODO: SQL: feeds テーブルから最新の1件を削除
    const sql = ``;
    // TODO: SQL 実行
    const [rows] = await pool.query(sql);

    // TODO: 結果表示
    console.table(rows);
} catch (error) {
    console.error('Error executing query:', error);
} finally {
    // DB切断
    pool.end();
}