/**
 * 客服弹窗和悬浮按钮功能 - 标准模板
 * 
 * 使用方法：
 * 1. 在HTML中引入此JavaScript文件：<script src="js/service-modal.js"></script>
 * 2. 在HTML中引入CSS文件：<link rel="stylesheet" href="css/service-modal.css">
 * 3. 在页面底部添加客服弹窗HTML结构（参考index.html）
 * 4. 在页面底部添加悬浮客服按钮HTML（参考index.html）
 * 
 * 功能说明：
 * - 点击悬浮按钮打开客服弹窗
 * - 点击遮罩层关闭弹窗
 * - 按ESC键关闭弹窗
 * - 自动检测是否有上传的客服二维码图片
 * - 有上传图片时：只显示图片，无边框无背景
 * - 没有上传图片时：显示完整格式（标题、按钮等）
 */

/**
 * 打开客服弹窗函数
 * 功能：显示客服弹窗，并检测是否有上传的客服二维码图片
 */
function openServiceModal() {
    // 获取弹窗元素
    var modal = document.getElementById('serviceModal');
    // 如果弹窗存在，显示弹窗并禁用页面滚动
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = '';
    }
    
    // 检测是否使用本地图片（上传的客服二维码）
    var qrImg = modal.querySelector('.service-modal-qr img');
    if (qrImg) {
        // 创建一个Image对象来检测图片是否加载成功
        var testImg = new Image();
        testImg.onload = function() {
            // 图片加载成功，说明有上传的客服二维码
            // 添加自定义样式类，只显示图片，隐藏标题和按钮
            modal.querySelector('.service-modal-content').classList.add('has-custom-qr');
            
            var title = modal.querySelector('.service-modal-title');
            var text = modal.querySelector('.service-modal-text');
            var actions = modal.querySelector('.service-modal-actions');
            var closeBtn = modal.querySelector('.service-modal-close');
            
            if (title) title.style.display = 'none';
            if (text) text.style.display = 'none';
            if (actions) actions.style.display = 'none';
            if (closeBtn) closeBtn.style.display = 'none';
        };
        testImg.onerror = function() {
            // 图片加载失败，说明没有上传客服二维码
            // 移除自定义样式类，显示完整格式（标题、按钮等）
            modal.querySelector('.service-modal-content').classList.remove('has-custom-qr');
            
            var title = modal.querySelector('.service-modal-title');
            var text = modal.querySelector('.service-modal-text');
            var actions = modal.querySelector('.service-modal-actions');
            var closeBtn = modal.querySelector('.service-modal-close');
            
            if (title) title.style.display = 'block';
            if (text) text.style.display = 'block';
            if (actions) actions.style.display = 'flex';
            if (closeBtn) closeBtn.style.display = 'flex';
        };
        // 尝试加载本地图片
        testImg.src = 'images/service_qrcode.jpg';
    }
}

/**
 * 关闭客服弹窗函数
 * 功能：隐藏客服弹窗，并恢复页面滚动
 */
function closeServiceModal() {
    // 获取弹窗元素
    var modal = document.getElementById('serviceModal');
    // 如果弹窗存在，隐藏弹窗并恢复页面滚动
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * 监听键盘事件，ESC键关闭弹窗
 * 功能：当用户按下ESC键时，自动关闭客服弹窗
 */
document.addEventListener('keydown', function(e) {
    // 按下ESC键时关闭弹窗
    if (e.key === 'Escape') {
        closeServiceModal();
    }
});

/**
 * 监听弹窗遮罩层点击事件
 * 功能：点击遮罩层时关闭弹窗
 */
document.addEventListener('click', function(e) {
    var modal = document.getElementById('serviceModal');
    // 如果点击的是遮罩层本身（不是内容区域），则关闭弹窗
    if (modal && modal.classList.contains('active') && e.target === modal) {
        closeServiceModal();
    }
});
