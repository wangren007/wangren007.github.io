# 明润智讯公司官网

一个现代化、响应式的企业官网，采用纯静态 HTML/CSS/JavaScript 开发，可部署到 Gitee Pages 等静态网站托管平台。

## 项目特点

- 🎨 现代化设计风格
- 📱 完全响应式布局
- ⚡ 纯静态网站，加载快速
- 🔧 易于定制和维护
- 🌐 支持多语言扩展
- 📦 无需后端，部署简单

## 项目结构

```
company-website/
├── index.html          # 首页
├── about.html          # 关于我们
├── products.html       # 产品服务
├── contact.html        # 联系我们
├── css/
│   ├── reset.css       # CSS 重置
│   ├── style.css       # 主样式文件
│   └── responsive.css  # 响应式样式
├── js/
│   ├── main.js         # 主要 JavaScript
│   └── contact.js      # 联系表单处理
└── README.md           # 项目说明文档
```

## 快速开始

### 本地预览

1. 克隆或下载项目到本地
2. 使用任意静态文件服务器预览：

**使用 Python：**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**使用 Node.js：**
```bash
# 安装 http-server
npm install -g http-server

# 启动服务器
http-server -p 8000
```

**使用 VS Code：**
- 安装 "Live Server" 扩展
- 右键点击 index.html
- 选择 "Open with Live Server"

3. 在浏览器中访问 `http://localhost:8000`

### 部署到 Gitee Pages

#### 步骤 1：创建 Gitee 仓库

1. 登录 [Gitee](https://gitee.com/)
2. 点击右上角 "+" 按钮，选择 "新建仓库"
3. 填写仓库信息：
   - 仓库名称：`web_index`
   - 仓库介绍：`明润智讯公司官网`
   - 是否开源：选择"公开"
   - 初始化仓库：选择"不初始化"
4. 点击"创建"按钮

#### 步骤 2：上传项目文件

**方法一：通过 Git 命令行**

```bash
# 进入项目目录
cd d:\my_app\company-website

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "初始提交：公司官网"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://gitee.com/mingrunzixun/web_index.git

# 推送到 Gitee
git push -u origin master
```

**方法二：通过 Gitee 网页界面**

1. 进入你的 Gitee 仓库页面
2. 点击"文件"标签
3. 点击"上传文件"按钮
4. 将项目文件夹中的所有文件拖拽到上传区域
5. 填写提交信息："初始提交：公司官网"
6. 点击"提交"按钮

#### 步骤 3：启用 Gitee Pages

1. 进入你的 Gitee 仓库页面
2. 点击右上角的 "服务" → "Gitee Pages"
3. 填写配置信息：
   - 部署分支：`master`
   - 部署目录：留空（根目录）
4. 点击"启动"按钮
5. 等待部署完成（通常需要 1-5 分钟）
6. 部署成功后，你会获得一个访问地址，例如：`https://mingrunzixun.gitee.io/web_index/`

#### 步骤 4：配置自定义域名（可选）

如果你有自己的域名，可以配置自定义域名：

1. 在 Gitee Pages 页面点击"自定义域名"
2. 输入你的域名，例如：`www.mingrun.com`
3. 在域名 DNS 设置中添加 CNAME 记录：
   - 主机记录：`www`
   - 记录类型：`CNAME`
   - 记录值：`mingrunzixun.gitee.io`
4. 等待 DNS 生效（通常需要 10-30 分钟）

## 自定义配置

### 修改公司信息

在所有 HTML 文件中搜索并替换以下内容：

- 公司名称：`明润智讯`
- 联系邮箱：`contact@mingrun.com`
- 联系电话：`400-123-4567`
- 公司地址：`北京市朝阳区建国路88号 SOHO现代城A座18层`

### 修改颜色主题

在 `css/style.css` 文件中修改 CSS 变量：

```css
:root {
    --primary-color: #007bff;      /* 主色调 */
    --secondary-color: #6c757d;     /* 次要色调 */
    --success-color: #28a745;       /* 成功色 */
    --danger-color: #dc3545;        /* 危险色 */
    --warning-color: #ffc107;       /* 警告色 */
    --info-color: #17a2b8;          /* 信息色 */
}
```

### 添加页面

1. 创建新的 HTML 文件，例如 `news.html`
2. 复制现有页面的导航栏和页脚
3. 添加自定义内容
4. 在所有页面的导航栏中添加新页面的链接

### 添加图片

1. 在项目根目录创建 `images` 文件夹
2. 将图片文件放入该文件夹
3. 在 HTML 中引用图片：

```html
<img src="images/logo.png" alt="公司Logo">
```

## 联系表单配置

当前联系表单使用 JavaScript 进行前端验证和模拟提交。如果需要将表单数据发送到服务器，有以下几种方案：

### 方案一：使用第三方表单服务

推荐使用以下免费表单服务：

- [Formspree](https://formspree.io/)
- [Formsubmit](https://formsubmit.co/)
- [Netlify Forms](https://www.netlify.com/products/forms/)

**使用 Formspree 示例：**

1. 在 [Formspree](https://formspree.io/) 注册账号
2. 创建新表单，获取表单 URL
3. 修改 `contact.html` 中的表单：

```html
<form class="contact-form" action="https://formspree.io/f/your-form-id" method="POST">
    <!-- 表单字段 -->
</form>
```

### 方案二：连接到后端 API

如果你有自己的后端服务器，可以修改 `js/contact.js` 中的表单提交逻辑：

```javascript
fetch('https://your-api.com/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        alert('提交成功！');
    } else {
        alert('提交失败，请稍后重试');
    }
})
.catch(error => {
    console.error('Error:', error);
    alert('提交失败，请稍后重试');
});
```

## 浏览器兼容性

- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）
- 移动端浏览器（iOS Safari、Chrome Mobile）

## 性能优化建议

1. **图片优化**
   - 使用 WebP 格式
   - 压缩图片大小
   - 使用响应式图片

2. **代码优化**
   - 压缩 CSS 和 JavaScript 文件
   - 使用 CDN 加速静态资源
   - 启用 Gzip 压缩

3. **缓存策略**
   - 设置合适的缓存头
   - 使用浏览器缓存

## 常见问题

### Q: Gitee Pages 部署失败怎么办？

A: 检查以下几点：
- 确保仓库是公开的
- 检查分支名称是否正确（master 或 main）
- 确保 index.html 文件在根目录
- 查看部署日志了解具体错误

### Q: 如何更新网站内容？

A: 
1. 修改本地文件
2. 使用 Git 提交并推送更改
3. Gitee Pages 会自动重新部署

### Q: 可以使用其他静态网站托管平台吗？

A: 可以！这个项目是纯静态网站，可以部署到任何静态网站托管平台：
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

### Q: 如何添加多语言支持？

A: 
1. 为每种语言创建单独的文件夹，例如 `en/`、`zh/`
2. 在每个文件夹中放置对应语言的 HTML 文件
3. 在导航栏中添加语言切换链接

## 技术支持

如有问题或建议，请联系：
- 邮箱：contact@mingrun.com
- 电话：400-123-4567

## 许可证

本项目采用 MIT 许可证。

---

**明润智讯** - 专业的科技服务提供商
