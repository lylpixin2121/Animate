Animate
=======

##USE

	Animate(elem(s),props,duration,effect,callback)
	
	Animate(doms,{
		width: 120,
		height: 200,
		left: 500,
		top: 200,
		'margin-left': 20,
		opacity: 1
	},1000,'ease-out',function(){
		alert('done')
	})
	
##Property

**elem**

	执行动画的 dom 元素
	
**props**

	变换的 css 属性
	
**duration**

	动画持续时间，默认400
	
**effect**

	动画效果，默认'linear'，可选值'ease','ease-in','ease-out','ease-in-out'
	
**callback**

	执行完动画的回调函数
	
##METHOD

**stop**

	停止动画
