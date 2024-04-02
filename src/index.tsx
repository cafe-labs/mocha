import { Route, Router } from '@solidjs/router'
import { render } from 'solid-js/web'
import store from 'store2'

import Layout from './layout'
import Home from './routes/home'
import Proxy from './routes/route'
import Settings from './routes/settings'
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

const root = document.getElementById('root')

render(
  () => (
    <Router root={Layout}>
      <Route path="/" component={Home} />
      <Route path="/route/:route" component={Proxy} />
      <Route path="/settings" component={Settings} />
    </Router>
  ),
  root!
)
