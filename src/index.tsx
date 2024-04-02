import { render } from 'solid-js/web'
import { Router, Route } from '@solidjs/router'
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
