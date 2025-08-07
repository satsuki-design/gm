<?php
// エラー表示設定（開発時のみ）
error_reporting(E_ALL);
ini_set('display_errors', 1);

// セッション開始
session_start();

// POSTデータの取得と検証
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 入力データの取得
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $website = trim($_POST['website'] ?? '');
    $message = trim($_POST['message'] ?? '');
    
    // エラー配列
    $errors = [];
    
    // バリデーション
    if (empty($name)) {
        $errors[] = 'お名前は必須項目です。';
    }
    
    if (empty($email)) {
        $errors[] = 'メールアドレスは必須項目です。';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'メールアドレスの形式が正しくありません。';
    }
    
    if (empty($website)) {
        $errors[] = 'Webサイト（SNSなど）は必須項目です。';
    }
    
    if (empty($message)) {
        $errors[] = 'メッセージ本文は必須項目です。';
    }
    
    // エラーがない場合の処理
    if (empty($errors)) {
        // メール送信処理（実際の環境に合わせて調整）
        $to = 'your-email@example.com'; // 受信用メールアドレス
        $subject = 'お問い合わせフォームからのメッセージ';
        $body = "お問い合わせフォームから新しいメッセージが届きました。\n\n";
        $body .= "お名前: " . $name . "\n";
        $body .= "メールアドレス: " . $email . "\n";
        $body .= "Webサイト（SNSなど）: " . $website . "\n";
        $body .= "メッセージ本文:\n" . $message . "\n";
        
        $headers = "From: " . $email . "\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        // メール送信（実際の環境では適切な設定が必要）
        if (mail($to, $subject, $body, $headers)) {
            // 送信成功時はサンクスページにリダイレクト
            header('Location: thanks.html');
            exit;
        } else {
            $errors[] = 'メールの送信に失敗しました。しばらく時間をおいて再度お試しください。';
        }
    }
    
    // エラーがある場合はセッションに保存してフォームに戻る
    if (!empty($errors)) {
        $_SESSION['errors'] = $errors;
        $_SESSION['form_data'] = $_POST;
        header('Location: contact.html');
        exit;
    }
} else {
    // GET リクエストの場合はフォームページにリダイレクト
    header('Location: contact.html');
    exit;
}
?>
