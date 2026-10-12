# What to eat · 今天吃什么

一个无需构建、无需后端的中文随机选餐页面，使用 HTML/CSS、JavaScript 和本地 Zepto。保留原有界面、餐厅列表和趣味选项。

## 快速开始

直接用浏览器打开 `index.html`，或在项目目录运行本地预览：

```sh
python main.py
```

访问 http://127.0.0.1:8001，按 Ctrl+C 停止。预览服务只监听本机，不用于生产环境；它会提供仓库目录中的文件，请勿公开暴露。

Python 仅用于可选的本地预览。使用项目的 uv 配置时，需要 Python 3.13 或以上：

```sh
uv run main.py
```

前端不需要安装依赖，也不需要 npm 或打包步骤。

## 使用方式

- 点击“开始”滚动候选项，再点击“停”确定结果。
- 点击标题中的餐次，切换早饭、午饭、晚饭。
- 空闲时可切换食物分类；滚动期间分类和餐次暂时锁定。
- 支持 Tab、Enter 和空格操作；焦点不在交互控件上时，空格可开始或停止。
- 页面切到后台时自动停止并保留当前结果，返回后可再次点击“换一个”。
- 跟随系统“减少动态效果”设置，关闭装饰动画并降低滚动频率。

## 目录结构

```text
.
├── index.html                 # 静态首页
├── 404.html                   # 静态托管的错误页
├── assets/
│   ├── css/style.css          # 界面与动画
│   ├── images/bg.jpg          # 原有背景图片
│   ├── js/
│   │   ├── data.js            # 餐厅、早餐与趣味文案
│   │   ├── analytics.js       # 原有百度统计配置
│   │   └── app.js             # 状态、交互与动画逻辑
│   └── vendor/zepto/          # 未改动的第三方源码及来源说明
├── main.py                    # 可选的本地预览服务
├── pyproject.toml             # Python / uv 项目配置
├── uv.lock                    # uv 锁文件
├── .editorconfig              # 编辑器格式约定
└── .gitignore                 # 本地环境与缓存忽略规则
```

## 维护内容

食物和文案集中在 `assets/js/data.js`，每项独占一行。修改列表时保留数组结构，候选列表不要留空。

- `categories`：普通餐厅分类。
- `mealNames` / `breakfastOptions`：餐次名称和独立早餐列表。
- `nonFoodOptions`：非正常人类模式的候选项。
- `funnyComments`：该模式确定结果后的文案。

首页脚本按 Zepto → data → analytics → app 顺序加载。保持普通脚本与相对资源路径，可兼容直接打开文件和 GitHub Pages 项目子路径。

原有选择规则保持不变：早饭使用独立早餐列表（“非正常人类”除外）。已知内容待办：“龙湖天街”仍是“没写”占位项，“公司周边”仍保留原有重复餐厅；整理时不擅自改动这些内容及其抽中权重。

## 静态部署

将 `index.html`、`404.html` 和整个 `assets/` 目录一起发布到静态托管服务即可。`main.py` 与 Python 配置不参与静态部署。

百度统计沿用原来的站点 ID，集中在 `assets/js/analytics.js`。停用时移除首页对应的 script 标签即可；选餐逻辑不依赖统计加载成功。

## 第三方代码与验证范围

Zepto 原始文件头和源码保持不变，来源见 [assets/vendor/zepto/README.md](assets/vendor/zepto/README.md)。背景图片沿用仓库原文件。

本轮按要求未添加或运行测试，也未进行浏览器运行验证；仅整理代码、核对文件引用和远端提交。
