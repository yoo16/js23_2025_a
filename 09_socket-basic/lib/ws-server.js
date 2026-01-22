// TODO: WebSocketServerインポート
import { WebSocketServer } from 'ws';
import crypto from 'crypto';

export default (port, origin) => {
    // TODO: WebSocketサーバー起動: new WebSocketServer()
    const wss = new WebSocketServer({ port, origin });

    // TODO: クライアント接続: connection イベント
    wss.on('connection', (ws) => {
        // TODO: WebSocketにIDを付与
        ws.id = crypto.randomUUID();
        const dateString = new Date().toLocaleTimeString();

        // TODO: 接続時にメッセージ送信（システムメッセージ）
        ws.send(JSON.stringify({
            socketId: ws.id,
            message: "wsサーバーに接続しました",
            date: dateString
        }));

        // TODO: メッセージ受信: message イベント
        ws.on('message', (buffer) => {
            // 全クライアントに送信
            wss.clients.forEach(client => {
                if (client.readyState === 1) {
                    const data = JSON.stringify({
                        socketId: ws.id,
                        message: buffer.toString(),
                        date: dateString
                    });
                    // TODO: クライアントにデータ送信: send()
                    client.send(data)
                }
            });
        });

        // TODO: 切断: close イベント
        ws.on('close', () => {
            // 全クライアントに送信
            wss.clients.forEach(client => {
                if (client.readyState === 1) {
                    const data = JSON.stringify({
                        socketId: ws.id,
                        message: "wsサーバーから切断しました",
                        date: dateString
                    });
                    // TODO: クライアントにデータ送信: send()
                    client.send(data)
                }
            });
        });
    });
};