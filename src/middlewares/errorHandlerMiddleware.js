
const errorHandlerMiddleware = (err, req, res, next) => {

    //set status code may be 200 or 500 (200 for success) and 
    // (500 for Internal Server Error is an HTTP status code)
    
    const errorStatusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(errorStatusCode);
    res.json({
      message: err.message,
    });
  };
  
  module.exports = {
    errorHandlerMiddleware
     };