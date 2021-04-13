enum ERR_CODE {
  //Http Error
  OK = 200,

  MULTIPLE_CHOICE = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  LOCKED = 423,
  TWO_EARLY = 425,
  TWO_MANY_REQUESTS = 429,

  INTERNAL_SERVER_ERROR = 500,

  //Error in try catch (when use library)
  TYPEORM_ERROR = 600,

  //Business Error from 1000:
  //EmployeeModule
  EMPLOYEE_CREATE_ERROR = 1000,
  EMPLOYEE_EXIST = 1001,
  EMPLOYEE_INVALID_NAME = 1002,
  EMPLOYEE_INVALID_CCCD = 1003,
  EMPLOYEE_UPLOAD_AVA_ERROR= 1004,

  //OtherModule from 2000, 
  
}

export default ERR_CODE;