<!-- JSSDK的调用实例 -->
<?php
require_once "jssdk.php"; //引入JSSDK
//"../jssdk/jssdk.php"; 表示主机根目录下jssdk文件夹内jssdk.php文件

// 这里的参数需要替换！AppID和AppSecret？？？********************************
$jssdk = new JSSDK("wx4ce09cd5c0dcf672", "88fdba0dd51778cde7904e7d7fd9c962");//填写开发者中心你的开发者ID
$signPackage = $jssdk->GetSignPackage(); //调用方法来执行验证
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <!-- 指能适应手机屏幕 -->
  <meta name="viewport" content="width=device-width,initital-scale=1">
  <title>极客学院</title>
</head>
<body>
  <div>
     极客学院开发JSSDK实例讲解分享到朋友圈及分享给朋友
  </div>
</body>
<!-- ********************在需要调用JS接口的页面引入如下JS文件***************** -->
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
  // 通过config接口注入权限验证配置
  wx.config({ // 这里的参数无需替换！！！
    debug: false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，（若很熟悉，则不用开启调试模式，设为false）
                // 若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '<?php echo $signPackage["appId"];?>', //公众号的唯一标识
    timestamp: <?php echo $signPackage["timestamp"];?>, //生成签名的时间戳--->系统自己生成的时间戳
    nonceStr: '<?php echo $signPackage["nonceStr"];?>', //生成签名的随机串
    signature: '<?php echo $signPackage["signature"];?>', //签名，见附录1
    jsApiList: [   //需要使用的网页服务接口,所有要调用的 API 都要加到这个列表中
      'onMenuShareTimeline',
      'onMenuShareAppMessage'
    ]
  }); //debug为true时，弹出{"errMsg":"config:ok"} 说明Config的配置没有问题

  //ready函数用于调用API，如果你的网页在加载后就需要自定义分享和回调功能，需要在此调用分享函数。
  //如果是微信游戏结束后，需要点击按钮触发得到分值后分享，这里就不需要调用API了，可以在按钮上绑定事件直接调用。
  //因此，微信游戏由于大多需要用户先触发获取分值，此处请不要填写如下所示的分享API
  wx.ready(function () {
      // 分享到朋友圈
      wx.onMenuShareTimeline({
        title: '情人节 厄瓜多尔玫瑰免费抢！', 
        link: 'http://rose111.applinzi.com/guirenli/index.php', // 分享链接？？？
        imgUrl: 'http://rose111.applinzi.com/guirenli/images/111.png', // 分享图标
        success: function () {
             window.totalAmount=window.totalAmount + 500 ; 
             window.View.saveStorage(5,window.totalAmount); 
             window.countTotalAmount.text(window.totalAmount);
        },
        cancel: function () { 
            // alert("分享失败");
        }
      });
      //分享给朋友
      wx.onMenuShareAppMessage({
        title: '情人节 厄瓜多尔玫瑰免费抢！', 
        desc: '贵人礼 有情有义的礼物艺术家', // 分享描述
        link: 'http://rose111.applinzi.com/guirenli/index.php', // 分享链接？？？
        imgUrl: 'http://rose111.applinzi.com/guirenli/images/111.png',
        type: '', // 分享类型,music、video或link，不填默认为link
        success: function () { 
             window.totalAmount=window.totalAmount + 500 ; 
             window.View.saveStorage(5,window.totalAmount); 
             window.countTotalAmount.text(window.totalAmount);
        },
        cancel: function () { 
            // alert("分享失败");
        }
      });
  });

</script>
</html>
