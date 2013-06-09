
(function($){
	

	$.fn.imageScale = function( options ){
		var settings = {
			'frameWidth' : 500,
			'frameHeight' : 500,
			scale: 'fit',
			center:true
		}
		
		return this.each(function(){
			if ( options ){
				$.extend( settings,options );
			}
			
			var $this = $(this);
			
			$this.children('img').each(function(){
				scale($(this));
			});

			function scale($img){
				//this is good for getting original image size but is all kinds of fucked up
				//var imgSize = getOriginalImgSize($img);

				imgW = $img.width();
				imgH = $img.height();
				
				destW = $this.width();
				destH = $this.height();

				ratioX = destW / imgW;
				ratioY = destH / imgH;
				
				if (settings.scale === "fit") { //fit proportonially
			                ratio = ratioX < ratioY ? ratioX : ratioY;
			       } else if (settings.scale === "fill") { //fill proportionally
			                ratio = ratioX > ratioY ? ratioX : ratioY;
			       } else if (settings.scale === "height"){ //force height
							ratio = ratioY;
				   } else if (settings.scale === "width") { // force width;
							ratio = ratioX;
				   }

	            newWidth = parseInt(imgW * ratio, 10);
	            newHeight = parseInt(imgH * ratio, 10);
				
	            // Set new dimensions to css or img's attributes
	            // $img.css({
	            // 	                "width": newWidth,
	            // 	                "height": newHeight
	            // 	            })
				
				$img.attr({
	                "width": newWidth,
	                "height": newHeight
	            });
				
				if (settings.center) { // set offset if center is true
				                $img.css("margin-left", Math.floor((destW - newWidth) / 2));
				                $img.css("margin-top", Math.floor((destH - newHeight) / 2));
				            }
			}			

			// function getOriginalImgSize($img) {
			// 				            var t = new Image();
			// 				            t.src = $img.attr("src");
			// 				
			// 				            return {width: t.width, height: t.height};
			// 				        }

		});
		
	}




})( jQuery );