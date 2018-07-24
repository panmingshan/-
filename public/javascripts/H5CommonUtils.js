/**
 * ...
 * @author minliang1112@foxmail.com
 */

'use strict';

import $ from 'zepto';

export const H5CommonUtils = {

	getURL(url, target='_blank') {
		top.window.open(url, target);
	},

	/**
	 * 无刷新表单提交
	 * @url  提交地址
	 * @data 提交的数据对象
	 */
	formsubmit(url, data, cb) {
		if(!url) return;
		let frameId = 'shareIframe',
			$body = $('body');
        let iframe = $('<iframe name="[IFRAME]" id="[IFRAME]" style="display:none; height:0; width:0;" height="0" width="0"></iframe>'.replace(/\[IFRAME\]/g, frameId));
        $body.append(iframe);
        let formArr = [
			        	'<form id="form_share" name="form_share" action="[URL]" method="post" target="[IFRAME]">',
			        	'</form>'
			        ]
		if (data) {
			for(var i in data) {
				formArr.splice(1, 0, '<input type="hidden" name="'+i+'" id="'+i+'" value="'+data[i]+'">');
			}
		}
		formArr = formArr.join('').replace(/\[URL\]/g, url).replace(/\[IFRAME\]/g, frameId);
		let from = $(formArr);
        $body.append(from);
        from[0].submit();
        setTimeout(() => {
			iframe.remove();
			from.remove();
			cb();
        }, 2000);
	},

	getHost(url) {
        var host = "null";
        if (typeof url == "undefined"
                || null == url)
            url = window.location.href;
        var regex = /.*\:\/\/([^\/|:]*).*/;
        var match = url.match(regex);
        if (typeof match != "undefined"
                && null != match) {
            host = match[1];
        }
        if (typeof host != "undefined"
                && null != host) {
            var strAry = host.split(".");
            if (strAry.length > 1) {
                host = strAry[strAry.length - 2] + "." + strAry[strAry.length - 1];
            }
        }
        return host;
	},
	
	getQueryString(name) {  
        let r, reg = new RegExp("(^|\\?|&|#)" + name + "=([^&#]*)(&|#|$)", "i");
        try{
        	r = top.location.href.match(reg);
        }catch(e){
        	r = window.location.href.match(reg);
        }
        if (r != null) return decodeURIComponent(r[2]);  
        return null;
	},
	
	/**
	 *  函数节流阀
	 *  @cb   	回调函数
	 *  @scope	作用域
	 *  @wait 	延迟时间|毫秒
	 */
	throttle(cb, wait, scope) {
		let last, timer;
		scope || (scope = this);
		wait || (wait = 0.5 * 1000);
		return function() {
				let args = arguments,
					now = +new Date();
				if (last && now < last + wait) {
					clearTimeout(timer);
					timer = setTimeout(function(){
													last = now;
													cb.apply(scope, args);
												},wait);
				} else {
					last = now;
					cb.apply(scope, args);
				}
			}
	},

	//函数扩展参数
	delegate(f, rest) {
		return function(e) { f.apply(null, [e].concat(rest)); };
	},

	/**
	 * 日期格式化
	 * @param {*} date 
	 * @param {*} format 
	 */
	formatDate(date, format = "YYYY年MM月DD日 hh时mm分ss秒") {
		try{
			date || (date = new Date());
			let prefixInteger = (num, length) => {
				return (num / Math.pow(10, length)).toFixed(length).substr(2);
			}
			let week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', '日', '一', '二', '三', '四', '五', '六'];
			return format.replace(/YYYY|YY|MM|DD|hh|mm|ss|星期|周|www|week/g, (a) => {
				switch (a) {
					case "YYYY": return date.getFullYear().toString();
					case "YY": return (date.getFullYear()+"").slice(2);
					case "MM": return prefixInteger(date.getMonth() + 1,2);
					case "DD": return prefixInteger(date.getDate(),2);
					case "hh": return prefixInteger(date.getHours(),2);
					case "mm": return prefixInteger(date.getMinutes(),2);
					case "ss": return prefixInteger(date.getSeconds(),2);
					case "星期": return "星期" + week[date.getDay() + 7];
					case "周": return "周" +  week[date.getDay() + 7];
					case "week": return week[date.getDay()];
					case "www": return week[date.getDay()].slice(0, 3);
					default: return "00";
				}
			});
		}catch (e){
			return "00";
		}
		return "00";
	},
	
	/**
	 *	时间戳格式化
	 *	@millisecond	时间
	 *	@isTimestamp    是否为时间戳
	 *	@digit			时间显示到秒位 || 分位
	 */
	timeFormat(millisecond, isTimestamp, digit) {
		millisecond = Math.round(millisecond);
		if ((millisecond + '').length == 10) millisecond = millisecond * 1000;
		if (millisecond != 0) {
			let date = new Date(millisecond);
			let hou = isTimestamp ? date.getHours() : Math.floor(millisecond / 3600);
			let min = isTimestamp ? date.getMinutes() : Math.floor(millisecond % 3600 / 60);
			let sec = isTimestamp ? date.getSeconds() : Math.floor(millisecond % 3600 % 60);
			let int2str = function(num) {
				return (num < 10? '0' : '') + num;
			}
			let arr = [int2str(min), int2str(sec)];
			if (!isTimestamp) {
				if (hou > 0 || digit) arr.unshift(int2str(hou));
			} else arr = [int2str(hou), int2str(min), int2str(sec)];
			return arr.join(':');
		}
		return digit ? '00:00:00' : '00:00';
	},

	//queryString串转为object对象
	queryToObject(str) {
		let o = { };
		if(!str || str === '') return o;
		try{
			let list = str.split('&'), i = 0, item;
			while(list[i]) {
				item = list[i].split('=');
				o[item[0]] = decodeURIComponent(item[1]);
				i++;
			}
		}catch(e){};
		return o;
	},
	
	//cookie的存储、读取
	cookie() {
		return {
			setItem : function (name, value, expires) {
				let text = encodeURIComponent(value), MILLISECONDS_OF_DAY = 24 * 60 * 60 * 1000;
				if(typeof expires === 'number') {
					let date = new Date();
					date.setTime(date.getTime() + expires * MILLISECONDS_OF_DAY);
					if (expires) {
						text += '; expires=' + date.toUTCString();
					}
				}
				document.cookie = name + '=' + text;
			},
			getItem : function (name) {
				let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
				if(arr !== null) {
					return decodeURIComponent(arr[2]);
				}
				return null;
			},
			removeItem : function(name) {
				let date = new Date();
				date.setTime(date.getTime() - 10000);
				document.cookie = name + "=a; expires=" + date.toGMTString();
			}
		}
	}
}
