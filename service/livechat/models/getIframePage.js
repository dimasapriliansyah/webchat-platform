const db = require('../../../connection/database');

module.exports = (accessKey) => {
  return db.select('alias','html_key').from('api_key').where({ access_key: accessKey }).then((result) => {
    if(result.length == 0){
      return false;
    } else {
      return result[0];
    }
  }).catch(error => {
    return error.sqlMessage;
  })
}
