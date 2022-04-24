import ApiResponse from '@core/response'
import { BaseHttpController } from 'inversify-express-utils'

abstract class BaseController extends BaseHttpController {
  protected success<T>(data: T) {
    return ApiResponse.success(data)
  }

  protected error(err: Error, code: number) {
    return ApiResponse.error(err, code)
  }
}

export default BaseController
