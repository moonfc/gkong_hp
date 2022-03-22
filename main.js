'use strict';
//--headerハンバーガー---
function toggleNav() {
  var body = document.body;
  var hamburger = document.getElementById('js-hamburger');
  var blackBg = document.getElementById('js-black-bg');

  hamburger.addEventListener('click', function() {
    body.classList.toggle('menu-open');
  });
  blackBg.addEventListener('click', function() {
    body.classList.remove('menu-open');
  });
}
toggleNav();

//--ページ内リンクスクロールで移動させる-----
window.addEventListener('DOMContentLoaded', () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const anchorLinksArr = Array.prototype.slice.call(anchorLinks);

  anchorLinksArr.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.hash;
      const targetElement = document.querySelector(targetId);
      const targetOffsetTop = window.pageYOffset + targetElement.getBoundingClientRect().top;
      window.scrollTo({
        top: targetOffsetTop,
        behavior: "smooth"
      });
    });
  });
});


//--heroエリア下のスクロール表示------
const accordions = document.querySelectorAll('.list-item');

accordions.forEach(accordion => {
  accordion.addEventListener('click', () => {
    const content = accordion.querySelector('.list-content');

    content.classList.toggle('active');

    if(content.classList.contains('active')) {
      content.style.height = content.scrollHeight + 'px';
    } else {
      content.style.height = '0px';
    }

  });
});


//--Aboutエリア背景の設定----------------
particlesJS('hoge',{
  "particles":{
 
//--シェイプの設定----------
      "number":{
        "value":500, //シェイプの数
        "density":{
          "enable":true, //シェイプの密集度を変更するか否か
          "value_area":1500 //シェイプの密集度
        }
      },
      "shape":{
        "type":"circle", //シェイプの形（circle:丸、edge:四角、triangle:三角、polygon:多角形、star:星型、image:画像）
        "stroke":{
          "width":0, //シェイプの外線の太さ
          "color":"#ffcc00" //シェイプの外線の色
        },
      },
      "color":{
        "value":"#ffffff" //シェイプの色
      },
      "opacity":{
        "value":0.2, //シェイプの透明度
        "random":false, //シェイプの透明度をランダムにするか否か
        "anim":{
          "enable":false, //シェイプの透明度をアニメーションさせるか否か
          "speed":3, //アニメーションのスピード
          "opacity_min":0.1, //透明度の最小値
          "sync":false //全てのシェイプを同時にアニメーションさせるか否か
        }
      },
      "size":{
        "value":1, //シェイプの大きさ
        "random":true, //シェイプの大きさをランダムにするか否か
        "anim":{
          "enable":false, //シェイプの大きさをアニメーションさせるか否か
          "speed":3, //アニメーションのスピード
          "size_min":0.1, //大きさの最小値
          "sync":false //全てのシェイプを同時にアニメーションさせるか否か
        }
      },
//--------------------

//--線の設定----------
      "line_linked":{
        "enable":true, //線を表示するか否か
        "distance":150, //線をつなぐシェイプの間隔
        "color":"#ffffff", //線の色
        "opacity":0.2, //線の透明度
        "width":1 //線の太さ
      },
//--------------------

//--動きの設定----------
      "move":{
        "speed":3, //シェイプの動くスピード
        "straight":false, //個々のシェイプの動きを止めるか否か
        "direction":"none", //エリア全体の動き(none、top、top-right、right、bottom-right、bottom、bottom-left、left、top-leftより選択)
        "out_mode":"out" //エリア外に出たシェイプの動き(out、bounceより選択)
      }
//--------------------

    },
 
    "interactivity":{
      "detect_on":"canvas",
      "events":{

//--マウスオーバー時の処理----------
        "onhover":{
          "enable":true, //マウスオーバーが有効か否か
          "mode":"grab" //マウスオーバー時に発動する動き(下記modes内のgrab、repulse、bubbleより選択)
        },
//--------------------

//--クリック時の処理----------
        "onclick":{
          "enable":false, //クリックが有効か否か
        },
//--------------------

      },
 
      "modes":{

//--カーソルとシェイプの間に線が表示される----------
        "grab":{
          "distance":150, //カーソルからの反応距離
          "line_linked":{
          "opacity":0.2 //線の透明度
          }
        },
//--------------------

      }
    },
    "retina_detect":true, //Retina Displayを対応するか否か
    "resize":true //canvasのサイズ変更にわせて拡大縮小するか否か
  }
);


//--タイポグラフィ------
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};


//--出てくるアニメーション------
document.querySelectorAll(".animation").forEach((el) => {
  gsap.fromTo(
    el,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.5,
      //--スクロールトリガーの登録------
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        ease: "expo",
      },
    }
  );
});
