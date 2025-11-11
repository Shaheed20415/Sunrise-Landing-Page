<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// ✅ Required CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// ✅ Handle preflight OPTIONS request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit(0);
}

// ✅ Read JSON body from React frontend
$input = file_get_contents("php://input");
file_put_contents(__DIR__ . "/debug.txt", $input); // Debug log

$data = json_decode($input, true);

$name = $data["name"] ?? "";
$email = $data["email"] ?? "";

// ✅ Validation
if (!$email) {
    echo json_encode(["success" => false, "message" => "Email is required"]);
    exit;
}

// ✅ Load PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . "/PHPMailer/src/PHPMailer.php";
require __DIR__ . "/PHPMailer/src/Exception.php";
require __DIR__ . "/PHPMailer/src/SMTP.php";

// Create PHPMailer instance
$mail = new PHPMailer(true);

try {
    // ✅ SMTP Settings (Use Gmail App Password)
    $mail->isSMTP();
    $mail->Host = "smtp.gmail.com";   
    $mail->SMTPAuth = true;
    $mail->Username = "bmuhammadshaheed1000@gmail.com";     // Replace with your Gmail
    $mail->Password = "farr uxrl yecg ejrd";       // Replace with Gmail App Password
    $mail->SMTPSecure = "tls";
    $mail->Port = 587;

    // ✅ Email settings
    $mail->setFrom("yourgmail@gmail.com", "Sunrise Marketing Solutions");
    $mail->addAddress($email);

    $mail->isHTML(true);
    $mail->Subject = "Welcome to Sunrise Marketing Solutions";
    $mail->Body = "
        <h2>Hello $name,</h2>
        <p>Thank you for subscribing to Sunrise Marketing Solutions.</p>
        <p>You will now receive updates on real estate projects, offers and investment opportunities.</p>
        <br>
        Regards,<br>
        <b>Sunrise Marketing Solutions</b>
    ";

    // ✅ Send mail
    if ($mail->send()) {
        echo json_encode(["success" => true, "message" => "Email sent successfully!"]);
    }

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Mail error: " . $mail->ErrorInfo]);
}
?>
