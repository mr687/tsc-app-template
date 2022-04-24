import { TerminusOptions, createTerminus } from '@godaddy/terminus'

import { Server } from 'http'

export function initTerminus(server: Server): Server {
  const options: TerminusOptions = {}
  return createTerminus(server, options)
}
