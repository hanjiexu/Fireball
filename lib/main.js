function access_token_url(client_id, callback_uri) {
	var url = 'https://api.weibo.com/oauth2/authorize?client_id=' + client_id + '&redirect_uri=' + callback_uri + '&response_type=code';
	return url;
}

function getAuthCode(authCallbackURL) {
	var authCode = matchFirstString(authCallbackURL, /http:\/\/fireball.sinaapp.com\/\?code=([0-9a-zA-Z]+)/);
	return authCode;
}

function matchFirstString(string, regx) {
	var match = regx.exec(string);
	if(match !== null && match.length > 1) {
		return match[1];
	}
	return null;
}


require('widget').Widget({
	id : 'baidu',
	label : 'baidu',
	contentURL : 'http://www.baidu.com/favicon.ico',
	onClick : function() {
		openAuth();
	}
});

function openAuth() {
	var auth_url = access_token_url('3683153706', 'http://fireball.sinaapp.com/');
	require('tabs').open({
		url : auth_url,
		onReady : function(tab) {
			console.log(tab.url);
			var authCode = getAuthCode(tab.url);
			if(authCode !== null) {
				console.log('got authCode : ' + authCode);
				require('request').Request({
					url : 'https://api.weibo.com/oauth2/access_token',
					content : {
						client_id : '3683153706',
						client_secret : 'fa2fc408878b22f866f4b607f9f7f3b4',
						grant_type : 'authorization_code',
						code : authCode,
						redirect_uri : 'http://fireball.sinaapp.com/'
					},
					onComplete : function(response) {
						console.log('request complete : ' + response.json.access_token);
					}
				}).post();
			}
		}
	});
}

var 
