import React from "react"
import PropTypes from "prop-types"
import AllItems from './AllItems'
import Item from './Item'
import Header from './Header'
import Footer from './Footer'

import { BrowserRouter, Switch, Route, withRouter} from 'react-router-dom'

class App extends React.Component {
  render () {

    return (
      <div>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={withRouter(AllItems)} />
            <Route path='/item/:id' component={withRouter(Item)} />
            </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App
