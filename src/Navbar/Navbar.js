import React from "react";
import {
    Link,
} from "react-router-dom";
import './Navbar.css';


export default class Navbar extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            search: props.search,
            activeNav: false,
        }
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.changeSearch = this.changeSearch.bind(this);
    }
    
    componentDidMount() {
        const pathname = window.location.pathname
        if (pathname != '/'){
            console.log('sed')
            this.setState({
                activeNav: true,
            })
        } else {
            this.setState({
                activeNav: false,
            })
        }
    }
    changeUrl(path) {
        if (path != '/'){
            console.log('sed')
            this.setState({
                activeNav: true,
            })
        } else {
            this.setState({
                activeNav: false,
            })
        }
    }

    changeSearch(value) {
        this.setState({search: value});
    }
    
    onChangeSearch(event) {
        this.setState({search: event.target.value});
        this.props.updateSearch(event.target.value)
    }
    
    render() {
        return (
            <div className="nav-shadow">
                <div className="container" style={{marginTop: '10px'}}>
                    <nav className="navbar" >
                        <div className="navbar-brand">
                            <a className="navbar-item" target="_blank" href="https://www.moment.tech">
                                <img src="https://www.moment.tech/wp-content/uploads/2019/08/moment_logHorizon_dark@2x.png" width="142" height="32" />
                            </a>
            
                            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                            </a>
                        </div>
                        <div className="navbar-menu">
                            <div className="navbar-start">
                                <div class="field" style={{marginLeft: '10%', marginTop:'7px'}}>
                                    <p class="control has-icons-left has-icons-right">
                                        <input class="input is-rounded" disabled={this.state.activeNav} placeholder="Movie" value={this.state.search} onChange={this.onChangeSearch}/>
                                        <span class="icon is-small is-left">
                                            <i class="fa fa-film"></i>
                                        </span>
                                    </p>
                                </div>
                            </div>
            
                            <div className="navbar-end">
                                <Link to="/" onClick={() => this.changeUrl('/')} className="navbar-item">Home</Link>
                                <Link to="/author" onClick={() => this.changeUrl('/author')} className="navbar-item">Author</Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}