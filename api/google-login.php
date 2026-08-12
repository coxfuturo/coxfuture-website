<?php

session_start();

require_once __DIR__ . '/../vendor/autoload.php';

$config = require __DIR__ . '/../config.php';

$client = new Google\Client();

$client->setClientId($config['google_client_id']);
$client->setClientSecret($config['google_client_secret']);
$client->setRedirectUri($config['google_redirect_uri']);

$client->setAccessType('offline');
$client->setPrompt('consent');
$client->setIncludeGrantedScopes(true);

$client->setScopes([
    'https://www.googleapis.com/auth/business.manage',
    'openid',
    'email',
    'profile'
]);

$authUrl = $client->createAuthUrl();

header('Location: ' . $authUrl);
exit;