@echo off
chcp 65001 >nul
echo ========================================
echo   明润咨询官网 - Git 上传脚本
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] 初始化 Git 仓库...
git init
if errorlevel 1 (
    echo 错误：Git 初始化失败，请确保已安装 Git
    pause
    exit /b 1
)

echo.
echo [2/5] 添加所有文件到暂存区...
git add .
if errorlevel 1 (
    echo 错误：添加文件失败
    pause
    exit /b 1
)

echo.
echo [3/5] 提交更改...
git commit -m "初始提交：明润智讯公司官网"
if errorlevel 1 (
    echo 错误：提交失败
    pause
    exit /b 1
)

echo.
echo [4/5] 添加远程仓库...
echo 请输入你的 Gitee 仓库地址，例如：
echo https://gitee.com/mingrunzixun/web_index.git
echo.
set /p REPO_URL="仓库地址："

git remote add origin %REPO_URL%
if errorlevel 1 (
    echo 错误：添加远程仓库失败
    pause
    exit /b 1
)

echo.
echo [5/5] 推送到 Gitee...
git push -u origin master
if errorlevel 1 (
    echo 错误：推送失败
    echo 请检查：
    echo 1. 仓库地址是否正确
    echo 2. 是否已登录 Gitee 账号
    echo 3. 仓库是否已创建
    pause
    exit /b 1
)

echo.
echo ========================================
echo   上传成功！
echo ========================================
echo.
echo 下一步：
echo 1. 访问你的 Gitee 仓库
echo 2. 点击"服务" → "Gitee Pages"
echo 3. 启用 Gitee Pages 服务
echo 4. 等待部署完成
echo.
pause
