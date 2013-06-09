/**
 * @author Robin Willis
 */

function tag_filter(testTag, navArray){
	
	var curFilterArray = navArray;
	var filterArray = new Array;
	var entry = '.project_entry';
	var tag_list = '.language_list';
	var tag_item = '.language_item';
	
	if(curFilterArray.length==0){
		curFilterArray[curFilterArray.length] = testTag;
	}else{
		for(i = 0; i < curFilterArray.length; i ++){
			if (testTag == curFilterArray[i]){
				curFilterArray.splice(i, 1);
				break;
			}
			if(i == curFilterArray.length -1){
				curFilterArray.push(testTag);
				break;
			}
		}
	}
	
	var filterArray = new Array;
	filterArray = curFilterArray;
	
	$(entry).each(function(){
		var curProject = $(this);
		
		if(filterArray.length != 0){
			
			var tagArray = new Array;
			
			$(this).find(tag_list).find(tag_item).each(function(){
				tagArray.push($(this).text());
			});
			
			var filterEntry = true;
			
			for (var i = 0; i < tagArray.length; i++) {
				for (var n = 0; n < filterArray.length; n++) {
					
					
					
					if (tagArray[i] == filterArray[n]) {
						filterEntry = false;
						break;
					}
					if (filterEntry == false){
						break;
					}
				}
			}
			
			if(filterEntry == false){
				curProject.slideDown().show();
			}else{
				curProject.slideUp('slow');
				if($(this).hasClass('open')){
					$('.project_content').load_project('destroy');
					$(this).removeClass('open');
				}
				//.hide();
			}
			
		}else{
			curProject.slideDown().show();
		}
		
	});
	
}
