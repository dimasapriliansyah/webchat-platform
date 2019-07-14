const axios = require('axios')
const uuid = require('uuid/v4')
const register = (data) => {
  let convId = uuid()
  let dataParameter = {
    message: data.message,
    tenant: data.tenant,
    from: data.from,
    from_name: data.from_name,
    message_type: data.message_type || "text",
    groupId: data.groupId,
    channelId: data.channelId || 3,
    convId
  };
  return axios
    .post("https://lcomni4.infomedia.co.id:3008/webchat", dataParameter)
    .then(function (response) {
      // console.log(data);
      return convId
    })
    .catch(function (error) {
      console.log(error);
      return "error"
    });
}

exports.register = register;