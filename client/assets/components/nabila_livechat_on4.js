var NABILA_LIVECHAT = NABILA_LIVECHAT || (function(){
    var _args = {}; // private

    return {
        init : function(Args) {
            _args = Args;            
        },
        initChat : function() {
			var remote = window.location.hostname; 
			//alert(remote);
            //chat_box_load(_args[0],_args[1],_args[2],_args[3]);
			chat_box_load(_args[0],_args[1],remote,_args[2]);
			 
			
        }
    };
}()); 

	var ip_chat;


    function chat_box_load(client,language, remote, host)
    { 
		ip_chat = host;
		console.log(host);
        var iframe = document.createElement('iframe');
        var HEADER_HEIGHT      = 300;
        var MOBILE_BREAKPOINT  = 100;
        var MOBILE_BUTTON_SIZE = 55;
		
		var w = window,
		d = document,
		e = d.documentElement,
		g = d.getElementsByTagName('body')[0],
		x = w.innerWidth || e.clientWidth || g.clientWidth,
		y = w.innerHeight|| e.clientHeight|| g.clientHeight; 
		//alert(x + ' � ' + y);
        
        iframe.id               = 'customer-chat-iframe';
		//iframe.src              = 'http://'+ip_chat+'/webchat/app/chat_box_on4.php?client='+client+'&language='+language+'&ip_chat='+ip_chat+'&remote='+remote; 
		//iframe.src              = 'http://ondev.infomedia.co.id/chatbox/chatbox.html'; 
		//iframe.src              = 'http://ondev.infomedia.co.id/chatbox/widget/widget.html'; 
		//iframe.src              = 'https://ondev.infomedia.co.id/octopush/demo_app/webchat#ojan'; 
		//iframe.src              = 'https://ondev.infomedia.co.id/chatbox/widget/widget.html'; 
		iframe.src              = 'https://'+host+'/'+client+'/client/webchat'; 
		//iframe.src              = 'http://ondev.infomedia.co.id/chatbox/'; 
        iframe.border           = 0;
        iframe.marginwidth      = 0;
        iframe.marginWidth      = 0;
        iframe.marginheight     = 0;
        iframe.marginHeight     = 0;
        iframe.frameBorder      = 0;
        iframe.outline          = 'none';
        iframe.style.display    = '';
        iframe.style.background = 'transparent';
        iframe.style.border     = 'none';
        iframe.style.outline    = 'none';
        iframe.style.position   = 'fixed';
        iframe.style.zIndex     = 999999;
        iframe.style.overflow   = 'hidden';
        //iframe.style.bottom     = -(y - HEADER_HEIGHT) + 'px';f
		iframe.style.bottom 	= 0;
        iframe.style.right      = '10px';
        iframe.style.width      = '312px'; //400
        iframe.style.height     = '100px';
        iframe.style.margin     = 0;
        iframe.style.padding    = '0px';
        iframe.allowtransparency    = 'true';
        
        // Responsiveness support        
        var mobileStyles = {

            position  : 'absolute',
            width     : MOBILE_BUTTON_SIZE + 'px',
            height    : MOBILE_BUTTON_SIZE + 'px',
            top       : '',
            bottom    : '',
            right     : 0
        };
        
        var state          = 'desktop';
        var originalStyles = {};
        var widgetHtml;
        
		document.body.appendChild(iframe); 
    
        var heightnya = window.screen.availHeight;
        var widthnya = window.screen.availWidth;
    
        // var width = (window.innerWidth < 720) ? window.innerWidth : screen.width;
    
        // alert(heightnya);
       
        if (widthnya < 720) {
            //  alert(heightnya);
            iframe.style.height     = heightnya +'px';
            iframe.style.width      = widthnya +'px';
            iframe.style.right      = '0px';
        }

        


		iframe.addEventListener('load', function(){
			
			//alert('load iframe');
			
			 //widgetHtml = (iframe.contentWindow.document || iframe.contentDocument).getElementsByTagName('html')[0];
            
			//alert('after load iframe');
            //addListener(window, 'resize', updateState);
            //addListener(window, 'scroll', positionWidget);
            
            //updateState();
			
			
	
	}); 
		
       
		
		
        
        // Helper functions

        function updateState()
        {
			//alert('updateState');
            if     (state !== 'mobile'  && getWindowWidth() <  MOBILE_BREAKPOINT) setMobileState();
            else if(state !== 'desktop' && getWindowWidth() >= MOBILE_BREAKPOINT) setDesktopState();
            
            positionWidget();
        }

        function positionWidget()
        {
            if(getWindowWidth() < MOBILE_BREAKPOINT)
            {
                var viewportBottom = getWindowScrollY() + getWindowHeight();

                iframe.style.top = (viewportBottom - MOBILE_BUTTON_SIZE) + 'px';
            }
        }

        function setMobileState()
        {
            state = 'mobile';

            for(var key in mobileStyles) originalStyles[key] = iframe.style[key];
            for(var key in mobileStyles) iframe.style[key]   = mobileStyles[key];

            widgetHtml.className = 'mobile-widget';

            positionWidget(); 
        }

        function setDesktopState()
        {
            state = 'desktop';

            for(var key in originalStyles) iframe.style[key] = originalStyles[key];

            widgetHtml.className = '';
        } 
	} 

	
	function normalize_id(id)
	{

		var idne = id;
				  

		idne = idne.replace("#", "__pager__"); 
		idne = idne.replace("/", "__garmir__");
		idne = idne.replace("@", "__at__");
		idne = idne.replace(".", "__dot__"); 

		return idne;
	}


	function popup_chatbox(event)
	{ 
	   console.log('Event', event);

	   if (event.origin !== "https://"+ip_chat)
	   return;

		var data = JSON.parse("[" + event.data + "]");
		var idne = '';

		var cci = document.getElementById('customer-chat-iframe');
		console.log('datatype: ',data[0].type);
		if (data[0].type == 'show_chat_box')
		{
			cci.style.height = "432px";
		}else if (data[0].type == 'hide_chat_box')	
		{
			if(data[0].end == 1){
				cci.style.height = "100px";
			}else{	
				cci.style.height = "35px"; //50
			}
		}		

		/* 
		  //reply ke opener
		  //event.source.postMessage("hi there yourself!  the secret response " +
		  //                         "is: rheeeeet!",
		  //                         event.origin);
		*/		 
	}

		window.addEventListener("message", popup_chatbox, false);	