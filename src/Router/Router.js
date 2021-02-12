import React, { useState } from "react";
import { PropTypes } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Home from '../Home/Home';
import Author from '../Author/Author';
import Navbar from '../Navbar/Navbar';


export default class Routes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
        }
        this.homeChild = React.createRef();
        this.navChild = React.createRef();
        this.updateSearch = this.updateSearch.bind(this);
        this.getCategory = this.getCategory.bind(this);
        
    }

    updateSearch(value) {
        this.homeChild.current.onChangeSearch(value)
    }

    getCategory(value) {
        this.setState({
            search: '#' + value
        }, function () {
            this.navChild.current.changeSearch(this.state.search)
        })
        
    }

    render(){
        return (
            <Router>
                <Navbar ref={this.navChild} search={this.state.search} updateSearch={this.updateSearch}/>
                <Switch>
                    <Route path="/author" component={Author}/>
                    <Route path="/">
                        <Home ref={this.homeChild} getCategory={this.getCategory}/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}
