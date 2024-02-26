export interface ErrorObject {
  message?: string;
  description?: string | string[];
  status?: number | string;
}

// eslint-disable-next-line
export default function getErrorObject(error: any): ErrorObject {
  const errorObject: ErrorObject = {};

  if (!error) {
    return errorObject;
  }

  if (typeof error === 'string') {
    errorObject.message = error;

    return errorObject;
  }

  if (error.data && error.data.error && error.data.message) {
    errorObject.message = error.data.error;
    errorObject.description = error.data.message;
  } else if (error.data && error.data.message) {
    errorObject.message = error.data.message;
  } else if (error.data && error.error) {
    errorObject.message = error.data;
    errorObject.description = error.error;
  } else if (error.message && error.stack) {
    errorObject.message = error.message;
    errorObject.description = error.stack;
  } else if (error.error) {
    errorObject.message = error.error;
  }

  if (error.status) {
    errorObject.status = error.status;
  } else if (error.code) {
    errorObject.status = error.code;
  }

  return errorObject;
}
