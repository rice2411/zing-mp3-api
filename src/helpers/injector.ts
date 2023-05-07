const injector = async (req, res, next) => {
  res.success = (message = "OK", data = null, statusCode = 200) => {
    let responseObj: any = {
      success: true,
      message: message || "OK",
    };
    if (data !== null && data.data && data.paginate) {
      responseObj = {
        ...responseObj,
        data: data.data,
        paginate: data.paginate,
      };
    } else {
      responseObj = { ...responseObj, data: data };
    }
    if (statusCode < 200 || statusCode > 299) statusCode = 200;
    return res.status(statusCode).json(responseObj);
  };
  res.errors = (
    message = "Yêu cầu thất bại.",
    statusCode = 400,
    errorType = "undefined"
  ) => {
    let responseObj = {
      success: false,
      errorCode: errorType,
      message: message || "Yêu cầu thất bại.",
    };
    if (statusCode >= 200 && statusCode <= 299) statusCode = 400;
    return res.status(statusCode).json(responseObj);
  };

  res.paginate = (data = null, message = "OK", statusCode = 200) => {
    let responseOb: any = {
      success: true,
      message: message || "OK",
    };
    if (data) {
      if (data.docs) {
        responseOb = { ...responseOb, data: data.docs };
      } else responseOb = { ...responseOb, data: data };

      if (data.totalDocs) {
        // Pagination model
        delete data.docs;
        responseOb = { ...responseOb, pagination: data };
      }
    }
    if (statusCode < 200 || statusCode > 299) statusCode = 200;
    return res.status(statusCode).json(responseOb);
  };

  next();
};

export default injector;
