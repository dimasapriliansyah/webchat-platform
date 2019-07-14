let socket;

let tenant = "oct_bri";
let channelId = 3;

check_session();

$("#register_chat").submit((event) => {
  event.preventDefault();
  const from = $("#from").val();
  const from_name = $("#from_name").val();
  register_chat(from, from_name);
});

const check_session = () => {
  axios
    .post("https://lcomni4.infomedia.co.id/customers/checkSession").then(response => {
      console.log("check session")
      console.log(response.data)
    })
}

const register_chat = (from, from_name) => {
  const data = {
    from,
    from_name,
    tenant,
    channelId,
    message: "Registered",
  };
  axios
    .post("https://lcomni4.infomedia.co.id/customers/register", data).then(response => {
      console.log(response.data)
    })
}

// const  register_chat = (from,from_name){
//   const data = {
//     from: from,
//     from_name: from_name,
//     tenant: "oct_bri",
//     message: "Registered"
//   };
//   axios
//     .post("https://lcomni4.infomedia.co.id/client/send", data)
//     .then(function (response) {
//       const socket = io("https://lcomni4.infomedia.co.id", {
//         query: "convId=" + response.data.convId
//       });
//       socket.on("conn", msg => {
//         localStorage.setItem(c, response.data.convId);
//         localStorage.setItem("from", from);
//         localStorage.setItem("from_name", from_name);
//         ui_chat("ready");
//       });

//       socket.on("incoming", obj => {
//         console.log(obj);
//         $("#name_agent").text(obj.from_name);
//         $("#input-text-chat").prop("disabled", false);
//         message_guest(obj.message, null, null, null);
//       });

//       socket.on("agent_end_interaction", msg => {
//         console.log(msg);
//         message_guest(
//           "Agent telah mengakhiri sesi dengan anda.",
//           null,
//           null,
//           null
//         );
//         localStorage.removeItem(c);
//         localStorage.removeItem("from");
//         localStorage.removeItem("from_name");
//         $("#chatSurvey").click();
//       });

//       // BY CUSTOMER
//       // $("#endChat").click(() => {
//       //   localStorage.removeItem(c);
//       //   localStorage.removeItem("from");
//       //   localStorage.removeItem("from_name");
//       //   end_message_client("Customer telah mengakhiri sesi dengan anda.");
//       // });
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }


// const a = window.location.pathname;
  // const b = a.split("/");
  // const c = b[2];
  // let zoom = 0;

  //   //================END CLOSE BROWSER==============//
  //   window.onbeforeunload = function (e) {
  //   window.onunload = function () {
  //     window.localStorage.removeItem(c);
  //     window.localStorage.removeItem("from");
  //     window.localStorage.removeItem("from_name");
  //   }
  //   return undefined;
  // };
  // //=============================================//

  // //====================WEBCHAT HISTORY ==================//
  // function get_webchat_history() {
  //   let publicurl = c;
  //   let convId = localStorage.getItem(c);
  //   if (convId) {
  //     axios
  //       .get(
  //         `https://lcomni4.infomedia.co.id/client/hist/${publicurl}/${convId}`
  //       )
  //       .then(function(response) {
  //         // console.log(response.data);
  //         $.each(response.data, function(index, value) {
  //           console.log(value);
  //           if (value.action_type == "in") {
  //             message_self(value.message, null, null, null);
  //           } else {
  //             message_guest(value.message, null, null, null);
  //             $("#name_agent").text(value.from_name);
  //           }
  //         });
  //         $("#input-text-chat").prop("disabled", false);
  //       });
  //   }
  // }
  // get_webchat_history();
  // //======================================================//


  // const convId = localStorage.getItem(c);
  // if (convId) {
  //   const socket = io("https://lcomni4.infomedia.co.id", {
  //     query: "convId=" + convId
  //   });

  //   socket.on("conn", msg => {
  //     btnFloat(1);
  //     ui_chat("ready");
  //     // log_message(convId);
  //   });
  //   socket.on("incoming", obj => {
  //     console.log(obj);
  //     $("#name_agent").text(obj.from_name);
  //     $("#input-text-chat").prop("disabled", false);
  //     message_guest(obj.message, null, null, null);
  //   });
  // }



  // $("#input-text-chat").keypress(function(e) {
  //   msg = $("#input-text-chat").val();
  //   if (e.which == 13 && !e.shiftKey) {
  //     console.log("Sending", msg);
  //     send_message(msg);
  //   }
  // });

  // $("#send").click(function(e) {
  //   e.preventDefault();
  //   console.log("Sending", msg);
  //   send_message(msg);
  // });

  // function send_message(msg) {
  //   const data = {
  //     tenant: "oct_bri",
  //     from: localStorage.getItem("from"),
  //     from_name: localStorage.getItem("from_name"),
  //     message: msg,
  //     convId: localStorage.getItem(c)
  //   };

  //   console.log("DATA_SEND_MESSAGE", data);

  //   axios
  //     .post("https://lcomni4.infomedia.co.id/client/send", data)
  //     .then(function(response) {
  //       console.log(response);
  //       message_self(msg, null, null, null);
  //       $("#input-text-chat").val("");
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // }
  // function end_message_client(msg) {
  //   const data = {
  //     tenant: "oct_bri",
  //     from: localStorage.getItem("from"),
  //     from_name: localStorage.getItem("from_name"),
  //     message: "#end",
  //     convId: localStorage.getItem(c)
  //   };

  //   console.log("DATA_SEND_MESSAGE", data);

  //   axios
  //     .post("https://lcomni4.infomedia.co.id/client/send", data)
  //     .then(function(response) {
  //       console.log(response);
  //       localStorage.removeItem(c);
  //       localStorage.removeItem("from");
  //       localStorage.removeItem("from_name");
  //       $("#input-text-chat").val("");
  //       btnFloat("0");
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // }

  // function log_message(convId) {}


  // function message_self(msg, media, type, date) {
  //   $(
  //     '<div class="message message-personal" style="min-width:70px"><figure class="avatarclient"><img class="gravatar" src="/images/profile-80.jpg"/></figure>' +
  //       nl2br(msg) +
  //       "</div>"
  //   )
  //     .appendTo($(".mCSB_container"))
  //     .addClass("new");
  //   setDate();
  // }

  // function message_guest(msg, media, type, date) {
  //   $(
  //     '<div class="message new" style="min-width:70px"><figure class="avatar"><img src="/images/profile-80.jpg"/></figure>' +
  //       nl2br(msg) +
  //       "</div>"
  //   )
  //     .appendTo($(".mCSB_container"))
  //     .addClass("new");
  //   setDate();
  // }

  // function submitSurvey() {
  //   let q1 = $("input[name='answer1']:checked").val();
  //   let q2 = $("input[name='answer2']:checked").val();
  //   let jdata;
  //   // window.location = "https://lcomni4.infomedia.co.id/client/xasXha2Azi7#";
  //   location.reload();
  //   // $.ajax({
  //   //   url: base_url_tenant + '/client/input_survey',
  //   //   cache: false,
  //   //   type: "POST",
  //   //   data: {
  //   //     channel_id: channel_id,
  //   //     session_id: session_id,
  //   //     cust_id: cust_id,
  //   //     answer1: q1,
  //   //     answer2: q2,
  //   //     tenant_id: tenant_id
  //   //   },
  //   //   dataType: "json",
  //   //   success: function (result) {

  //   //   }
  //   // });
  // }