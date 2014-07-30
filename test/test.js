describe('outsideclick tests', function(){
	var one = $('.one');
	var two = $('.two');
	var three = $('.three');
	var four = $('.four');
	var body = $('body');
	var timeout = 500;

	function fireClick(node){
		if ( document.createEvent ) {
			var evt = document.createEvent('MouseEvents');
			evt.initEvent('click', true, false);
			node.dispatchEvent(evt);	
		} else if( document.createEventObject ) {
			node.fireEvent('onclick') ;	
		} else if (typeof node.onclick == 'function' ) {
			node.onclick();	
		}
	}

	describe('Tests that event is setup.', function(){

	  it('should have jQuery.event.special.outsideclick', function(){
	    expect(jQuery.event.special.outsideclick).to.be.an('object');
	  });

	  it('should have noBubble', function(){
	    expect(jQuery.event.special.outsideclick.noBubble).to.be(true);
	  });
	});

	describe('Test that `outsideclick` fires properly on single element.', function(){
		var fired = false;
		beforeEach(function(){
			$(one,two,three,four,body).off();
			fired = false;
		});
		it('should fire on .one when body click triggered', function(done){
			$('.one').on('outsideclick', function(){
			  fired = true;
			});
			$('body').trigger('click');
			setTimeout(function(){
				expect(fired).to.be(true);
				done();
			}, timeout);
		});
		it('should not fire on .one when body click triggered', function(done){
			$('.one').on('outsideclick.user', function(){
				fired = true;
			});
			$('body').trigger('click');
			setTimeout(function(){
				expect(fired).to.be(false);
				done();
			}, timeout);
		});
		it('should fire on .one when body click fired', function(done){
			$('.one').on('outsideclick.user', function(){
				fired = true;
				done();
			});
			fireClick(document.body);
		});
		it('should fire on .one when body click triggered', function(done){
			$('.one').on('outsideclick.trigger', function(){
				fired = true;
			});
			$('body').trigger('click');
			setTimeout(function(){
				expect(fired).to.be(true);
				done();
			}, timeout);
		});
		it('should not fire on .one when body click fired', function(done){
			$('.one').on('outsideclick.trigger', function(){
				fired = true;
			});
			fireClick(document.body);
			setTimeout(function(){
				expect(fired).to.be(false);
				done();
			}, timeout)
		});
	});
});
