var app=function() {
	var obj={		
		initialize:function(){			
			var self=this;
			$('.wrapper').attr('id', config.title);
			self.render();
		},
		render:function(){
			var self=this;
			self.createDOM();
		},
		createDOM:function(){
			var self=this;
			self.content="";
			self.content +="<div id='droppable' class='droppables'>";
				for (var i = 1; i <= config.droppable.length; i++) {
					self.content +="<div id='drop_"+i+"' class='drop'>";
					self.content +="<div id='dropPlace_"+i+"' class='droppe'>";					
					self.content +="</div>";
					self.content +="<div class='dropText'>"+config.droppable[i-1]+"</div>";
					self.content +="</div>";
				}
			self.content +="</div>";
			self.content +="<div id='draggable' class='draggables'>";
				for (var i = 1; i <= config.draggable.length; i++) {
					self.content +="<div id='dragItem_"+i+"' class='drag'>";
					self.content +="<div id='drag_"+i+"' class='dragged' corrAns='"+config.corrAns[i-1]+"' style='background:url("+config.draggable[i-1]+"); background-repeat:no-repeat; background-size: contain;'>";					
					self.content +="</div>";
					self.content +="</div>";
				}
			self.content +="</div>";
			self.content +="<div id='btnSubmit'>Submit</div>";
			self.content +="<div id='reset'>Reset</div>";

			$('.wrapper').append(self.content);
			
			self.contoller();
		},
		contoller:function(){
			var self=this;
			$('.dragged').draggable({
				revert:true,
				addClasses: false,
				zIndex: 100,
				stop:function( event, ui ){
					$(ui.draggable).draggable( "option", "revert", true );
				}
			});

			$('.droppe').droppable({
				accept: ".dragged",
				drop:function(event,ui){
					if(event.target.childElementCount==0){						
						$(ui.draggable).css({top:"0px", left:"0px", height:"100%", width:"100%"})
						$(event.target).append(ui.draggable);
					}
				},
				out:function(event,ui){
					
				}
			});
			$('.drag').droppable({
				accept: ".dragged",
				drop:function(event,ui){
					if(event.target.childElementCount==0){						
						$(ui.draggable).css({top:"0px", left:"0px", height:"100%", width:"100%"})
						$(event.target).append(ui.draggable);
					}
				},
			});

		/*submit button functionality*/	
		$('#btnSubmit').unbind('click').bind('click',function(){			
			if($('.draggables').find('.dragged').length==0){				
				$('.dragged').each(function(index, val){					
					
					if($(this).attr('corrans') !== $(this).parent().attr('id').split('_')[1]){
						//$('#dropPlace_'+ $(this).attr('corrans')).append($(this));
						$(this).animate({
							top:$('#dropPlace_'+ $(this).attr('corrans')).offset().top,
							left:$('#dropPlace_'+ $(this).attr('corrans')).offset().left,
							"z-index":99
						},1000,function(){
							$('#dropPlace_'+ $(this).attr('corrans')).append($(this).css({"top":"0px", "left":"0px"}));
						});
					}
				})
			}

		});
		$('#reset').unbind('click').bind('click',function(){			
			var self=obj;
			$('body').find('.droppables, .draggables, #btnSubmit, #reset').remove();			
			self.initialize();
		})				
		
		}
	}
	obj.initialize();
}
$(document).ready(function(){
	app();
})