$(function () {
  "use strict";

  // 页面引用与选餐状态。
  var isRunning = false,
    titleEl = $(".title"),
    foodEl = $(".what"),
    punctuationEl = $(".punctuation"),
    startButton = $("#start"),
    particleContainer = $("#temp_container"),
    data = window.WhatToEatData,
    mealNames = data.mealNames,
    funnyComments = data.funnyComments,
    currentMealIndex = 2,
    currentHour = new Date().getHours(),
    bodyEl = $("body"),
    commentEl = $(".os"),
    selectionCount = 0,
    currentCategory = "正常选项",
    windowHeight,
    windowWidth,
    timer,
    categoryButtons = $("#toggle button"),
    mealButton = $(".time"),
    resultEl = $("#result"),
    reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function getRandomInt(upper, lower) {
    lower = lower || 0;
    return Math.floor(Math.random() * Math.max(0, upper - lower)) + lower;
  }

  function showComment(text) {
    var comment = $("<div class='comment'></div>").text(text);
    comment
      .on("animationend webkitAnimationEnd", function () {
        $(this).remove();
      })
      .appendTo($("body"));
    // 动画被禁用时也要清理提示。
    setTimeout(function () {
      comment.remove();
    }, 3200);
  }

  function updateMeal(mealIndex) {
    if (!isRunning) {
      currentMealIndex = mealIndex;
      mealButton.text(mealNames[mealIndex]);
      titleEl.addClass("shake");
      selectionCount = 0;

      resetResult();
      trackEvent("time", "change", mealNames[mealIndex]);
    }
  }

  function trackEvent(category, action, label) {
    if (window._hmt && typeof window._hmt.push === "function") {
      window._hmt.push(["_trackEvent", category, action, label]);
    }
  }

  function resetResult() {
    foodEl.text("什么");
    punctuationEl.text("？");
    startButton.find("span").text("开始");
    commentEl.text("");
    resultEl.text("");
    document.title = "我们天天都要吃些什么";
  }

  function setRunning(running) {
    isRunning = running;
    bodyEl.toggleClass("playing", running);
    startButton.attr("aria-pressed", String(running));
    categoryButtons.prop("disabled", running);
    mealButton.prop("disabled", running);
  }

  function stopPicker() {
    if (!isRunning) return;
    clearTimeout(timer);
    setRunning(false);
    particleContainer.empty();
    if (currentCategory === "非正常人类") {
      commentEl.text(funnyComments[getRandomInt(funnyComments.length)]);
    }
    punctuationEl.text("！");
    startButton.find("span").text("换一个");
    resultEl.text(titleEl.text());
    document.title =
      titleEl.text() +
      "这是一个很无聊的网站，但能解决你的人生一大困扰！选择困难户必备！";
  }

  function getCurrentOptions() {
    if (currentCategory === "非正常人类") {
      return data.nonFoodOptions;
    }
    if (currentMealIndex === 0) {
      return data.breakfastOptions; // 早饭
    }
    return data.categories[currentCategory];
  }

  titleEl.on("animationend webkitAnimationEnd", function () {
    $(this).removeClass("shake");
  });

  particleContainer.on("animationend webkitAnimationEnd", function (event) {
    $(event.target).remove();
  });

  startButton.click(function () {
    if (isRunning) {
      stopPicker();
    } else {
      setRunning(true);
      resultEl.text("");
      selectionCount++;

      switch (selectionCount) {
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
      startButton.find("span").text("停");
      commentEl.text("");

      (function animateText() {
        var options = getCurrentOptions();
        var randomIndex = getRandomInt(options.length);
        var randomItem = options[randomIndex];
        foodEl.text(randomItem);
        if (!reducedMotion.matches) {
          // 限制节点数，即使 animationend 未触发也不会无限增长。
          if (particleContainer.children().length >= 32) {
            particleContainer.children().first().remove();
          }
          $("<span class='temp'></span>")
            .text(randomItem)
            .css({
              top: getRandomInt(Math.max(1, windowHeight - 40)),
              left: getRandomInt(Math.max(1, windowWidth - 100)),
              color: "rgba(0,0,0," + getRandomInt(8, 3) / 10 + ")",
              fontSize: getRandomInt(38, 14) + "px",
            })
            .appendTo(particleContainer);
        }

        timer = setTimeout(animateText, reducedMotion.matches ? 200 : 60);
      })();
    }
  });

  categoryButtons.click(function () {
    if (!isRunning && !$(this).hasClass("selected")) {
      categoryButtons.removeClass("selected").attr("aria-pressed", "false");
      $(this).addClass("selected").attr("aria-pressed", "true");
      currentCategory = $(this).data("type");

      if (currentCategory === "非正常人类") {
        alert("注意！前方高能！");
      }

      selectionCount = 0;
      resetResult();
      trackEvent("type", "toggle", currentCategory);
    }
  });

  if (currentHour < 9) {
    updateMeal(0);
  } else if (currentHour < 13) {
    updateMeal(1);
  } else {
    updateMeal(2);
  }

  titleEl.click(function () {
    updateMeal(currentMealIndex >= mealNames.length - 1 ? 0 : currentMealIndex + 1);
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
    if (
      $(event.target).closest("button, input, textarea, select, a, [contenteditable]").length ||
      event.altKey || event.ctrlKey || event.metaKey || event.shiftKey
    ) return;
    event.preventDefault();
    if (!event.repeat) startButton.click();
  });
  $(document).on("visibilitychange", function () {
    if (document.hidden) stopPicker();
  });
  $(window).on("pagehide", stopPicker);
});
