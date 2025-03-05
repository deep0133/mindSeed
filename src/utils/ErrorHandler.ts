class ErrorHanlder extends Error {
  statusCode: number;
  errors: any;
  constructor(message: string, errors: any, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export default ErrorHanlder;
