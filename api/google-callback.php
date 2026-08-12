<?php

session_start();

require_once __DIR__ . '/../vendor/autoload.php';

$config = require __DIR__ . '/../config.php';

if (!isset($_GET['code'])) {
    exit('Google authorization failed: no authorization code received.');
}

$client = new Google\Client();

$client->setClientId($config['google_client_id']);
$client->setClientSecret($config['google_client_secret']);
$client->setRedirectUri($config['google_redirect_uri']);

$token = $client->fetchAccessTokenWithAuthCode($_GET['code']);

if (isset($token['error'])) {
    echo '<h2>Google OAuth Error</h2>';
    echo '<pre>';
    print_r($token);
    echo '</pre>';
    exit;
}

$_SESSION['google_access_token'] = $token;

echo '<h2>Google authorization successful!</h2>';
echo '<p>Your Google account is now connected.</p>';