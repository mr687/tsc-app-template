interface IResponse<T = unknown> {
  status?: boolean
  code?: number
  message?: string
  data?: T
  error_statck?: string
}

class ApiResponse {
  public readonly body: IResponse
  public constructor(_body: IResponse) {
    this.body = Object.assign(
      {
        status: true,
        code: 200,
        message: 'success',
        data: null,
        error_statck: null,
      },
      _body,
    )
  }

  public static success<T>(data: T, message = 'success') {
    return new ApiResponse({ data, message }).body
  }

  public static error(err: Error, code: number) {
    return new ApiResponse({
      status: false,
      code: code,
      message: err.message,
      error_statck: err.stack,
    }).body as IResponse<never>
  }
}

export default ApiResponse
