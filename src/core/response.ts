import { Response } from 'express'

interface IResponse {
  status?: boolean
  code?: number
  message?: string
  data?: unknown
  error_statck?: string
}

class ApiResponse {
  public constructor(
    public readonly body: IResponse = {
      status: true,
      code: 200,
      message: 'success',
    },
  ) {}

  public static success(data: unknown, res: Response): void {
    const responseBody = new ApiResponse({ data })
    res.json(responseBody)
    res.end()
  }

  public static error(err: Error, res: Response): void {
    const responseBody = new ApiResponse({
      status: false,
      code: res.statusCode,
      message: err.message,
      error_statck: err.stack,
    })
    res.json(responseBody)
    res.end()
  }
}

export default ApiResponse
