<?php
header('Cache-Control: no-cache');

$title  = '#NAME# - #VER#';
$desc   = '#DESC#';
$ver    = '#VER#';
$author = 'a5x.eu';

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" href="./favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title><?= $title ?></title>
  <meta name="description" content="<?= $desc ?>" />
  <meta name="author" content="<?= $author ?>">

  <link rel="stylesheet" href="./assets/fonts/fonts.css">
  <link rel="stylesheet" href="./assets/fonts/sysicons.css">

  <script type="module" crossorigin src="./assets/index.<?= $ver ?>.js"></script>
  <link rel="modulepreload" href="./assets/vendor.<?= $ver ?>.js">
  <link rel="stylesheet" href="./assets/index.<?= $ver ?>.css">
</head>

<body translate="no">
</body>

</html>
