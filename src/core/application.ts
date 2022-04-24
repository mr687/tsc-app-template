import express, { NextFunction, Request, Response } from 'express'
import http, { Server } from 'http'

import ApiResponse from '@core/response'
import BaseApplication from '@core/bases/application.base'
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import cors from 'cors'
import helmet from 'helmet'
import { initTerminus } from '@core/terminus'
import morgan from 'morgan'

const createHttpServer = (app: express.Application) => http.createServer(app)
const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof Error) {
    return ApiResponse.error(err, res)
  }

  return next()
}

class Application extends BaseApplication {
  public constructor() {
    super({
      defaultScope: 'Singleton',
    })
  }
  protected configureInjector(_container: Container): void {
    // add injections
  }
  protected configureApp(app: express.Application): void {
    app.use(morgan('combined'))
    app.use(helmet())
    app.use(cors())
    app.use(express.json())
  }
  protected configureAppError(app: express.Application): void {
    app.use(errorMiddleware)
  }
  private onServerError(
    server: Server,
    retryAttempts = 0,
    err: Error & { code: string },
  ) {
    if (err.code === 'EADDRINUSE') {
      // eslint-disable-next-line no-console
      console.log(
        `[Server] Port ${process.env.PORT} is already in use, retriying in 5 seconds`,
      )
      if (retryAttempts < 5) {
        setTimeout(() => {
          this.startServer(server, retryAttempts + 1)
        }, 5000)
      } else {
        throw new Error(
          `[Server] Could not start server on port ${process.env.PORT}, exiting`,
        )
      }
    }
  }
  private onServerListening() {
    // eslint-disable-next-line no-console
    console.log(
      `[Server] Server started on http://127.0.0.1:${process.env.PORT}`,
    )
  }
  private startServer(server: Server, retryAttempts = 0): void {
    if (server.listening) {
      server.close()
    }
    server.listen(process.env.PORT, this.onServerListening)
    server.on('error', this.onServerError.bind(this, server, retryAttempts))
  }
  public async init(): Promise<void> {
    const invApp = new InversifyExpressServer(this.container)
    invApp.setConfig(this.configureApp)
    invApp.setErrorConfig(this.configureAppError)

    const server = initTerminus(createHttpServer(invApp.build()))
    this.startServer(server)
  }
}

new Application()
