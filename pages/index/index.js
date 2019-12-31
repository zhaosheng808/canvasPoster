
const localImgInfo = {};   //  网络图片通过getImageInfo 加载到本地
// const app = getApp();
const headerHeight = 224;  //  canvas中头图高度
const bookHeight = 280;     // canvas中book高度
const bottomHeight = 300;  //  canvas中底部高度
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasWidth: 750,
    canvasHeight: 1350,
    ma_img: '/assets/images/ma.jpg', // 二维码
    avatarUrl: '/assets/images/head_img.png', // 默认头像
    hImg: '/assets/images/himg.jpg',     // 顶图
    user: {},

    book_list: [
      {
      "book_id": "104",
      "cat_id": "4",
      "name": "北京古建筑物语",
      "sub_name": null,
      "author": "张克群 ",
      "translator": null,
      "publisher": "麦客文化|化学工业出版社2019.5",
      "brief": "《北京古建筑物语》（套装3种）用图文结合的方式，通过379幅精美手绘图和照片，介绍了140处北京古建筑的前世今生，让读者更好地了解故宫、潭柘寺、卢沟桥等古建筑背后的历史、文化渊源。",
      "cover": "https://media.bjnews.com.cn/2019_pm_shuping/104.png"
    },
      {
        "book_id": "39",
        "cat_id": "1",
        "name": "被“废除不平等条约”遮蔽的北洋修约史（1912～1928）",
        "sub_name": null,
        "author": "唐启华 ",
        "translator": null,
        "publisher": "长文本测试，长文本测试，长文本测试，长文本测试，长文本测试",
        "brief": "《北京古建筑物语》（套装3种）用图文结合的方式，通过379幅精美手绘图和照片，介绍了140处北京古建筑的前世今生，让读者更好地了解故宫、潭柘寺、卢沟桥等古建筑背后的历史、文化渊源。",
        "cover": "https://media.bjnews.com.cn/2019_pm_shuping/104.png"
      },
      {
      "book_id": "97",
      "cat_id": "3",
      "name": "好好告别",
      "sub_name": "关于死亡你不敢知道却应该知道的一切",
      "author": "（美）凯特琳·道蒂 ",
      "translator": "崔倩倩 ",
      "publisher": "大鱼读品|中国友谊出版公司2019.6",
      "brief": "直面死亡并不容易，更是不少文化中最深的忌讳。我们习惯了选择蒙上双眼，对死亡和临终的真实性视而不见。但“不知即为福”最终只意味着一种更深层的恐惧。《好好告别》记录了作者在美国殡葬行业6年的工作经历。这个生于1984年的姑娘，从小就对死亡文化、哥特文化深感兴趣，并在这种兴趣的指引下进入火葬场工作，成为一名殡葬师。她在书中记叙了20个死亡故事，从第一次颇有些胆战心惊地为死者剃须再到熟练地进行防腐、火化、入殓等工作，她的成长也是我们跟随她直面死亡的过程。这样一本题材沉重的书，却写出了一种轻松幽默之感，但又不失对生命的敬畏与尊重。正如作者所说，死亡之寂也好，墓地之寂也罢，都不是生命的惩罚，而是对美好生活的回报。（张婷）",
      "cover": "https://media.bjnews.com.cn/2019_pm_shuping/97.png"
    }, {
      "book_id": "64",
      "cat_id": "2",
      "name": "莲与龙",
      "sub_name": "中国纹饰",
      "author": "（英）杰西卡•罗森",
      "translator": "张平",
      "publisher": "上海书画出版社2019.4",
      "brief": "一本具有文献留存价值的出色考证之作。在它原版首版的80年代，人们很少关注到古代地中海与东亚地区的文化交流，曾担任大英博物馆东方部主任的杰西卡•罗森，在一次关于罗马的展览中意识到中国银器与西方银器的关联，并在后来受贡布里希启发下开始研究西方花卉与叶状装饰传统的连续性，思考其与东方叶状图案的关联。《莲与龙》正是这一研究的产物。莲纹和龙纹，分属于中国古代最常见的两个装饰母题——花卉纹样和动物纹样，以它们为媒介，罗森发现了一条勾连地中海、伊朗、土耳其和中国的文化纽带。她的纹样研究具有相当深远的启发性。此前的艺术史学者对装饰纹样并不关心，然而罗森证实了，虽然这些图案与其他艺术品相比算不上精致，却能在研究其传播发展的过程中触摸到历史的脉搏。（吕婉婷）",
      "cover": "https://media.bjnews.com.cn/2019_pm_shuping/64.png"
    }, {
      "book_id": "57",
      "cat_id": "2",
      "name": "想象一朵未来的玫瑰",
      "sub_name": "佩索阿诗选",
      "author": "（葡萄牙）佩索阿",
      "translator": "杨铁军 ",
      "publisher": "雅众文化|中信出版集团2019.5",
      "brief": "费尔南多•佩索阿的一生有过一百多个异名，每个异名都代表了不同的精神世界。《想象一朵未来的玫瑰》中收录的是以“冈波斯”为异名的作品。诗集中，“未来”的含义充满悲观意味，冈波斯虽然对世界的原理与人生有着深刻的体会，但在行动时，他永远将自己的时间搁置于未来，无论诗歌的开头多么具有雄心，每首诗的音调最终都滑向空无。冈波斯的人生变成了自己的一场梦，但他又仿佛觉得睡觉这件事情是荒诞的。这种对行为的拒绝十分契合现代人的精神困境，疲惫而无力改变现状，丧失了向生活提出要求的能力，又期待着未来能有所不同。“即使我明天买了票，后天才是那场戏开演的日子……”，佩索阿的诗歌在苦郁中徘徊，驶向那已知却不愿接受的未来。（宫照华）",
      "cover": "https://media.bjnews.com.cn/2019_pm_shuping/57.png"
    }, {
      "book_id": "35",
      "cat_id": "1",
      "name": "生死秦始皇",
      "sub_name": null,
      "author": "辛德勇 ",
      "translator": null,
      "publisher": "中华书局2019.7",
      "brief": "“魔鬼藏在细节里”。如果作者辛德勇在后记中自陈属实，这本书的起因就是他在七月盛夏的烈日中买到的一本消暑“鬼书”——2000年前古墓坑里挖出来的西汉竹简《赵正书》。这份讲述秦始皇生平的史料最引人入胜之处，就是那些魔鬼般的细节。通过对这些细节穷追猛打，辛德勇试图从历史的深渊中打捞出一个与我们所熟悉的秦始皇迥然有异的形象。那些我们已经非常熟悉的历史，在这本书中都受到质疑。关于秦始皇沙丘暴崩的前后史事与秦二世胡亥即位的真相，关于那位秦朝兴亡中的关键人物赵高的下半身问题以及那个传说千年的“指鹿为马”故事的原初面貌，乃至于秦始皇究竟姓甚名谁，这本书都以掺杂着戏谑调侃的学术性语言加以考证分析，通过对一个个细微字句的咬文嚼字，将千百年来脍炙人口的惯说成见放在显微镜下加以剖析，从细节处发掘出令人深思的历史蕴意。\n这本书提出的一些颠覆性的观点，确实让人瞠目结舌。而作者对文献学、训诂学和历史基本考证功底的纯熟运用，也让这本书的结论对那些缺乏严格学术训练的普通读者来说很具有说服力。但不得不指出的一点是，在众多赞誉之中，非议之声也不绝于耳。但一部以考证训诂为基础的学术专著，竟然能在普罗大众读者中引起讨论热潮，作为一种现象，都足以令人深思了。（李夏恩）",
      "cover": "https://media.bjnews.com.cn/2019_pm_shuping/35.png"
    }, {
      "book_id": "9",
      "cat_id": "1",
      "name": "贸易的冲突",
      "sub_name": "美国贸易政策200年",
      "author": "(美)道格拉斯·欧文",
      "translator": "余江/刁琳琳/陆殷莉 ",
      "publisher": "中信出版集团2019.7",
      "brief": "“贸易冲突”四个字通常是作为新闻为人所熟知的。而新闻报道是即时的、变化的，所以贸易冲突也因此给人留下这样一种印象：它是不同经济体一时一地产生的贸易摩擦，原因深不可测，人们甚至就此肆意想象背后不可告人的“阴谋”。确实，一个经济体对外贸易政策可能是波动的、不确定的，毕竟这些政策会因为顺逆差、国内经济或政治环境的改变而改变。然而，只要我们将时间拉长，就可能另有一番理解。即便是美国也有其规律。\n经济史学家道格拉斯·欧文将美国贸易政策从独立战争一路梳理下来，横跨两百余年，贸易政策也只在南北战争和大萧条等时刻转变。产业的集中分布，加之联邦立法的通过难度，让对外贸易政策趋于维持原状。他的这一经济史分析将人们的视野拉回历史，在贸易冲突成为被热议对象的今天，使那些热衷于猜测或想象的做法失去知识的正当性。理解一个经济体的贸易政策，离不开背后更隐蔽更长久的历史。（罗东）",
      "cover": "https://media.bjnews.com.cn/2019_pm_shuping/9.png"
    }, {
      "book_id": "5",
      "cat_id": "1",
      "name": "人文的互联网",
      "sub_name": "数码时代的读写与知识",
      "author": "徐贲",
      "translator": null,
      "publisher": "北京大学出版社2019.7",
      "brief": "书籍是人类文明的载体，也曾是一个人拥有文化品位和社会地位的象征，读书与写作曾是独属于少数文化和权力精英阶层的高贵行为。进入互联网时代以后，阅读和写作的门槛前所未有地降低，变成一项人人皆可为之的举动，阅读的民主化在加速知识的传播和文明的普及，但碎片化、浅层化的阅读则可能导致人们的深度思考能力受损。\n徐贲的《人文的互联网》，正是对上述问题的深入思索。阅读、写作、知识、学术、启蒙等传统命题，在互联网时代遭遇全新变革，人文环境的彻底改变不仅对知识分子重新阐释社会发出了挑战，也对身处其中的每个个体的日常应对提出了新要求，公众的启蒙教育和民主化进程都需要在这个人文环境中进行重新思考，而此书正是对互联网时代人文环境进行阐述的一部开创性著作。（徐学勤）\n",
      "cover": "https://media.bjnews.com.cn/2019_pm_shuping/5.png"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {book_list} = this.data;
    const user = wx.getStorageSync('user');
    if (user && user.avatarUrl) {
      this.setData({
        user: user
      })
      this.getLocalAvatar(user.avatarUrl);
   }
   // 动态设置canvas的高度， 不同的数量的书籍，导出的图片高度不一致
   this.setData({
     canvasHeight: headerHeight + bottomHeight + bookHeight * book_list.length,
   });
    this.getLocalImg();
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

 
  getuserinfo: function(e) {
    // 同意授权会返回userInfo
    if (!e.detail.userInfo){
      return false
    }
    const _this = this;
    // 先登录在获取用户信息
    wx.login({
      success: res => {
        wx.getUserInfo({
          success: function (re) {
            _this.getUserInfoSuccess(re.userInfo)
          },
          complete: function (re) {
          }
        })
      }
    });
  },
  getUserInfoSuccess: function (userInfo){
    this.setData({
      user: userInfo
    })
    wx.setStorageSync('user', userInfo);
  },
  getLocalAvatar: function(avatar) {
    wx.getImageInfo({
      src: avatar,
      success: function (res) {
        // 保存到本地数组
        localImgInfo['avatarUrl'] = res.path;
      }
    })
  },
  // getLocalImg
  getLocalImg: function () {
    const { bg , book_list} = this.data;
    const imgList = book_list.map(item => {
      return item.cover;
    });
    imgList.push(bg);
    imgList.forEach((item, index) => {
      wx.getImageInfo({
        src: item,
        success: function (res) {
          // 保存到本地数组
          localImgInfo[item] = res.path;
        }
      })
    })
  },

  

  // 生成图片
  createImg: function () {
    wx.showLoading({
      title: '图片生成中...'
    });
    setTimeout(this.drawCanvas, 500)
  },
  // 绘制canvas
  drawCanvas: function () {
    const _this = this;

    const { avatarUrl, canvasWidth, canvasHeight, ma_img, user, hImg, book_list} = this.data;
    const ctx = wx.createCanvasContext('canvas');
    const canvas_width = canvasWidth;
    const canvas_height = canvasHeight;
    // 背景色
    ctx.setFillStyle('#ffffff');
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 绘制头图
    ctx.drawImage(hImg, 0, -2, canvasWidth, 220);

    // 绘制头像
    ctx.save(); // 先保存状态 已便于画完圆再用
    ctx.beginPath(); //开始绘制

    const avatarWidth = 66; // 头像宽度
    const avatarCenterY = 86; // 头像中心Y坐标
    ctx.arc(canvasWidth / 2, avatarCenterY, avatarWidth / 2, 0, Math.PI * 2, false);
    ctx.setFillStyle('#eeeeee');
    ctx.fill();
    ctx.clip();
    ctx.drawImage(localImgInfo['avatarUrl'] || avatarUrl , (canvasWidth - avatarWidth) / 2, avatarCenterY - avatarWidth / 2, avatarWidth, avatarWidth);
    ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 可以继续绘制


    // 绘制大标题
    ctx.setFontSize(28);
    ctx.setFillStyle("#fff");
    const headText = '2019 XXX 年度阅读推荐';
    ctx.fillText(headText, (canvasWidth - ctx.measureText(headText).width) / 2, 40);

    // 绘制用户名
    ctx.setFontSize(18);
    ctx.setFillStyle("#D1C9B8");
    const nickName = user.nickName || '';
    const nickNameText = nickName + "的推荐书单";
   
    ctx.fillText(nickNameText, (canvasWidth - ctx.measureText(nickNameText).width) / 2, 150);
    // 底部背景色

    // 书籍列表
    const bookListStartY = headerHeight;
    /*循环绘制每一本书籍*/
    for (let i = 0; i < book_list.length; i++) {
      const book = book_list[i];
      drawBook(book, i, book_list.length - 1 === i);
    }

 

    ctx.setFillStyle('#eeeeee');
    ctx.fillRect(0, canvasHeight - bottomHeight, canvasWidth, bottomHeight);

    // 底部二维码
    ctx.save(); // 先保存状态 已便于画完圆再用
    ctx.beginPath(); //开始绘制

    const maWidth = 140;    // 二维码宽度
    const maArcWidth = 150; // 二维码外层宽度
    const maCenterY = canvasHeight - 110 - maWidth / 2; // 图片中心Y坐标
    ctx.arc(canvasWidth / 2, maCenterY, maArcWidth / 2, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.clip();
    // 二维码白色底色
    ctx.setFillStyle('#ffffff')
    ctx.fillRect((canvasWidth - maArcWidth) / 2, maCenterY - maArcWidth / 2, maArcWidth, maArcWidth)
    ctx.drawImage(ma_img, (canvasWidth - maWidth) / 2, maCenterY - maWidth / 2, maWidth, maWidth);
    ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下文即状态 可以继续绘制


    // 底部文字
    ctx.setFontSize(18);
    ctx.setFillStyle("#777777");

    const footerText1 = '长按识别小程序码,进入';
    const footerText2 = '  私人定律  ';
    const footerText3 = '参与测评';
    const footerLine1 = footerText1 + footerText2 + footerText3;
    const footerText4 = '寻找适合你的古典音乐';
    const line1StartX = (canvasWidth - ctx.measureText(footerLine1).width) / 2;
    const footerText2StartX = line1StartX + ctx.measureText(footerText1).width;
    const footerText3StartX = line1StartX + ctx.measureText(footerText1 + footerText2).width;

    const footerLine1Y = canvasHeight - 60;
    const footerLine2Y = canvasHeight - 30;


    ctx.fillText(footerText1, line1StartX, footerLine1Y);
    ctx.fillText(footerText3, footerText3StartX, footerLine1Y);
    ctx.fillText(footerText4, (canvasWidth - ctx.measureText(footerText4).width) / 2, footerLine2Y);
    ctx.setFillStyle("#D02D2B");
    ctx.fillText(footerText2, footerText2StartX, footerLine1Y);



    function drawBook(item, i, isLast) {
      const bookStartY = bookListStartY + i * bookHeight + 20; // 当前图书起始Y坐标 顶部留空20px
      const bookEndY = bookListStartY + (i + 1) * bookHeight; // 当前图书结束Y坐标
      //绘制左图
      const imgX = 26; // 图片X起点
      const imgY = bookStartY; // 图片Y起点
      const imgWidth = 160; // 图片左侧起始
      const imgHeight = 220; // 图片左侧起始


      // 如果封面已加载到本地
      if (localImgInfo[item.cover]) {
        ctx.drawImage(localImgInfo[item.cover], imgX, imgY, imgWidth, imgHeight)
      }else {
        ctx.setFillStyle('#f7f7f7');
        ctx.fillRect(imgX, imgY, imgWidth, imgHeight);
      }

      let titleX = 200; // 文字x起点坐标
      const RIGHT_MAX_WIDTH = canvas_width - titleX - imgX; // 右侧文本最大宽度 =  canvas总宽度 - 左侧img宽度 - 右侧留白
      // 绘制书名
      ctx.setFontSize(28);
      ctx.setFillStyle("#000000");
      let bookTitle = item.name || ''; // 书名
      let titleLineHeight = 36;

      let titleY = bookStartY + titleLineHeight + 10;
      const titleRowNum = drawText(bookTitle, titleX, titleY, titleLineHeight, RIGHT_MAX_WIDTH);

      // 绘制书籍副标题
      const subTitleStartY = titleRowNum * titleLineHeight + bookStartY + 26; // 副标题起始Y

      let smallTextStartY = subTitleStartY;

      let subTitle = item.sub_name || '';
      if (subTitle) {
        ctx.setFontSize(24);
        ctx.setFillStyle("#5D5953");


        let subTitleLineHeight = 30;
        let subTitleY = subTitleStartY + subTitleLineHeight;
        const subTitleRowNum =  drawText(subTitle, titleX, subTitleY, subTitleLineHeight, RIGHT_MAX_WIDTH);
        smallTextStartY = smallTextStartY + subTitleLineHeight * subTitleRowNum + 16;
      }



      // 小文字行高一致 大小颜色一致
      const smallTextLineHeight = 28;
      ctx.setFontSize(20);
      ctx.setFillStyle("#8D9199");


      // 作者
      let author = '作者：' + (item.author || '');
      const authorY = smallTextStartY + smallTextLineHeight;
      drawText(author, titleX, authorY, smallTextLineHeight, RIGHT_MAX_WIDTH);
      let translatorY = authorY + smallTextLineHeight;
      let publisherY = translatorY;
      if (item.translator) {
        // 译者
        let translator = '译者：' + item.translator;
        drawText(translator, titleX, translatorY, smallTextLineHeight, RIGHT_MAX_WIDTH);

        publisherY = translatorY + smallTextLineHeight ;
      }


      // 绘制出版社
      let publisher = item.publisher || '';
      drawText(publisher, titleX, publisherY, smallTextLineHeight, RIGHT_MAX_WIDTH);






      // 最后一个底部没有分割线
      if (!isLast) {
        //分割线
        ctx.setStrokeStyle('#c1c1c1');
        ctx.beginPath();
        // ctx.setLineWidth(0.6);
        // ctx.setLineDash([4, 2]);
        ctx.setLineDash([6, 2]);

        // ctx.lineDashOffset = 0.4; // 虚线偏移量，初始值为0

        ctx.moveTo(imgX, bookEndY);
        ctx.lineTo(canvasWidth - imgX, bookEndY);
        // context.lineTo(265, 209 + c)
        ctx.stroke();
      }

    }

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

    // 绘制图片
    ctx.draw(false, function () {
      // 延时生成图片 否则真机测试文字会样式混乱
      setTimeout(() => {
        // 生成图片
        wx.canvasToTempFilePath({
          canvasId: 'canvas',
          success: res => {
            wx.hideLoading();
            _this.createShareImgSuccess(res.tempFilePath);
          },
          fail: () => {
            wx.showToast({
              title: '图片生成失败~',
              icon: 'none'
            });
          }
        })
      }, 300)

    })
  },
  // 创建分享图成功
  createShareImgSuccess: function (tempFilePath) {
    const _this = this;
    this.setData({
      showPoster: true,
      tempShareImg: tempFilePath,
    });
    wx.saveImageToPhotosAlbum({
      filePath: tempFilePath, //这个只是测试路径，没有效果
      success(res) {
        wx.showToast({
          title: '图片已保存至相册，快去分享吧!',
          icon: 'none',
          duration: 3000,
        })
      },
      // 保存到相册失败
      fail: function (err) {
        wx.hideLoading();
        if (err.errMsg === "saveImageToPhotosAlbum:fail cancel") {
          _this.saveShareImgErr();
        } else if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
          wx.showModal({
            title: '温馨提示',
            content: '请开启保存到相册权限，开启后自动保存相册',
            success(res) {
              if (res.confirm) {
                wx.openSetting({
                  success(settingdata) {
                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                      _this.createShareImgSuccess(tempFilePath);
                    } else {
                      _this.saveShareImgErr();
                    }
                  }
                })
              } else if (res.cancel) {
                _this.saveShareImgErr();
              }
            }
          })
        } else {
          _this.saveShareImgErr();

        }
      }
    })
  },
  // 保存到手机失败
  saveShareImgErr: function () {
    wx.showToast({
      title: '图片保存失败~ ',
      icon: 'none',
      duration: 3000,
    })
  },
  // 关闭海报图片
  closePoster: function () {
    this.setData({
      showPoster: false
    });
  },

  preD: function () {

  },

})