import { pool } from './lib/db.js';


try {
    // TODO: users テーブルから 5 件取得
    let sql = "SELECT * FROM users LIMIT 5;"

    sql = "SELECT name, email FROM users LIMIT 5;"

    // TODO: users テーブルのレコードの件数を取得
    sql =  "SELECT COUNT(id) AS user_count FROM users;"

    // TODO: users テーブルから email が user1@test.com のユーザーを取得

    // TODO: users テーブルから name に mr を含むユーザーを取得

    // TODO: SQL 実行: 非同期処理
    const [rows] = await pool.query(sql)

    // 表示
    console.table(rows);
} catch (error) {
    console.error('Error executing query:', error);
} finally {
    // DB切断
    pool.end();
}