;(function(){
	window.requestAnimationFrame = window.requestAnimationFrame ||
	    window.mozRequestAnimationFrame ||
	    window.webkitRequestAnimationFrame ||
	    window.msRequestAnimationFrame ||
	    window.oRequestAnimationFrame ||
	    function(callback) {return setTimeout(callback, 1e3 / 60); };
	window.cancelAnimationFrame = window.cancelAnimationFrame ||
	    window.mozCancelAnimationFrame ||
	    window.webkitCancelAnimationFrame ||
	    window.msCancelAnimationFrame ||
	    window.oCancelAnimationFrame ||
	    function(callback) {return clearTimeout(callback, 1e3 / 60); };
	function Animate(){
		var arg = [].slice.call(arguments);
		FX.process(arg);
	}
	function FX(config){
		//  创建默认值实例
		var el = config.el;
		var _props = {};
		var props = config.props;
		_props['style'] = el.style;
		if(window.getComputedStyle(el).getPropertyValue('display') == 'none'){el.style.display = 'block'};
		for(var i in props){
			if(props.hasOwnProperty(i)){
				if(i == 'width' || i == 'height') {def = 1}; //flash?
				_props[i] = parseInt(window.getComputedStyle(el).getPropertyValue(i),10) || def;
				def = 0;
			}
		}
		return _props;
	}
	FX.process = function(arg){
		var queue = [];
		var els = arg[0];
		if(els.length){
			[].forEach.call(els,function(el){
				queue.push(FX({el: el,props: arg[1]}));
			})
		}else{
			queue.push(FX({el: els,props: arg[1]}));
		}
		var props = arg[1];
		var duration = arg[2] || 1000;
		var callback = arg[3] || function(){};
		var now = +new Date;
		var timmer,s = '',step;
		function calc(){
			if((step = (+new Date - now) / duration) >= 1.0){
				queue.forEach(function(_props){
					for(var i in props){
						if(props.hasOwnProperty(i)){
							s += i + ':' + props[i] + 'px;'
						}
					}
					_props['style'].cssText += s;
				})
				cancelAnimationFrame(timmer);
				queue = []; //清除队列
				callback.call(els);
				// Q.checkQueue(Q.queue);
			}else{
				queue.forEach(function(_props){
					for(var i in props){
						if(props.hasOwnProperty(i)){
							// 优先级。。。。
							s += i + ':' + (Easing.Back.InOut(step) * (props[i] - _props[i]) + _props[i]) + 'px;'
						}
					}
					_props['style'].cssText += s;
					s = '';
				})
				
				// s = Easing.Back.InOut(step) * (props - s0) + s0;
				// s = Easing.genius(step) * (s1 - s0) + s0;
				
				timmer = requestAnimationFrame(calc);
			}
		}
		calc();
	}
	window.Animate = Animate;
})()