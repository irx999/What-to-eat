$(function () {
  // 食物分类数据；保持静态页面无需额外请求。
  var resourceData = {
    正常选项: [
      "黄焖鸡米饭",
      "沙县小吃",
      "兰州拉面",
      "麻辣烫",
      "麦当劳",
      "肯德基",
      "吉野家",
      "真功夫",
      "老乡鸡",
      "盖浇饭",
      "砂锅",
      "大排档",
      "米线",
      "满汉全席",
      "西餐",
      "自助餐",
      "炒面",
      "快餐",
      "水果",
      "馄饨",
      "火锅",
      "烧烤",
      "泡面",
      "水饺",
      "日本料理",
      "涮羊肉",
      "味千拉面",
      "面包",
      "扬州炒饭",
      "菜饭骨头汤",
      "茶餐厅",
      "海底捞",
      "西贝莜面村",
      "披萨",
      "汉堡王",
      "卡乐星",
      "烤鱼",
      "烤肉",
      "海鲜",
      "铁板烧",
      "韩国料理",
      "粥",
      "萨莉亚",
      "桂林米粉",
      "东南亚菜",
      "甜点",
      "农家菜",
      "川菜",
      "粤菜",
      "湘菜",
      "本帮菜",
      "全家便当",
    ],
    公司周边: [
      "兰芽",
      "小果野蕉",
      "京百炉",
      "鹅皇茶记",
      "天贵豆花饭",
      "杰潮王潮牛",
      "冯四嬢",
      "何小饭",
      "黔山苗岭豆米",
      "饭饱香",
      "渝厨",
      "原醪糟",
      "夔门龙液酸汤乌鱼",
      "灶大厨",
      "忠菊嬢嬢",
      "二刀潮牛",
      "擂饭",
      "悠伴西餐",
      "九锅一堂",
      "姜胖胖",
      "豪客来",
      "苏记苏记跷脚牛肉",
      "任吉老砂锅",
      "袁记云饺",
      "C98汉堡",
      "嘉城餐厅",
      "必胜客",
      "饭饱香",
      "莱得快",
      "喜喃牛腩饭",
      "滇百年",
      "白鹿原",
      "牛妈炫动火锅",
      "麦当劳",
      "肯德基",
      "泰熙家",
      "每味每客",
      "西蜀蹄督",
      "蓉城担担面",
      "余撸小火锅",
      "大米先生",
      "乡村基",
    ],
    龙湖天街: ["没写"],
    特殊: ["豪客来"],
    非正常人类: [
      "空气",
      "西北风",
      "emoji大餐",
      "精神食粮",
      "代码套餐",
      "Bug修复汤",
    ],
  };

  function getRandomInt(upper, lower) {
    lower = lower || 0;
    return Math.floor(Math.random() * Math.max(0, upper - lower)) + lower;
  }

  function showComment(text) {
    var comment = $("<div class='comment'></div>").text(text);
    comment
      .on("animationend webkitAnimationEnd", function (event) {
        $(this).remove();
      })
      .appendTo($("body"));
    // 动画被禁用时也要清理提示。
    setTimeout(function () {
      comment.remove();
    }, 3200);
  }

  function updateTime(timeIndex) {
    if (!isRunning) {
      currentTime = timeIndex;
      $(".time").text(mealTimes[timeIndex][0]);
      $(".title").addClass("shake");
      clickCount = 0;

      resetResult();
      trackEvent("time", "change", mealTimes[timeIndex][0]);
    }
  }

  var isRunning = false,
    titleEl = $(".title"),
    whatEl = $(".what"),
    punctuationEl = $(".punctuation"),
    startBtn = $("#start"),
    tempContainer = $("#temp_container"),
    mealTimes = [
      [
        "早饭",
        "面包 蛋糕 荷包蛋 烧饼 馒头 肉夹馍 油条 馄饨 火腿 面条 小笼包 玉米粥 肉包 煎饼果子 饺子 煎蛋 烧卖 生煎 锅贴 包子 酸奶 苹果 梨 香蕉 皮蛋瘦肉粥 蛋挞 南瓜粥 煎饼 玉米糊 泡面 粥 馒头 燕麦片 水煮蛋 米粉 豆浆 牛奶 花卷 豆腐脑 煎饼果子 小米粥 黑米糕 鸡蛋饼 牛奶布丁 水果沙拉 鸡蛋羹 南瓜馅饼 鸡蛋灌饼 奶香小馒头 汉堡包 披萨 八宝粥 三明治 蛋包饭 豆沙红薯饼 驴肉火烧 粥 粢饭糕 蒸饺 白粥".split(
          " "
        ),
      ],
      ["午饭"],
      ["晚饭"],
    ],
    nonFoodItems =
      "冰箱 书桌 电扇 空调 马桶 翔 鼠标 键盘 显示器 电视 台灯 饭盒 iPad iPhone 手机 餐巾纸 电话 椅子 纸箱 窗帘 插座 被单 报纸 杂志 相框 照片 衣服 内裤 内衣 袜子 妹子 汉子 砖头 混凝土 钢筋 塑料袋 衣架 书 手环 手表 鼠标垫 眼药水 跑车 自行车 三轮车 坦克 潜水艇 飞机 火箭 U盘 CPU 显卡 刀片 碎玻璃 圆珠笔 钢笔 交通卡 银行卡 身份证 户口簿 橡皮筋 双面胶 502胶水 订书机 螺丝刀 锤子 榔头 垃圾桶 花花草草 树皮 洗手液 妇炎洁 姨妈巾 哆啦A梦 仙人掌 企鹅 大熊猫 穿山甲 米老鼠 唐老鸭 跳跳虎 旅行箱 DVD 音响 热水器 热水袋 电热棒 电池 充电器 相机 自拍杆 耳机 吊灯 雨伞 钱包 鞋子 人字拖 床垫 绣花针 戒指 窨井盖 路灯 主板 程序猿 工程狮 电线 摄像头 西北风 生活 路由器 洗手液 沐浴露 肥皂 羽毛球拍 保龄球 皮带 皮鞭 电池 牙膏 手电筒 瑜伽垫 假发 82年的自来水 马蜂窝 瑞士军刀 地板 水管 电钻".split(
        " "
      ),
    funnyComments =
      "大哥，饶命啊大哥 吃吃吃，就知道吃 壮士，干了这碗热翔 就这，还不够我塞牙缝儿 莫慌，抱紧我 吃一个，长一斤 你帅你先吃 你胖你先吃 听说吃这玩意吃不胖 你先吃，我不饿 不吃不是中国人 配上鸡汤，口味更佳 我仿佛看到了盐水瓶 嗯，好吃么？ 饭后注意漱口哦 这菜红烧味道如何？ 饭后百步走，活到九十九 分享页面到朋友圈，可以获得30个QQ太阳 据说吃完99%都哭了 惊天内幕！这网页是逗你玩的 为了身边的朋友！！转！！！！ 我也是醉了 我想静静，不要问我静静是谁 解决吃什么难题哪家强？ 我就笑笑不说话 转发过100，然并卵 活到老，吃到老 我给你讲个笑话 你别哭喔 你知道怎样得精神分裂症吗？那样我就再不是一个人了。 天下没有不散的筵席。我都还没吃完，你们都走了。 吃不到的醋，最酸。 躲了一辈子的雨，雨会不会很难过 小猪一定不知道自己的肉很好吃吧，真替它们心酸。 作为一个胖子，居然还自称自己不是个粗人！ 心情不好就吃吃吃 念念不忘，必会下单 好吃不如饺子，好玩不过嫂子 别低头，哈喇子会掉 今晚我们都是吃货 我这叫圆润，不叫胖 这不叫胖，叫丰满！ 吃饭前记得用手机消消毒 集满20个赞，明天早起瘦10斤 好吃的不要不要的 不好吃，不要钱 吃的我蹲下起立就头晕 听说你是广东人？ 贝爷，卒。".split(
        " "
      ),
    currentTime = 2,
    currentHour = new Date().getHours(),
    bodyEl = $("body"),
    osEl = $(".os"),
    clickCount = 0,
    userType = "正常选项",
    windowHeight,
    windowWidth,
    timer,
    categoryButtons = $("#toggle button"),
    mealButton = $(".time"),
    resultEl = $("#result"),
    reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function trackEvent(category, action, label) {
    if (window._hmt && typeof window._hmt.push === "function") {
      window._hmt.push(["_trackEvent", category, action, label]);
    }
  }

  function resetResult() {
    whatEl.text("什么");
    punctuationEl.text("？");
    startBtn.find("span").text("开始");
    osEl.text("");
    resultEl.text("");
    document.title = "我们天天都要吃些什么";
  }

  function setRunning(running) {
    isRunning = running;
    bodyEl.toggleClass("playing", running);
    startBtn.attr("aria-pressed", String(running));
    categoryButtons.prop("disabled", running);
    mealButton.prop("disabled", running);
  }

  function stopPicker() {
    if (!isRunning) return;
    clearTimeout(timer);
    setRunning(false);
    tempContainer.empty();
    if (userType === "非正常人类") {
      osEl.text(funnyComments[getRandomInt(funnyComments.length)]);
    }
    punctuationEl.text("！");
    startBtn.find("span").text("换一个");
    resultEl.text(titleEl.text());
    document.title = titleEl.text() + "这是一个很无聊的网站，但能解决你的人生一大困扰！选择困难户必备！";
  }

  function getCurrentOptions() {
    if (userType === "非正常人类") {
      return nonFoodItems;
    }
    if (currentTime === 0) {
      return mealTimes[0][1]; // 早饭
    }
    return resourceData[userType];
  }

  titleEl.on("animationend webkitAnimationEnd", function (event) {
    $(this).removeClass("shake");
  });

  tempContainer.on("animationend webkitAnimationEnd", function (event) {
    $(event.target).remove();
  });

  startBtn.click(function () {
    if (isRunning) {
      stopPicker();
    } else {
      setRunning(true);
      resultEl.text("");
      clickCount++;

      switch (clickCount) {
        case 2:
          showComment("我就知道你会换一个 ( ͡° ͜ʖ ͡°)");
          break;
        case 5:
          showComment("说，你是不是天秤座？Σ( ° △ °|||)︴");
          break;
        case 10:
          showComment("你是吃了炫迈吗？(￣△￣；)");
          break;
        case 20:
          showComment("难道你是处女座？ (๑•̀ㅂ•́)و✧");
          break;
        case 30:
          showComment("再换我可要报警了！( *・ω・)✄╰ひ╯");
          break;
      }

      punctuationEl.text("？");
      startBtn.find("span").text("停");
      osEl.text("");

      (function animateText() {
        var options = getCurrentOptions();
        var randomIndex = getRandomInt(options.length);
        var randomItem = options[randomIndex];
        whatEl.text(randomItem);
        if (!reducedMotion.matches) {
          // 限制节点数，即使 animationend 未触发也不会无限增长。
          if (tempContainer.children().length >= 32) {
            tempContainer.children().first().remove();
          }
          $("<span class='temp'></span>").text(randomItem)
            .css({
              top: getRandomInt(Math.max(1, windowHeight - 40)),
              left: getRandomInt(Math.max(1, windowWidth - 100)),
              color: "rgba(0,0,0," + getRandomInt(8, 3) / 10 + ")",
              fontSize: getRandomInt(38, 14) + "px",
            })
            .appendTo(tempContainer);
        }

        timer = setTimeout(animateText, reducedMotion.matches ? 200 : 60);
      })();
    }
  });

  categoryButtons.click(function () {
    if (!isRunning && !$(this).hasClass("selected")) {
      categoryButtons.removeClass("selected").attr("aria-pressed", "false");
      $(this).addClass("selected").attr("aria-pressed", "true");
      userType = $(this).data("type");

      if (userType === "非正常人类") {
        alert("注意！前方高能！");
      }

      clickCount = 0;
      resetResult();
      trackEvent("type", "toggle", userType);
    }
  });

  if (currentHour < 9) {
    updateTime(0);
  } else if (currentHour < 13) {
    updateTime(1);
  } else {
    updateTime(2);
  }

  titleEl.click(function () {
    updateTime(currentTime >= mealTimes.length - 1 ? 0 : currentTime + 1);
  });

  $(window)
    .resize(function () {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;
    })
    .resize();

  $(document).keydown(function (event) {
    if (event.key !== " " && event.which !== 32) return;
    // 保留原生按钮的空格操作；输入框与组合键不触发全局快捷键。
    if ($(event.target).closest("button, input, textarea, select, a, [contenteditable]").length ||
        event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    event.preventDefault();
    if (!event.repeat) startBtn.click();
  });
  $(document).on("visibilitychange", function () {
    if (document.hidden) stopPicker();
  });
  $(window).on("pagehide", stopPicker);
});
