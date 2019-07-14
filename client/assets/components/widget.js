var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    // fakeMessage();
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
function setDate(){
  d = new Date()
  m = d.getMinutes();
  minutes = formatAMPM(d);
  $('<div class="timestamp">'+minutes+'</div>').appendTo($('.message:last'));
}

// function insertMessage() {
//   msg = $('.message-input').val();
//   if ($.trim(msg) == '') {
//     return false;
//   }
//   $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
//   setDate();
//   $('.message-input').val(null);
//   updateScrollbar();
//   setTimeout(function() {
//     // fakeMessage();
//   }, 1000 + (Math.random() * 20) * 100);
// }

// $('.message-submit').click(function() {
//   insertMessage();
// });

// $(window).on('keydown', function(e) {
//   if (e.which == 13) {
//     insertMessage();
//     return false;
//   }
// })

var Fake = [
  'Hi there, I\'m Fabio and you?',
  'Nice to meet you',
  'How are you?',
  'Not too bad, thanks',
  'What do you do?',
  'That\'s awesome',
  'Codepen is a nice place to stay',
  'I think you\'re a nice person',
  'Why do you think that?',
  'Can you explain?',
  'Anyway I\'ve gotta go now',
  'It was a pleasure chat with you',
  'Time to make a new codepen',
  'Bye',
  ':)'
]

// function fakeMessage() {
//   if ($('.message-input').val() != '') {
//     return false;
//   }
//   $('<div class="message loading new"><figure class="avatar"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
//   updateScrollbar();

//   setTimeout(function() {
//     $('.message.loading').remove();
//     $('<div class="message new"><figure class="avatar"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
//     setDate();
//     updateScrollbar();
//     i++;
//   }, 1000 + (Math.random() * 20) * 100);

// }


var show=0;
function showHide(cek){
	var ortu = parent;		
	var jdata;
	if(show==0){
		show = cek;
		jdata = JSON.stringify({"type" : "show_chat_box"});
	}else{
		 show = 0;
		 jdata = JSON.stringify({"type" : "hide_chat_box"});
	}
	
	ortu.postMessage(jdata, 'https://ondev.infomedia.co.id');   

}