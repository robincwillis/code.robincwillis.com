/**
 * @author rwillis
 */



 $(document).ready(function(){
 	console.log('here we go');



	var navArray = new Array;
	
	var date_inverse = false;
	var title_inverse = false;
	var language_inverse = false;
	var tag_inverse = false;
	var curProjectID;
  	var projectOpen = false;

	//*** Load Project List From XML ***//
	xml_parser('#project_wrapper', ajax_finish);
	
	//*** Tag Filtering ***//
	$('a.nav_item').live('click',function(){
                _gaq.push(['_trackEvent', 'Language', 'Filter', $(this).text()]);
		tag_filter($(this).text(), navArray);	
		$(this).toggleClass('highlight2');
	});
	
	function ajax_finish(){
		div_sorting();
		load_project();
	}
	
	//*** Div Sorting ***//
	
	function div_sorting(){
	
	$('a.sort_date').click(function(){
	  
	  if(!projectOpen){
	    
  	  $('a.sort_title').removeClass('highlight2');
  	  $('a.sort_langauge').removeClass('highlight2');
  	  $('a.sort_tags').removeClass('highlight2');
  	  $(this).toggleClass('highlight2');
  	  
  	  $('div.project_entry').sort(function(a, b){
  	  	 
  	  	var dateAString = $(a).find('#project_date').text().split(' ').join(' 1, ');
  	  	var dateA = parseDate(dateAString,"MMM d, y");
  	  	
  	  	var dateBString = $(b).find('#project_date').text().split(' ').join(' 1, ');
  	  	var dateB = parseDate(dateBString,"MMM d, y");
  	  	
  	  	console.log(dateB);
  	  	
  	  	if(date_inverse){
  	  		return dateA - dateB;
  	  	}else{
  	  		return dateB - dateA;	
  	  	}
  	  	  
  		 
  	  });
  		date_inverse = !date_inverse;
  		
		}
		
	});
	
	$('a.sort_title').live('click',function(){
	  
	  if(!projectOpen){
	   
  	  $('a.sort_date').removeClass('highlight2');
      $('a.sort_langauge').removeClass('highlight2');
      $('a.sort_tags').removeClass('highlight2');
      $(this).toggleClass('highlight2');
      
  	  $('div.project_entry').sort(function(a, b){
  		
  			var a = $(a).find('#project_title').text();
  			var b = $(b).find('#project_title').text();
  			console.log(a);
  	
  			return (isNaN(a) || isNaN(b) ? a > b : +a > +b) ?
                                  title_inverse ? -1 : 1 :
                                  title_inverse ? 1 : -1;  
  	  });  	  
  	  title_inverse = !title_inverse;
    }
	  
	});
		
	$('a.sort_language').click(function(){
	  
	  if(!projectOpen){
  	  
      $('a.sort_date').removeClass('highlight2');
      $('a.sort_title').removeClass('highlight2');
      $('a.sort_tags').removeClass('highlight2');
      $(this).toggleClass('highlight2');
  	  
  	  $('div.project_entry').sort(function(a, b){
  		var a = $(a).find('#project_languages').find('ul.language_list:first-child').text();
  		var b = $(b).find('#project_languages').find('ul.language_list:first-child').text();	  
  	
  		 return (isNaN(a) || isNaN(b) ? a > b : +a > +b) ?
                                  language_inverse ? -1 : 1 :
                                  language_inverse ? 1 : -1;  
  		 
  	  });
  	  language_inverse != language_inverse;
	  }
	});
	
	$('a.sort_tags').click(function(){
	  
	  if(!projectOpen){
	   
	  $('a.sort_date').removeClass('highlight2');
    $('a.sort_language').removeClass('highlight2');
    $('a.sort_title').removeClass('highlight2');

    $(this).toggleClass('highlight2');

	  
	  $('div.project_entry').sort(function(a, b){
		 var a = $(a).find('#project_tags').find('ul.tag_list:first-child').text();
		 var b = $(b).find('#project_tags').find('ul.tag_list:first-child').text();	  
	
		return (isNaN(a) || isNaN(b) ? a > b : +a > +b) ?
                                tag_inverse ? -1 : 1 :
                                tag_inverse ? 1 : -1;  
 
 		  });
 		  tag_inverse != tag_inverse;  
    }
	});	
				
	}
	
	
	//*** Load Project from List ***//

		function load_project(){
		
			
			$(".project_entry").live({
			  click: function() {
			    // project is not open, so lets open it the project
			     if($(this).hasClass('open')==false){
           
           projectOpen = true;
					 //get all open projects and destroy
					 $('.project_content').remove();

			     	//lets also close everything else while were at it
			     	 $('.open').each(function(){
			     		
			     			$(this).removeClass('open');
			     			$('<div class="project_placeholder"></div>').insertAfter($(this));
			     			$(this).next('.project_placeholder').slideUp('slow',function() { 
								 $(this).remove();

							});
			     			
			     	});
						
			  	  $('<div id="'+$(this).attr('id')+'_content" class="project_content"></div>').insertAfter($(this)).hide().load_project('settings',{ 'id':$(this).attr('id')});
			     	$(this).addClass('open');
					//ANALYTICS
					_gaq.push(['_trackPageview','/project/'+$(this).find("#project_title").text()]);
					 
			     	var prevProejctID = curProjectID
			     	var offset
			     	curProjectID = $(this).attr('id');
			     	if(parseFloat(prevProejctID)<parseFloat(curProjectID)){
			     		offset = 495;
			     	}else{
			     		offset = 50;
			     	}

					$('html,body').delay(100).animate({ scrollTop: $('#'+curProjectID).offset().top-offset }, { duration: 'slow', easing: 'swing'});
			     //	project is open - we should close it 
			     }else{
			     	projectOpen = false;
			     	$('.jquery_slideshow').remove();
			     	$(this).next('.project_content').remove();
					  $('<div class="project_placeholder"></div>').insertAfter($(this));
			     			$(this).next().slideUp('slow',function() { 
									 $(this).remove();
							});
					
					$(this).removeClass('open');
					curProjectID = 100;
			     }
			     
			  },
			  mouseenter: function() {
			    // do something on mouseover
			    $(this).addClass('entry_hover')
			    $(this).find("img").fadeTo("fast", 1);;
			
			  },
			  mouseleave: function() {

			  	if($(this).hasClass('cycling')==false){
			  		$(this).addClass('cycling');
			  		$(this).charcycle();
			  	}
			  	
			  	 $(this).removeClass('entry_hover')
			  	 $(this).find("img").fadeTo("fast", 0.5);;
			  	
			  }
			});				
    
      $('#proj_close').live('click',function(){

        projectOpen = false;
        
          $('.project_content').remove();
          $('<div class="project_placeholder"></div>').insertAfter($('#'+curProjectID));
                $('#'+curProjectID).next().slideUp('slow',function() { 
                   $(this).remove();
              });
          
          $('#'+curProjectID).removeClass('open');
          curProjectID = 100;

      });
      
  
	}
	
 });
