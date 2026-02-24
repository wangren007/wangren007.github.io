(function() {
    'use strict';

    // GitHub Pages 可能的 IP 地址列表
    // 这些是 GitHub 的 CDN 服务器 IP，可能会变化
    const GITHUB_IPS = [
        '185.199.108.153',  // GitHub Pages IP 1
        '185.199.109.153',  // GitHub Pages IP 2
        '185.199.110.153',  // GitHub Pages IP 3
        '185.199.111.153',  // GitHub Pages IP 4
        '140.82.113.15',    // GitHub.com IP (备用)
        '140.82.114.15'     // GitHub.com IP (备用)
    ];

    // 检测阈值（毫秒）
    const SLOW_THRESHOLD = 2000; // 超过2秒视为慢

    // 测试路径
    const TEST_PATH = '/favicon.ico'; // 测试用的小文件

    // 当前域名
    const CURRENT_DOMAIN = window.location.hostname;

    // 检测是否在 GitHub Pages 上
    function isOnGithubPages() {
        return CURRENT_DOMAIN.includes('github.io') || CURRENT_DOMAIN.includes('github.com');
    }

    // 检测网络速度
    function testConnectionSpeed(url) {
        return new Promise((resolve) => {
            const startTime = Date.now();
            const xhr = new XMLHttpRequest();
            
            xhr.onload = function() {
                const endTime = Date.now();
                const latency = endTime - startTime;
                resolve({ url, latency, success: true });
            };
            
            xhr.onerror = function() {
                const endTime = Date.now();
                const latency = endTime - startTime;
                resolve({ url, latency, success: false });
            };
            
            xhr.timeout = 5000; // 5秒超时
            xhr.ontimeout = function() {
                resolve({ url, latency: 5000, success: false });
            };
            
            xhr.open('GET', url + TEST_PATH, true);
            xhr.send();
        });
    }

    // 构建测试 URL
    function buildTestUrl(ip) {
        // 从当前 URL 中提取仓库信息
        const pathParts = window.location.pathname.split('/').filter(Boolean);
        let repoPath = '';
        
        if (pathParts.length >= 2) {
            repoPath = `/${pathParts[0]}/${pathParts[1]}`;
        }
        
        return `http://${ip}${repoPath}`;
    }

    // 测试所有 GitHub IP
    async function testAllGithubIps() {
        const testPromises = GITHUB_IPS.map(ip => {
            const testUrl = buildTestUrl(ip);
            return testConnectionSpeed(testUrl);
        });
        
        const results = await Promise.all(testPromises);
        return results.filter(result => result.success);
    }

    // 找到最快的 IP
    function findFastestIp(results) {
        if (results.length === 0) return null;
        
        return results.reduce((fastest, current) => {
            return current.latency < fastest.latency ? current : fastest;
        });
    }

    // 测试当前连接速度
    async function testCurrentSpeed() {
        const currentUrl = window.location.origin;
        return await testConnectionSpeed(currentUrl);
    }

    // 切换到更快的 IP
    function switchToFasterIp(fastestResult) {
        if (!fastestResult) return;
        
        // 构建新的 URL
        const currentPath = window.location.pathname + window.location.search + window.location.hash;
        const newUrl = fastestResult.url + currentPath;
        
        // 跳转到新 URL
        console.log(`切换到更快的 GitHub IP: ${fastestResult.url} (延迟: ${fastestResult.latency}ms)`);
        window.location.href = newUrl;
    }

    // 主检测函数
    async function detectAndSwitch() {
        if (!isOnGithubPages()) {
            console.log('不在 GitHub Pages 上，跳过 IP 检测');
            return;
        }
        
        console.log('开始检测 GitHub Pages 连接速度...');
        
        try {
            // 测试当前连接速度
            const currentResult = await testCurrentSpeed();
            console.log(`当前连接延迟: ${currentResult.latency}ms`);
            
            // 如果当前速度可以接受，不进行切换
            if (currentResult.latency < SLOW_THRESHOLD) {
                console.log('当前连接速度良好，无需切换');
                return;
            }
            
            console.log('当前连接速度较慢，测试其他 GitHub IP...');
            
            // 测试所有 GitHub IP
            const results = await testAllGithubIps();
            
            if (results.length === 0) {
                console.log('没有找到可用的 GitHub IP');
                return;
            }
            
            // 找到最快的 IP
            const fastestResult = findFastestIp(results);
            
            if (fastestResult && fastestResult.latency < currentResult.latency) {
                console.log(`找到更快的连接: ${fastestResult.url} (延迟: ${fastestResult.latency}ms)`);
                switchToFasterIp(fastestResult);
            } else {
                console.log('没有找到更快的连接');
            }
            
        } catch (error) {
            console.error('检测 GitHub IP 时出错:', error);
        }
    }

    // 暴露给全局
    window.GitHubIpSwitcher = {
        detectAndSwitch: detectAndSwitch,
        isOnGithubPages: isOnGithubPages,
        testConnectionSpeed: testConnectionSpeed
    };

    // 页面加载完成后自动检测
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', detectAndSwitch);
    } else {
        detectAndSwitch();
    }

})();