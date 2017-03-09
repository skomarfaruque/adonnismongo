F.onAuthorize = (req, res, flags, callback) => {
  let bearerheader = req.headers['authorization'] || req.query.token
  let bearer = bearerheader ? bearerheader.split(' ') : []
  let token = (bearer && bearer.length > 0) ? bearer[1] : null
  let userId = null

  if (token) {
    var obj = F.decrypt(token, F.config.secret)
    if (obj) {
      userId = obj
      return callback(true, userId)
    } else {
      console.log(obj)
      return callback(false)
    } 
  } else {
    return callback(false)
  }
}