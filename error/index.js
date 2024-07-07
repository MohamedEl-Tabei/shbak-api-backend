const getErrorMessage = (err) => {
  if (err.message.includes("∞")) {
    let errs=  err.message.split("∞")
    errs.pop()
    return errs;
  }
  if(err.errors)
  {
    let errs=  err.message.split(",")
    return errs;
  }
  if(err.code){
    
    return [`${Object.values(err.keyValue)} is used.`]
  }
  return [err.message];
};
const error = { getErrorMessage };
module.exports = error;
