import {
  HealthCheckError,
  TerminusOptions,
  createTerminus,
} from '@godaddy/terminus'

import { Server } from 'http'

const onHealthCheck = async ({ state }) => {
  // eslint-disable-next-line no-console
  console.log('[Health Check] onHealthCheck', state)
  throw new HealthCheckError(
    'healthcheck failed',
    new Error('healthcheck failed'),
  )
}
const onSignal = async () => {
  // eslint-disable-next-line no-console
  console.log('[Health Check] onSignal')
}
const onShutdown = async () => {
  // eslint-disable-next-line no-console
  console.log('[Health Check] onShutdown')
}

const onSigterm = async () => {
  // eslint-disable-next-line no-console
  console.log('[Health Check] onSigterm')
}

export function initTerminus(server: Server): Server {
  const options: TerminusOptions = {
    signals: ['SIGINT', 'SIGTERM'],
    healthChecks: {
      '/healthcheck': onHealthCheck,
    },
    timeout: 1e4,
    caseInsensitive: true,
    onSignal,
    onShutdown,
    onSigterm,
  }
  return createTerminus(server, options)
}
