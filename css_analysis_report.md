# CSS重复分析报告

## 分析的HTML文件
1. index.html
2. products.html
3. tax-calculator.html
4. tax-optimizer.html
5. redirect.html
6. env-switch.html
7. idiom-game/auto-test-fix.html

## 发现的重复CSS类别

### 1. 基础重置样式（重复）
**位置**: tax-calculator.html, tax-optimizer.html
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```
**建议**: 提取到 `css/reset.css`（已存在）

### 2. 容器样式（重复）
**位置**: tax-calculator.html, tax-optimizer.html
```css
.container {
    max-width: 1800px;
    margin: 0 auto;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    overflow: hidden;
}
```
**建议**: 提取到 `css/tax-tools.css`

### 3. 头部样式（重复）
**位置**: tax-calculator.html, tax-optimizer.html
```css
.header {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    padding: 20px;
    text-align: center;
}

.header h1 {
    color: white;
    font-size: 26px;
    font-weight: 800;
    margin: 0;
    letter-spacing: 1px;
}

.header p {
    color: rgba(255,255,255,0.9);
    font-size: 13px;
    margin: 8px 0;
}

.header-back {
    margin-top: 10px;
    text-align: center;
}

.header-back a {
    color: rgba(255,255,255,0.9);
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.3s;
}
```
**建议**: 提取到 `css/tax-tools.css`

### 4. 按钮样式（重复）
**位置**: tax-calculator.html, tax-optimizer.html
```css
.header-button {
    padding: 10px 28px;
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s;
}

.header-button:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}
```
**建议**: 提取到 `css/tax-tools.css`

### 5. 表单输入样式（重复）
**位置**: tax-calculator.html, tax-optimizer.html
```css
.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #1e293b;
    font-size: 14px;
}

.form-group input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    font-size: 14px;
    transition: all 0.3s;
    font-family: inherit;
}

.form-group input:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}
```
**建议**: 提取到 `css/tax-tools.css`

### 6. 响应式设计（重复）
**位置**: tax-calculator.html, tax-optimizer.html
```css
@media (max-width: 1400px) {
    .content-wrapper {
        grid-template-columns: 1fr;
    }
}
```
**建议**: 提取到 `css/tax-tools.css`

## 建议的CSS文件结构

### 已存在的CSS文件
- css/reset.css - 基础重置
- css/style.css - 主样式
- css/responsive.css - 响应式
- css/products.css - 产品页面样式
- css/service-modal.css - 客服弹窗样式

### 建议新增的CSS文件
- css/tax-tools.css - 税务工具通用样式（包含tax-calculator和tax-optimizer的重复样式）
- css/buttons.css - 按钮通用样式
- css/forms.css - 表单通用样式

## 提取优先级

### 高优先级（立即提取）
1. tax-tools.css - tax-calculator和tax-optimizer有大量重复
2. forms.css - 表单样式在多个页面重复

### 中优先级（后续优化）
1. buttons.css - 按钮样式可以统一
2. animations.css - 动画效果可以统一

### 低优先级（可选）
1. utilities.css - 工具类样式
2. typography.css - 字体排版样式
