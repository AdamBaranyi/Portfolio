<?php
// Contact form handler — receives the form data and sends it as an email.
// Configure the recipient address below before going live.

header('Content-Type: application/json');

// ─── Configuration ───────────────────────────────────────────────
$recipient = 'kontakt@adambaranyi.xyz';          // local mailbox, forwarded to iCloud via a cPanel forwarder
$fromAddress = 'no-reply@adambaranyi.xyz';       // must be a real mailbox on your own domain (SPF)
// ─────────────────────────────────────────────────────────────────

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Collect and trim the fields
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');
$privacy = $_POST['privacy'] ?? '';

// Server-side validation (never trust the client)
$errors = [];
if ($name === '') {
    $errors[] = 'name';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'email';
}
if ($message === '') {
    $errors[] = 'message';
}
if ($privacy !== 'on' && $privacy !== 'true' && $privacy !== '1') {
    $errors[] = 'privacy';
}

if ($errors) {
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => 'validation', 'fields' => $errors]);
    exit;
}

// Strip line breaks from header-bound values to prevent header injection
$safeName  = str_replace(["\r", "\n"], ' ', $name);
$safeEmail = str_replace(["\r", "\n"], ' ', $email);

$subject = "New contact message from $safeName";
$body =
    "Name: $safeName\n" .
    "Email: $safeEmail\n\n" .
    "Message:\n$message\n";

$headers =
    "From: $fromAddress\r\n" .
    "Reply-To: $safeEmail\r\n" .
    "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($recipient, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'send_failed']);
}
