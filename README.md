# 新卒向けイベントでのRoo Code体験用サンプルアプリ

## 概要
Roo Codeを使って簡単なTODOアプリ＋チャット機能を作成するデモ用のリポジトリです。

## 事前準備
1. VSCodeのインストール
2. 拡張機能から「Roo Code」のインストール
3. Nodeのインストール(v22.13.1)
4. `.env.local`の作成
    1. `.env.local.sample`をリネーム
    2. `OPENAI_API_KEY`については、後ほどお伝えします。
5. ターミナルで`npm install`を実行

## Roo Codeのセットアップ
1. 設定(歯車)からプロバイダーのタブを選択
2. APIプロバイダーに「OpenAI」を選択
3. OpenAI APIキーにお伝えしたAPIキーを設定
4. モデルは「o4-mini-high」を選択

※その他の設定はそのままでOK
利用する中で自動承認の領域を広げてみてください。
