import { render } from 'solid-js/web'
import { Router, Route } from '@solidjs/router'
import './style.css'

import Layout from './layout'
import Home from './routes/home'
import Proxy from './routes/route'
import Settings from './routes/settings'

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
