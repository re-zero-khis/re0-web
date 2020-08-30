require(['gitbook', 'jQuery'], function(gitbook, $) {
	var wechatURL;
	var alipayURL;
	var titleText;
	var buttonText;
	var wechatText;
	var alipayText;


	// console.log("gitbook object: ",gitbook)
	// console.log(gitbook);
	

	function insertDonateLink() {
		if ($('.gitbook-donate').length === 0 && wechatURL !== undefined && (wechatURL !== '' || alipayURL !== '')) {
			var pageDepth = gitbook.state.page.depth + 2;
			var pageLevel = gitbook.state.page.level;
			if (pageLevel == '1.1') {				// 1.1 即根目录，深度调整为 0
				pageDepth = 0;

			} else if (/^1\.\d+$/.test(pageLevel)) {	// 1.x 的页面都挂在根目录下，深度调整为 1
				pageDepth = 1;
			}
			
			var html = [
				'<div class="gitbook-donate">',
				'<div>' + titleText + '</div>',
				'<button id="rewardButton" disable="enable" onclick="var qr = document.getElementById(\'QR\'); if (qr.style.display === \'none\') {qr.style.display=\'block\';} else {qr.style.display=\'none\'}">',
				'<span>' + buttonText + '</span>',
				'</button>',
				'<div id="QR" style="display: none;">'
			];

			var _wechatURL = wechatURL;
			if (_wechatURL !== '') {
				for(pd = 0; pd < pageDepth; pd++) {
					_wechatURL = "../" + _wechatURL;
				}

				html = html.concat([
					'<div id="wechat" style="display: inline-block">',
					'<a href="' + _wechatURL + '" class="fancybox" rel="group">',
					'<img id="wechat_qr" src="' + _wechatURL + '" alt="WeChat Pay"/>',
					'</a>',
					'<p>' + wechatText + '</p>',
					'</div>'
				]);
			}

			var _alipayURL = alipayURL;
			if (_alipayURL !== '') {
				for(pd = 0; pd < pageDepth; pd++) {
					_alipayURL = "../" + _alipayURL;
				}

				html = html.concat([
					'<div id="alipay" style="display: inline-block">',
					'<a href="' + _alipayURL+ '" class="fancybox" rel="group">',
					'<img id="alipay_qr" src="' + _alipayURL + '" alt="Alipay"/>',
					'</a>',
					'<p>' + alipayText + '</p>', '</div>'
				]);
			}

			html = html.concat(['</div>', '</div>']);
			$('.page-inner section.normal:last').after(html.join(''));
		}
	}

	gitbook.events.bind('start', function(e, config) {
		titleText = config.donate.title || '';
		buttonText = config.donate.button || '赏';
		wechatURL = config.donate.wechat || '';
		wechatText = config.donate.wechatText || '微信捐赠';
		alipayURL = config.donate.alipay || '';
		alipayText = config.donate.alipayText || '支付宝捐赠';
		
		insertDonateLink();
	});

	gitbook.events.bind('page.change', function() {
		insertDonateLink();
	});
});
