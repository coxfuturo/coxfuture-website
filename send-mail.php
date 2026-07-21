<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';

header('Content-Type: text/plain');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit('failed');
}

// -----------------------------
// Sanitize Inputs
// -----------------------------
$name = htmlspecialchars(trim($_POST['name'] ?? ''));
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
$service = htmlspecialchars(trim($_POST['service'] ?? ''));
$message = htmlspecialchars(trim($_POST['message'] ?? ''));

// -----------------------------
// Validation
// -----------------------------
if (
    empty($name) ||
    empty($email) ||
    empty($service) ||
    empty($message)
) {
    exit("failed");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    exit("failed");
}

// -----------------------------
// Admin Mail
// -----------------------------
$mail = new PHPMailer(true);

try {

    $mail->isSMTP();
    $mail->Host = "smtp.hostinger.com";
    $mail->SMTPAuth = true;
    $mail->Username = "info@coxfuture.com";
    $mail->Password = "Coxfuture@9217";
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
    $mail->CharSet = "UTF-8";
    $mail->setFrom("info@coxfuture.com", "CoxFuture Website");
    $mail->addAddress("info@coxfuture.com");
    $mail->addReplyTo($email, $name);
    $mail->isHTML(true);
    $mail->Subject = "New Website Enquiry";
    $mail->Body = "
    <h2>New Contact Form</h2>
    <table border='1' cellpadding='10' cellspacing='0'>
        <tr>
            <th>Name</th>
            <td>$name</td>
        </tr>
        <tr>
            <th>Email</th>
            <td>$email</td>
        </tr>
        <tr>
            <th>Phone</th>
            <td>$phone</td>
        </tr>

        <tr>
            <th>Service</th>
            <td>$service</td>
        </tr>

        <tr>
            <th>Message</th>
            <td>$message</td>
        </tr>
    </table>
    ";

    $mail->send();

    // =============================
    // Customer Auto Reply
    // =============================

    $reply = new PHPMailer(true);
    $reply->isSMTP();
    $reply->Host = "smtp.hostinger.com";
    $reply->SMTPAuth = true;
    $reply->Username = "info@coxfuture.com";
    $reply->Password = "Coxfuture@9217";
    $reply->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $reply->Port = 465;
    $reply->CharSet = "UTF-8";
    $reply->setFrom("info@coxfuture.com", "CoxFuture Technologies");
    $reply->addAddress($email, $name);
    $reply->isHTML(true);
    $reply->Subject = "Thank You For Contacting CoxFuture Technologies";
    $reply->Body = "
    <!DOCTYPE html>
    <html>
    <body style='margin:0;padding:40px;background:#f4f7fb;font-family:Arial,sans-serif;'>
        <div style='max-width:650px;margin:auto;background:#ffffff;border-radius:10px;padding:40px;'>
            <h2 style='color:#0d6efd;margin-top:0;'>
                Hello {$name},
            </h2>
            <p>
                Thank you for contacting
                <strong>CoxFuture Technologies</strong>.
            </p>
            <p>
                We have successfully received your enquiry regarding
                <strong>{$service}</strong>.
            </p>
            <p>
                Our team will review your request and contact you as soon as possible.
            </p>
            <br>
            <p>
                Regards,
            </p>
            <strong>
                CoxFuture Technologies
            </strong>
        </div>
    </body>
    </html>
    ";

    $reply->send();

    echo "success";

} catch (Exception $e) {

    echo "failed";

}

exit;