require(['gitbook', 'jQuery'], function(gitbook, $) {
	var titleText;
	var buttonText;

	var wechatURL;
	var wechatText;
	var alipayURL;
	var alipayText;
	var kofiURL;
	var kofiText;
	var openCollectiveURL;
	var openCollectiveText;


	// console.log("gitbook object: ",gitbook)
	// console.log(gitbook);
	

	function insertDonateLink() {
		if ($('.gitbook-donate').length === 0 && wechatURL !== undefined && (wechatURL !== '' || alipayURL !== '' || kofiURL !== '' || openCollectiveURL !== '')) {
			var pageLevel = gitbook.state.page.level;
			var pageDepth = gitbook.state.page.depth + 2;

/*
           level      depth  .. 个数
特殊规律：
			1.1         1       0	
			1.2         1       1
			1.3         1       1
			3.1		    1       2
			5.1         1       2
一般规律：
			2.1         1       3
			2.1.1       2       4 
			2.11.1      2       4
			2.11.1.6    3       5
			2.11.1.6.1  4       6
*/

			// 1.1 -> 0
			if (pageLevel == '1.1') {
				pageDepth = 0;
			
			// 1.x -> 1
			} else if (/^1\.\d+$/.test(pageLevel)) {
				pageDepth = 1;

			// 3.1 或 5.1
			} else if (pageLevel == '3.1' || pageLevel == '5.1') {
				pageDepth = 2
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

			var _kofiURL = kofiURL;
			if (_kofiURL !== '') {
				for(pd = 0; pd < pageDepth; pd++) {
					_kofiURL = "../" + _kofiURL;
				}

				html = html.concat([
					'<div id="kofi" style="display: inline-block">',
					'<a href="' + _kofiURL+ '" class="fancybox" rel="group">',
					'<img id="kofi_qr" src="' + _kofiURL + '" alt="KO-FI"/>',
					'</a>',
					'<p>' + kofiText + '</p>', '</div>'
				]);
			}

			var _openCollectiveURL = openCollectiveURL;
			if (_openCollectiveURL !== '') {
				for(pd = 0; pd < pageDepth; pd++) {
					_openCollectiveURL = "../" + _openCollectiveURL;
				}

				html = html.concat([
					'<div id="openCollective" style="display: inline-block">',
					'<a href="' + _openCollectiveURL+ '" class="fancybox" rel="group">',
					'<img id="openCollective_qr" src="' + _openCollectiveURL + '" alt="OpenCollective"/>',
					'</a>',
					'<p>' + openCollectiveText + '</p>', '</div>'
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
		kofiURL = config.donate.kofi || '';
		kofiText = config.donate.kofiText || 'KO-FI 捐赠';
		openCollectiveURL = config.donate.openCollective || '';
		openCollectiveText = config.donate.openCollectiveText || 'OpenCollective 捐赠';
		
		insertDonateLink();
	});

	gitbook.events.bind('page.change', function() {
		insertDonateLink();
	});
});
