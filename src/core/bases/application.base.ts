import { Container, interfaces } from 'inversify'

interface IBaseApplication {
  init(): Promise<void>
}

abstract class BaseApplication implements IBaseApplication {
  protected readonly container: Container
  protected readonly containerOptions: interfaces.ContainerOptions

  public constructor(options: interfaces.ContainerOptions) {
    this.containerOptions = options
    this.container = new Container(options)

    // eslint-disable-next-line no-console
    console.clear()

    this.configureInjector(this.container)
    this.init()
  }
  protected abstract configureInjector(container: Container): void
  public abstract init(): Promise<void>
}

export default BaseApplication
