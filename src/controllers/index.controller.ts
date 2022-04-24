import { controller, httpGet } from 'inversify-express-utils'

import BaseController from '@core/bases/controller.base'

@controller('/')
class IndexController extends BaseController {
  @httpGet('/')
  public async index() {
    return this.success({
      message: 'Welcome to the API',
    })
  }
}

export default IndexController
