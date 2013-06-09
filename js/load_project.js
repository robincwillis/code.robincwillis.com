/**
 * @author Robin Willis
 */
(function( $ ){

  var methods = {
  	
  	settings : function(options){
  		$(this).data('settings','');	
  		$(this).data('options',options);
  		$(this).data('defaults',{
  			id : 0,
  			xml_url : 'xml/code.xml',
  			container : $(this),
  			frameWidth : 640, // width of slideshow
        frameHeight : 480, // height of slideshow
  		});
  			
  			$(this).data("settings", $.extend( {}, $(this).data("defaults"), $(this).data("options")));
  			$(this).load_project('init');

  	 },
  	
     init : function() {

		$this = $(this);

       var id = $(this).data('settings').id;
		$.ajax({
		 type:'get',
		  url: $(this).data('settings').xml_url,
		  dataType:'xml',
		  success: function(xml_list){
		  	
		  	var project;
     		var xml_entry = 'project';

		    $(xml_list).find('project[id='+id+']').each(function(){
		    
		    	//content
		    	var projTitle  = $(this).find('title').text();
					var projDate  = $(this).find('date').text();
					var projDescription = $(this).find('description').text();
					//links
					
					var projSource = $(this).find('source').text();
					var projSourceSRC = $(this).find('source').attr('src');	
					var projLaunch = $(this).find('launch').text();
					var projLink = $(this).find('link').text();
					
					//lists 
					var projLanguages = new Array;
					$(this).find('languages').find('language').each(function(){
						projLanguages.push($(this).text());
					});
					
					var projTags = new Array;
					$(this).find('tags').find('tag').each(function(){
						projTags.push($(this).text());
					});
					
					var projVideo = [];
					
					var vidWidth = $(this).find('videos').attr('width'); 
					var vidHeight = $(this).find('videos').attr('height');
					
					$(this).find('videos').find('video').each(function(){
						
						projVideo.push({
							'format':$(this).attr('format'),
							'codecs':$(this).attr('codecs'),
							'src':$(this).text()
						});
					});
					
					var projGallery = [];
					$(this).find('gallery').find('gal').each(function(){
						
						projGallery.push({
							'width':$(this).attr('width'),
							'height':$(this).attr('height'),
							'index':$(this).attr('index'),
							'src':$(this).text()
						});
					});
					
					var projApplications = [];
					$(this).find('applications').find('application').each(function(){
						
						projApplications.push({
							'os':$(this).attr('os'),
							'src':$(this).text()
						});
						
					});
										
					project = {
						'title':projTitle,
						'date':projDate,
						'description':projDescription,
						'gallery':projGallery,
						'vid_width':vidWidth,
						'vid_height':vidHeight,
						'videos':projVideo,
						'source':projSource,
						'source_src':projSourceSRC,
						'applications':projApplications,
						'launch':projLaunch,
						'link':projLink,
						'languages':projLanguages,
						'tags':projTags
					}
				
					$this.load_project('show',project);
					//or could be better $this.load_project('show',$(this));
					//will send that function the xml
		    });
		  
	
		  }
		});
       
       return this.each(function(){

       });
		
     },
     
     destroy : function( ) {
     	$('#slideshow').remove();
     	$('#project_content_description').remove();
     	$('#jquery_simpleslide').remove();		
			$(this).remove(); 
     },

     show : function(project) {
     	
     	var html  = []
		
		//PROJECT TITLE & CONTROLS
		html += '<div id="project_content_title"><div style="float:left"><h3 >'+project.title+'</h3></div>';
		html += '<div style="float:right">';
		html += '<a href="javascript:void(0)" id="proj_close" class="button">x</a>';
		html += '<a href="javascript:void(0)" id="proj_video" class="button">Video</a>';
		html += '<a href="javascript:void(0)" id="proj_desc" class="button">Project</a>';
		html += '</div>';
		html += '</div>';
		html += '<div style="clear:both;"></div>';
  		
  		//PROJECT CONTENT ENTRY
  		html += '<div id="project_content_entry">';
     	//SLIDESHOW
     	html += ' <div id="slideshow">';
     	for(i=0;i<project.gallery.length;i++){
     		html += '<img src="'+project.gallery[i].src+'" class="slides" width="'+project.gallery[i].width+'" height="'+project.gallery[i].height+'" title""/>'; 
     	}  	
     	html += '</div>';   
     	//DESCRIPTION & LINKS
     	html += '<div id="project_content_description"><p>'+project.description+'</p></div>';
  		html += '<div class="project_content_links">';
  		
  		console.log(project.applications);
  		
  		if(project.applications.length > 0){
    		html += '<p class="mono">Application:';
   		  for(i=0;i<project.applications.length;i++){
  
  				html+= ' <span class="highlight"><a class="app_link" target="_blank" href="'+project.applications[i].src+'">'+ project.applications[i].os +'</a></span>'
  
  	   	}
  	   	html += '</p>';
      }		

		if(project.source.length > 0){
		  html += '<p class="mono">Source: <span class="highlight"><a class="source_link" target="_blank" href="'+project.source_src+'">'+project.source +'</a></span> </p>';
		}
		
		html += '<p class="mono">Languages: ';
		for(i=0;i<project.languages.length;i++){
			html += project.languages[i];
		}
		html +=' </p>';
		html += '<p class="mono">Tags: '
		for(i=0;i<project.tags.length;i++){
			html += project.tags[i];
		}
		html += ' </p>';
		html += '</div>';
		html += '</div>';
		
		//VIDEO
		html += '<div id="project_video">';
		html += '<div id="video_shadow"><div id="video_container">';
		
		//REGULAR VERSION
	
	   //VIDEO JS VERSION
	   html += '<div class="video-js-box hu-css">';
	   html += '<video  id="vid" controls preload="none" class="video-js" width="'+project.vid_width+'" height="'+project.vid_height+'">';
	       for(i=0;i<project.videos.length;i++){
           html +=  '<source src="'+project.videos[i].src+'"  type="video/'+project.videos[i].format+'"; codecs="'+project.videos[i].codecs+'">';
         }
    html += '</video>';
    html += '</div>';
    
    html += '</div>';
		html += '</div>';
		
		html += '</div>';
		html += '<div style="clear:both;"></div>';
		
     	$(this).append(html);
     	$(this).slideDown('slow');
     	  VideoJS.setupAllWhenReady();
     	$('#slideshow').delay(500).slideshow();
     	
		methods.loadDescription();
		$('#proj_desc').toggleClass('button_active');
		
		//applications
		//os
		$('.source_link').live('click',function(){
			_gaq.push(['Source', 'Download', project.title+'/'+$(this).text()]);	
		});
		
		
		//source		
		$('.source_link').live('click',function(){
			_gaq.push(['Application', 'Download', project.title+'/'+$(this).text()]);
		});
		
    	$('#proj_video').live('click',function(){
    		methods.loadVideo();
    		$(this).toggleClass('button_active');
    		$('#proj_desc').toggleClass('button_active');
    	});
    	
    	$('#proj_desc').live('click',function(){
    		methods.loadDescription();
    		$(this).toggleClass('button_active');
    		$('#proj_video').toggleClass('button_active');
    	});
 	
     },
     
     loadDescription : function(){
     	
     	var $gVideo = $('video');
     	$gVideo[0].pause();	

     	$('#project_video').hide();
     	$('#project_content_entry').show();
     	
     	$('#slideshow').imageScale({scale:"fit"});
		$('#slideshow').hide();
     	$('#slideshow').fadeIn(500);
		$('#project_content_entry').show('normal',function(){
     		
     		var element =  $('#project_content_description').jScrollPane();
     		
    	});
     	
     },
     
     loadVideo : function(){
     	
     	$('#project_content_entry').hide();
     	$('#project_video').show();
     	
     	var $gVideo = $('video');
		var myvid = document.getElementById('vid');
		var width = $('#vid').width();
		var height =$('#vid').height();
		
		
		$('#video_container').width(width);	
		$('#video_shadow').width(width);
		$('#video_container').height(height);
		$('#video_shadow').height(height);

		$gVideo[0].play();	
		
     }
  };

  $.fn.load_project = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.load_project' );
    }    
  
  };

})( jQuery );