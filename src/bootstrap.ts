import 'dotenv/config'
import 'reflect-metadata'

import App from '@core/application'

const args = process.argv.slice(2)
if (args) {
  switch (args[0].replace('--', '')) {
    case 'server':
      new App()
      break
    case 'worker':
      // eslint-disable-next-line no-console
      console.log('[Worker] Starting worker...')
      break
  }
}
