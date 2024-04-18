import { Route, Router } from '@solidjs/router'
import { render } from 'solid-js/web'
import store from 'store2'
import { handleDebug } from './lib/settings/debug'

import Layout from './layout'
import FAQ from './routes/faq'
import Games from './routes/games'
import Home from './routes/home'
import Proxy from './routes/route'
import Settings from './routes/settings'
import Shortcuts from './routes/shortcuts'
import './style.css'

store.set(
  'tab',
  {
    name: null,
    icon: null
  },
  false
)

store.set(
  'panic',
  {
    key: null,
    url: null
  },
  false
)

store.set(
  'aboutblank',
  {
    enabled: false
  },
  false
)

store.set(
  'theme',
  {
    theme: null
  },
  false
)

store.set(
  'debug',
  {
    enabled: false
  },
  false
)

store.set(
  'transport',
  {
    transport: 'epoxy'
  },
  false
)

store('swReady', false)

// Debug is here to capture all logs
handleDebug()

const root = document.getElementById('root')

render(
  () => (
    <Router root={Layout}>
      <Route path="/" component={Home} />
      <Route path="/route/:route" component={Proxy} />
      <Route path="/games" component={Games} />
      <Route path="/shortcuts" component={Shortcuts} />
      <Route path="/faq" component={FAQ} />
      <Route path="/settings" component={Settings} />
    </Router>
  ),
  root!
)
