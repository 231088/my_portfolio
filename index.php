
<?php
    $name = "";
    $selfIntroduction = "";
    $products = "";
    $productsLink = "";
    // プロフィール情報を取得
    include('../private/myProfile.php');
    
?>
<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- リセットCSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/destyle.css@1.0.15/destyle.css" />

    <link rel="stylesheet" href="./style.css">
    <?php
        echo "<title>{$name}のポートフォリオ</title>";
    ?>
</head>

<body class="cursor-off">
    <!-- マウス位置取得のために最初にボタンを押させています -->
    <div id="screenCover">
        <button class="startButton" onclick="openCurtain()">START</button>
        <p class="unsupportedMessage">このサイトはPC以外に対応していません</p>
    </div>

    <!-- ページ本体 -->
    <main>
        <?php
            echo "<h1>{$name}のポートフォリオ</h1>";
        ?>
        <nav class="navigation">
            <button class="cursor-off" onclick="openInfo('self-introduction')"><span>自己紹介</span></button>
            <button class="cursor-off" onclick="openInfo('products')"><span>成果物</span></button>
            <button class="cursor-off" onclick="openInfo('skills')"><span>スキル</span></button>
        </nav>

        <!-- 情報表示エリア -->
        <div id="info-shadow-area" class="cursor-off">
            <!-- 自己紹介 -->
            <div class="info-content self-introduction">
                <h2 id="about">簡単な自己紹介</h2>
                <?php
                    echo "{$selfIntroduction}";
                ?>
                <button class="close-button" onclick="shadowAreaClose()">閉じる</button>
            </div>

            <!-- 成果物 -->
            <div class="info-content products">
                <h2 id="products">成果物</h2>
                <?php
                    echo "{$products}";
                ?>
                <button class="close-button" onclick="shadowAreaClose()">閉じる</button>
            </div>

            <!-- スキル -->
            <div class="info-content skills">
                <h2 id="skills">スキル</h2>
                <?php
                    echo "{$skills}";
                ?>
                <button class="close-button" onclick="shadowAreaClose()">閉じる</button>
            </div>
        </div>

        <p class="description">右クリックでカーソル表示できます</p>
    </main>

    <!-- 四角形表示 -->
    <canvas id="canvas"></canvas>

    <script src="./index.js"></script>
</body>

</html>