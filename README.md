# canvasPoster

* 微信小程序canvas生成海报 文字自动换行 canvas高度动态设置

## 项目结构

```
```

> 在微信小程序中分享，官网只提供分享给好友和群聊的能力，未提供分享到朋友圈的api。因此小程序分享到朋友圈通常做法就是利用canvas生成一张动态海报，上面贴一个小程序码图片，分享到朋友圈，长按识别小程序码进入小程序，以达到在朋友圈推广小程序的功能。

## 初始化canvas

1.在.wxml中 创建一个canvas, `canvasWidth`和`canvasWidth`分别为创建的canvas的宽高。
比如我们需要保存的海报尺寸为750px * 1350px; 我们就可以设置canvasWidth = 750；canvasWidth = 1350；这样导出来的图片比较清晰。
```
<view class="canvas-box">
    <canvas canvas-id="canvas" class="canvas" style="width: {{canvasWidth}}px; height: {{canvasHeight}}px;"></canvas>
<view>
```
2.在小程序中canvas层级最高。因此我们需要隐藏canvas,在窗口中不可见。
```
.canvas-box{
  position: fixed;
  top: 1000px;
  left: 1000px;
  z-index: -10;
}
```
3. 在js中获得canvas上下文
```
const ctx = wx.createCanvasContext('canvas'); // canvas-id
```
## 绘制图片

小程序绘制图片的api比较简单，一般可直接使用下面的方式
```
const img = '/assets/images/bg.png';
const imgX = 0;      // 绘制图片在canvas中起点X坐标
const imgY = 0;      // 绘制图片在canvas中起点Y坐标
const imgWidth = 0;  // 绘制图片在canvas中宽度
const imgHeight = 0; // 绘制图片在canvas中高度
ctx.drawImage(img, imgX, imgY, canvasWidth, canvasHeight);
```
### 本地图片
小程序绘制本地图片可直接使用，例如上面的`/assets/images/bg.png'`可直接绘制到canvas上面。

### 网络图片
小程序不能直接绘制网络图片到canvas中。
1.需要通过`wx.getImageInfo`获取图片信息或`wx.downloadFile`下载到本地。
2.获取图片信息。网络图片需先配置download域名才能生效。如果需要绘制微信用户头像，也需要将腾讯的域名加入到白名单。

这里使用wx.getImageInfo，在页面初始化的时候就请求所有需要绘制到canvas的网络图片.
```
const localImgInfo = {}; // 存储所有网络图片请求到本地的对象
const imgList = [
  img1,
  avatar,
];
imgList.forEach((item, index) => {
  wx.getImageInfo({
    src: item,
  success: function (res) {
      // 保存到本地数组
  localImgInfo[item] = res.path;
  }
  })
})

... (确保网络图片加载完毕后)绘制网络图片

ctx.drawImage(localImgInfo[avatar], imgX, imgY, canvasWidth, canvasHeight);
```

## 绘制文字
```
ctx.setFontSize(30);          // 文本字体大小
ctx.setFillStyle("#E1E6F0");  // 颜色
const text = '我是文字';
const textX = 0;
const textY = 0;

ctx.fillText(text, textStartX, textY);
```
绘制文字和图片有一个小区别需要注意一下，起始的x,y坐标不一致。
绘制图片的x,y坐标是从图片的 `左上角` 开始计算位置的。
绘制文字的x,y坐标是从文字的 `右下角` 开始计算位置的。

### 文字自动换行

`ctx.measureText()`能够获取canvas中文字的宽度，可通过此方法手动给文字换行

```
    // 将文字绘制到行 长文本自动换行 并返回行数
    /*
    * params
    * @text           需要绘制的文本字符
    * @startX         第一行文本的起始X坐标
    * @startY         第一行文本的起始Y坐标
    * @lineHeight     文本行高
    * @MAX_WIDTH      单行文字最大宽度，超过临界值自动换行
    *
    * return rowLength  返回绘制文本的行数
    * */
    function drawText(text, startX, startY, lineHeight, MAX_WIDTH) {
      let allAtr = text.split('');
      let rowArr = []; // 拆分出来的每一行
      let rowStrArr = []; // 每一行的文字数组
      for (let i = 0; i < allAtr.length; i++) {
        const currentStr = allAtr[i];
        rowStrArr.push(currentStr);
        const rowStr = rowStrArr.join('');
        if (ctx.measureText(rowStr).width > MAX_WIDTH) {
          rowStrArr.pop(); // 删除最后一个
          rowArr.push(rowStrArr.join('')); // 完成一行
          rowStrArr = [currentStr];
          continue;
        }
        // 最后一个字母 直接添加到一行
        if (i === allAtr.length - 1) {
          rowArr.push(rowStr); // 完成一行
        }
      }

      for (let i = 0; i < rowArr.length; i++) {
        ctx.fillText(rowArr[i], startX, startY + i * lineHeight);
      }
      return rowArr.length;
    }
```
`drawText()`函数主要的作用就是绘制传入的文本，使用`ctx.measureText()`判断单行文字的宽度是否超过单行最大宽度，如果超过就将ctx绘制文本的startY坐标设置为当前startY+文本行高，实现切换到下一行的效果

### canvas高度动态设置

由于项目中生成的海报图片高度随内容变化，导致不同的内容生成的海报高度不一致，所以这边只需要将canvas的高度放在data中，然后根据不同的内容动态计算最终海报的高度，然后设置data中canvas的高度即刻。

下面是项目中的实际效果，在这里，海报由三个部分组成，头部，内容，底部。其中头部和底部高度固定，中间的内容高度由后台返回的书籍数量决定，其中可能需要换行的就是书籍的名称和副标题。

![wx1854370267e7f197.o6zAJs2E9ws1KJBqKFUJ7feL_OZ0.tPozFAyJIjEO0b8925dccb153f84834032fdd570e7a2.png](/img/bVbB99s)

这里简单的将每一本书作为一块区域，高度固定，因此 `内容区域的高度 = 书籍数量 * 书籍高度`，通过此方法简单计算出中间内容区的高度，然后动态设置canvas的高度。

## 源码
提供简单的微信小程序测试号demo，测试号需要将不校验合法域名打开，不然无法下微信头像和外部图片。正式号需要在微信公众平台配置下载域名
![image.png](/img/bVbCaex)
