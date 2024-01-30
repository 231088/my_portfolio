const isIPad = /iPad|Macintosh|iPhone|iPod|Android/i.test(navigator.userAgent) && 'ontouchend' in document


if (isIPad) {
    const cover = document.getElementById('screenCover');
    //配下のunsupportedMessageクラスを表示する
    cover.getElementsByClassName('unsupportedMessage')[0].style.display = 'block';
} else {
    const cover = document.getElementById('screenCover');
    //配下のstartButtonクラスを表示する
    cover.getElementsByClassName('startButton')[0].style.display = 'block';
}


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

window.onload = function () {


    //キャンバスをグレーで塗りつぶす
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //辺の長さ
    let block_size;
    //対角線の長さの半分
    let half_diagonal;

    //左から進んだ距離
    let traveledLength = 0;

    //マウス移動時のイベントをBODYタグに登録する
    document.body.addEventListener("mousemove", async function (e) {
        //0.1秒待つ
        await new Promise(resolve => setTimeout(resolve, 10));

        //座標を取得する
        var mX = e.pageX; //X座標
        var mY = e.pageY; //Y座標

        traveledLength = mX;

        //辺の長さを定義
        block_size = canvas.width / 10;
        //対角線の長さの半分を定義
        half_diagonal = block_size / 2 * Math.sqrt(2);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // キャンバスをグレーで塗りつぶす
        ctx.fillStyle = "gray";
        ctx.fillRect(0, mY + block_size / 2, canvas.width, canvas.height - mY - block_size / 2);


        //正方形を描く
        ctx.beginPath();
        ctx.fillStyle = "pink";

        //traveledLengthから四角形の中心までのx距離
        let test = traveledLength % (block_size) + (block_size / 2);

        //traveledLengthから正方形が四周するまでの距離を基準として、現在の進み具合をパーセンテージで表す
        let parsentage = (test - (block_size / 2)) / (block_size * 4);

        //正方形の初期角度から、進み具合分の角度を引いて、現在の角度を求める
        let currentAngle = function (angle) {
            return (angle - parsentage * 360) * (Math.PI / 180);
        }


        //現在の角度から点のx座標を求める
        let currentX = function (angle) {
            return Math.cos(currentAngle(angle)) * half_diagonal + traveledLength;
        }

        //床から四角形中央までのyの距離を求める
        function centerY(x) {
            let parsentage = (x - block_size) / block_size;
            return Math.sqrt(((half_diagonal) ** 2) - ((parsentage * block_size) ** 2));
        }

        //現在の角度から点のy座標を求める
        let currentY = function (angle) {
            return - (Math.sin(currentAngle(angle)) * half_diagonal + centerY(test));
        }


        //正方形の描画
        ctx.lineTo(currentX(45), currentY(45) /*高さをマウス位置分足す*/ + (mY + block_size / 2));
        ctx.lineTo(currentX(135), currentY(135) + (mY + block_size / 2));
        ctx.lineTo(currentX(225), currentY(225) + (mY + block_size / 2));
        ctx.lineTo(currentX(315), currentY(315) + (mY + block_size / 2));
        ctx.closePath();
        ctx.fill();

    });

}

const onResize = function () {
    console.log('resize');

    const canvas = document.getElementById('canvas');
    console.log(canvas.height, canvas.clientHeight, window.innerHeight);

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
};
window.addEventListener('DOMContentLoaded', onResize);
window.addEventListener('resize', onResize);

async function openCurtain() {
    const cover = document.getElementById('screenCover');
    cover.classList.add('open');
}

document.oncontextmenu = function () {
    //cursor-offクラスを付与・解除することで、カーソルの表示・非表示を切り替える
    document.body.classList.toggle('cursor-off');
    const links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
        links[i].classList.toggle('cursor-off');
    }
    return false;
}

function shadowAreaClose() {
    const shadowArea = document.getElementById('info-shadow-area');
    document.body.classList.toggle('cursor-off');
    shadowArea.classList.toggle('cursor-off');
    //直下の子要素をすべて取得する
    const children = shadowArea.children;
    console.log(children.length);
    //子要素のvisibilityをhiddenにする
    for (let i = 0; i < children.length; i++) {
        children[i].style.display = 'none';
    }
    //自身もhiddenにする
    shadowArea.style.display = 'none';
}

//windowに対して、クリックイベントを登録する
window.addEventListener('click', clickEvent, false);

function clickEvent(e) {
    //クリックされた要素を取得する
    const target = e.target;
    //クリックされた要素のID名を取得する
    const targetId = target.id;

    if (targetId == 'info-shadow-area') {
        shadowAreaClose();
    }
}

function openInfo(className = null) {
    if (className === null) {
        return;
    } else if (className === 'self-introduction') {
        const shadowArea = document.getElementById('info-shadow-area');
        shadowArea.style.display = 'flex';
        shadowArea.classList.toggle('cursor-off');
        const selfIntroduction = shadowArea.getElementsByClassName('self-introduction')[0];
        selfIntroduction.style.display = 'flex';
    } else if (className === 'skills') {
        const shadowArea = document.getElementById('info-shadow-area');
        shadowArea.style.display = 'flex';
        shadowArea.classList.toggle('cursor-off');
        const skill = shadowArea.getElementsByClassName('skills')[0];
        skill.style.display = 'flex';
    } else if (className === 'products') {
        const shadowArea = document.getElementById('info-shadow-area');
        shadowArea.style.display = 'flex';
        shadowArea.classList.toggle('cursor-off');
        const products = shadowArea.getElementsByClassName('products')[0];
        products.style.display = 'flex';
    }
    document.body.classList.toggle('cursor-off');
}
