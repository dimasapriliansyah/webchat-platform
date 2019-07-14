$(document).ready(function () {
    $(".floated-chat-btn").attr("style", "bottom: 10px;top: auto !important");
    $('.floated-chat-btn').animateCss('bounce');
});

function error_view(xhr, error) {
    if (xhr.status == 422) {
        message = xhr.responseJSON;
        // swal('', xhr.responseJSON, 'error');
    } else if (xhr.status == 200) {
        message = 'Output data is not Compatible'
        // swal('', 'Output data is not Compatible', 'error');
    } else if (xhr.status == 0) {
        message = 'Connection timeout, please reload application';
        // swal('', 'Your connection unstable, Check your internet connection', 'error');
    } else {
        message = xhr.status + ' : ' + error;
        // swal('', message, 'error');
    }
    swal('', message, 'error');
}

function nl2br(str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    let breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function openCH(evt, cityName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("chatbar_link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
    if (cityName == 'infchat') {
        document.getElementById('chattype').style.display = "block";
        //fail        
    } else {
        document.getElementById('chattype').style.display = "none";

    }
}

function ui_chat(type) {
    if (type == 'ready') {
        $("#endChat").show();
        $('#chatheadertitreg').hide();
        $('#chatagentinfo').show();
        $('#inputan').hide();
        $('#infchat').show();
        $('#infvcall').hide();
        $('#infcall').hide();
        $('#chattype').show();
        $('#messagetoolbox').show();
    } else {
        $('#chatheadertitreg').show();
        $('#chatagentinfo').hide();
        $('#inputan').show();
        $('#infchat').hide();
        $('#infvcall').hide();
        $('#infcall').hide();
        $('#chattype').hide();
        $('#messagetoolbox').hide();
        // $("#message_content").html('');
    }
}

$("#endChat").click(function () {
    let jdata;

    console.log('end chat', session_id);
    $("#notifClose").click();
    return;
});

function btnFloat(float) {
    let jdata;
    if (float == 1) {
        $(".chat").show();
        $(".floated-chat-btn").hide();
        jdata = JSON.stringify({
            "type": "show_chat_box",
            "end": "0"
        });
        zoom = 1;
    } else {
        $(".chat").hide();
        $(".floated-chat-btn").show();
        jdata = JSON.stringify({
            "type": "hide_chat_box",
            "end": "1"
        });
        zoom = 0;
    }
    showChatbox(jdata);
}

$("#hideChat").click(function () {
    let jdata;

    if (zoom == 0) {
        zoom = 1;
        jdata = JSON.stringify({
            "type": "show_chat_box",
            "end": "0"
        });
        $('.fa-chevron-up').addClass('fa-chevron-down').removeClass('fa-chevron-up');
    } else {
        zoom = 0;
        jdata = JSON.stringify({
            "type": "hide_chat_box",
            "end": "0"
        });
        $('.fa-chevron-down').addClass('fa-chevron-up').removeClass('fa-chevron-down');
    }

    showChatbox(jdata);
});

function showChatbox(jdata) {
    var ortu = parent;
    var url = (window.location != window.parent.location) ? document.referrer : document.location.href;
    ortu.postMessage(jdata, url);
}

$.fn.extend({
    animateCss: function (animationName, callback) {
        let animationEnd = (function (el) {
            let animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (let t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);

            if (typeof callback === 'function') callback();
        });

        return this;
    },
});