// dotenv インポート(ESM)
import dotenv from 'dotenv';
// path モジュールのインポート
import path from 'path';
// TODO: express インポート(ESM)
import express from 'express';
// models/Product.js から関数をインポート
import {
    fetchProducts,
    findProductById,
    searchProducts,
} from './models/Product.js';

// 環境変数の取得（デフォルト値も設定）
dotenv.config();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const BASE_URL = `http://${HOST}:${PORT}/`

// 現在のディレクトリパスを取得
const __dirname = path.resolve();

// サーバーステータスの表示
const status = { HOST, PORT, BASE_URL, __dirname };
console.log(status);

// TODO: Expressアプリケーションの初期化
const app = express()

// ミドルウェア設定
// どのリクエストでも実行されるミドルウェア
app.use((req, res, next) => {
    console.log(`ミドルウェア: ${req.method} ${req.url}`);
    next();
});

// TODO: JSONボディパーサー
// app.use(express.json());

// TODO: URLエンコード: www-form-urlencoded ボディパーサー
// app.use(express.urlencoded({ extended: true }));

// TODO: 静的ファイルの公開: /public
app.use(express.static(__dirname + '/public'));

// ------------------------
// ルーティング
// ------------------------
// TODO: GET /test
app.get('/test', (req, res) => {
    console.log("ルーティング: /test");
    const message = 'Hello, Express!';
    res.send(message);
});

// TODO: GET,POST,DELETE... /info
app.all('/info', (req, res) => {
    console.log("ルーティング: /info");
    const message = 'なんでもOK!';
    res.send(message);
});

// TODO: POST /save
app.post('/save', (req, res) => {
    console.log("ルーティング: /save");
    const message = 'データ保存OK!';
    res.send(message);
});


// TODO: GET /
// /public/home.html
app.get('/', (req, res) => {
    console.log("ルーティング: /");
    // HTMLファイルのパスを指定
    const path = __dirname + '/public/home.html'
    res.sendFile(path);
});

// TODO: GET /about
// /public/about.html
app.get('/about', (req, res) => {
    console.log("ルーティング: /about");
    // HTMLファイルのパスを指定
    const path = __dirname + '/public/about.html'
    res.sendFile(path);
});

// TODO: GET /search  => keyword クエリパラメータ対応
// /public/home.html
app.get('/search', (req, res) => {
    console.log("ルーティング: /search");
    // クエリパラメータで keyword 取得
    const keyword = req.query.keyword
    console.log(keyword);
    // HTMLファイルのパスを指定
    const path = __dirname + '/public/home.html'
    res.sendFile(path);
});

// TODO GET /product/:id  => id パスパラメータ対応
// /public/product.html
// http://localhost:3000/product/123
app.get('/product/:id', (req, res) => {
    console.log("ルーティング: /product/:id");
    // パスパラメータで id 取得
    const id = req.params.id
    console.log(id);

    // HTMLファイルのパスを指定
    const path = __dirname + '/public/product.html'
    res.sendFile(path);
});

// APIルーティング
// TODO: GET /api/product/list
app.get('/api/product/list', (req, res) => {
    console.log("ルーティング: /api/product/list");
    // 商品データを取得
    const products = fetchProducts()
    // JSONレスポンスを送信
    res.json({ products })
});

// TODO: GET /api/product/show/xxx
app.get('/api/product/show/:id', (req, res) => {
    console.log("ルーティング: /api/product/show/:id");
    // パスパラメータから商品IDを取得
    const id = req.params.id
    // 商品データを取得
    const product = findProductById(id)
    // JSONレスポンスを送信
    res.json(product)
});

// TODO: GET /api/search?keyword=xxx
app.get('/api/search', (req, res) => {
    console.log("ルーティング: /api/search");
    // クエリパラメータで keyword 取得
    const keyword = req.query.keyword
    // keyword を使って商品を検索
    const products = searchProducts(keyword)
    // JSONレスポンスを送信
    res.json({ products })
});

// TODO: GET /api/product/csv_download
app.get('/api/product/csv_download', (req, res) => {
    console.log("ルーティング: /api/product/csv_download");
    // CSVファイルのパス
    const filePath = __dirname + '/data/products.csv';
    // ファイルをダウンロード
    res.download(filePath)
});

// TODO: Express 起動
app.listen(PORT, HOST, () => {
    console.log(`Server running: ${BASE_URL}`);
});