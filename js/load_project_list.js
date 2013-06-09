/**
 * @author Robin Willis
 */

function xml_parser(wrapper, callback){
	var xml_entry = 'project';
	var xml_url = 'xml/code.xml';
	//preloader
	$('<div id="preload_xml></div>"').html('<img src="images/ajax-loader.gif" alt="loading data" /><h3>Loading Data...</h3>').prependTo($(wrapper));
	
	//hide content
	$(wrapper).hide();
	
	//Get XML Data
	$.ajax({
		type:'get',
		url:xml_url,
		dataType: 'xml',
		success: function(xml_list){
			$('#preload_xml').remove();
			$(wrapper).show();
			
			var xmlArr = [];
			
			$(xml_list).find(xml_entry).each(function(){
				
				if($(this).attr('display')=='on'){
					//project id
					var xml_id 			= $(this).attr('id');
					//project thumb
					var xml_thumb		= $(this).attr('thumb');
					//project title
					var xml_title		= $(this).find('title').text();
					//proejct date
					var xml_date		= $(this).find('date').text();
					//project description
					var xml_description	= $(this).find('description').text();
					
					//project lanaguges
					var xml_languages = new Array;
					
					$(this).find('languages').find('language').each(function(){
						xml_languages.push($(this).text());
						
					});
					
					//project tags
					var xml_tags = new Array;
					
					$(this).find('tags').find('tag').each(function(){
						xml_tags.push($(this).text());
					
					
					});

				//trim description string to certain character length for table
				var xml_short_description = xml_description.substr(0,50);
                if (xml_short_description.length==50){
					xml_short_description += "..."			
				}
				
				xmlArr += '<div id="'+xml_id+'" class="project_entry">';
				
				xmlArr += '<div id="project_thumb" class="mono">';
				xmlArr += '<img src="'
				xmlArr += xml_thumb;
				xmlArr += '"/>'
				xmlArr += '</div>';
   				
   				xmlArr += '<div id="project_date">';
   				xmlArr += xml_date;
   				xmlArr += '</div>';
    			
    			xmlArr += '<div id="project_title">';
    			xmlArr += xml_title;
    			xmlArr += '</div>';
   
    			xmlArr += '<div id="project_description" class="tiny">';
    			xmlArr += xml_short_description;
     			xmlArr += '</div>';
				
				xmlArr += '<div id="project_languages">'
				xmlArr+='<ul class="language_list">';
				for(i=0;i<xml_languages.length;i++){
				  	xmlArr+='<li class="language_item">';
				  	xmlArr+=xml_languages[i];
				  	
				  	xmlArr+='</li>';
				}
				xmlArr+='</ul>';
				xmlArr+='</div>';
				
				xmlArr += '<div id="project_tags" class="tiny">'
				xmlArr+='<ul class="tag_list">';
				for(i=0;i<xml_tags.length;i++){
				  	xmlArr+='<li class="tag_item">';
				  	xmlArr+=xml_tags[i];
				  	xmlArr+='</li>';
				}
				xmlArr+='</ul>';
				xmlArr+='</div>';
				xmlArr += '</div>';
				}
			});

			$(xmlArr).appendTo(wrapper);
			$('div.project_entry').hide().slideDown('800');
			callback();
			
			
		}
	});
}
