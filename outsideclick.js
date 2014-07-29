jQuery.event.special.outsideclick = {
	setup: function(data, namespaces, handler){
		var $this = $(this);
		var namespace = namespaces.join('.');

		function _clickHandler(e){
			var handleClick = true;
			var mouseUsed = 'button' in e;
			if(namespace === 'user' && !mouseUsed){
				handleClick = false;
			}else if(namespace === 'trigger' && mouseUsed){
				handleClick = false;
			}
			if(handleClick){
				var clickedKid = !!$this.has(e.target).length;
				if(!clickedKid && $this[0] !== e.target){
					$this.trigger('outsideclick');
				}
			}
		}
		// stores handler so it can be properly removed
		// in teardown process
		$this.data('__outsideclickHandler__', _clickHandler);
		$('body').on('click', _clickHandler);
		return true;
	},
	teardown: function(){
		$('body').off('click', $(this).data('__outsideclickHandler__'));
		return true;
	},
	// prevents duplicate triggers from happening
	// from nested elements with 'outsideclick'
	noBubble: true
};