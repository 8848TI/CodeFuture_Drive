# CodeFuture_Drive

🎯 一个基于 Vue3 + Pinia 的前后端分离代码博客平台，致力于为开发者提供一个简洁、美观、高效的代码分享与交流空间。

> 前端项目地址：**当前仓库**  
> 后端项目地址：[CodeFuture_Drive_API](https://github.com/8848TI/CodeFuture_Drive_API)

---

## ✨ 项目亮点

- 🧑‍💻 轻松发布、管理自己的代码博客
- 📝 支持 Markdown 编辑与实时预览（使用 Vditor）
- 📊 数据可视化展示（集成 ECharts）
- 🌐 响应式布局，兼容多端访问
- 🔐 基础的用户权限管理与数据加密

---

## 🧩 技术栈

### 前端

- ⚙️ [Vue 3](https://vuejs.org/)
- 📦 [Pinia](https://pinia.vuejs.org/)（状态管理）
- 💎 [Element Plus](https://element-plus.org/)（UI 框架）
- 🎨 [Bootstrap](https://getbootstrap.com/)（基础样式支持）
- 📊 [ECharts](https://echarts.apache.org/)（数据可视化）
- ✍️ [Vditor](https://github.com/Vanessa219/vditor) + [markdown-it](https://github.com/markdown-it/markdown-it)（Markdown 编辑器）

### 后端

> 后端项目独立部署，详见 [CodeFuture_Drive_API](https://github.com/8848TI/CodeFuture_Drive_API)

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MD5](https://www.npmjs.com/package/md5)（密码加密）
- 略

---

## 📁 项目结构（前端）

```bash
CodeFuture_Drive/
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 项目资源（图标、样式等）
│   ├── components/        # 通用组件
│   ├── views/             # 页面视图
│   ├── store/             # Pinia 状态管理
│   ├── router/            # 前端路由配置
│   └── utils/             # 工具函数
├── package.json
└── README.md
```



## 克隆项目

```
git clone https://github.com/你的用户名/CodeFuture_Drive.git
cd CodeFuture_Drive
```



## 安装依赖

```
npm run install
or
pnpm install
```



## 启动开发服务器

```
npm run dev
or
pnpm dev
```



## 打包构建

```
npm run build
```

