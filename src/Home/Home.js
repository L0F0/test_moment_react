import React from "react";
import { PropTypes } from 'react'
import './Home.css';
import { 
    url, 
    url_popular, 
    api_key,
    url_movie, 
    img,
    search,
    genre,
    get_by_genre
}  from '../config/api.json';
import moment from "moment";
import Loader from 'react-loader';
import load from '../assets/96x96.gif';


export default class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = { 
            list: ['Actions', 'Art', 'Syfy', 'Adventure'],
            page:1,
            movies:[],
            checked: 0,
            selectedMovie: {
                genres: [],
                website: "",
                id: '',
                lang: '',
                resume:'',
                poster_path:'',
                date:'',
                title:'',
                tagline:''
            },
            isModal: false,
            loading: false,
            search: '',
            ready: false,
            category: false,
            category_id:null,
        };
    }

    onChangeSearch(value) {
        if (value.length > 2) {
            this.setState({movies: [], page: 1, search: value, category: false, category_id:null}, function()  {
                this.getMovies(url + search + api_key + '&query=' + value + '&page=' + this.state.page);
            })
        } else if (value.length === 0) {
            this.setState({movies: [], page:1,search: '', category: false, category_id:null}, function()  {
                this.getMovies(url + url_popular + api_key + '&page=' + this.state.page);
            })
        }
    }

    componentDidMount(){        
        window.addEventListener('scroll', this.scrollCheck.bind(this));        
        this.getMovies(url + url_popular + api_key + '&page=' + this.state.page);
        this.getGenre();
    }

    async getGenre() {
        await fetch(url + genre + api_key)
        .then(res => res.json())
        .then((result) => {
            this.setState({
               list: result.genres
            })
        }).catch((err) => {
            console.error(err);
        })
    }

    async getMovies(targetUrl) {
        this.setState({loading: true})
        await fetch(targetUrl)
            .then(res => res.json())
            .then((result) => {
                const movies = this.state.movies.concat(result.results);
                this.setState({
                    movies: movies,
                    loading: false
                })
                
            }
        )   
    }
    getByGenre(id, name) {
        this.setState({movies: [], page: 1, search: id, category:true, category_id:id}, function()  {
            this.props.getCategory(name);
            this.getMovies(url + get_by_genre + api_key + '&with_genres=' + id + '&page=' + this.state.page);
        })
    }
   

    async getMovieInfo(id) {
        await fetch(url + url_movie + id.toString() + api_key)
        .then(res => res.json())
        .then((result) => {
            this.setState({
                selectedMovie: {
                    genres: result.genres ? result.genres : [],
                    website: result.homepage,
                    id: result.id,
                    lang: result.original_language ? result.original_language.toUpperCase() : '',
                    resume: result.overview,
                    poster_path:result.poster_path,
                    date: result.release_date,
                    title: result.title,
                    tagline: result.tagline
                },
            })
        }).catch((err) => {
            console.error(err);
        })
        this.setState({
            checked: id,
            isModal: true,
        })
        
    }

    closeModal() {
        this.setState({
            selectedMovie: {
                genres: [],
                website: "",
                id: '',
                lang: '',
                resume:'',
                poster_path:'',
                release_date:'',
                title:'',
                tagline:'',
            },
            isModal: false,
            checked: 0,
        })
    }

    getImage(id) {
        return (img.replace('{movie_id}', id).toString());
    }

    scrollCheck() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop
        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight
        const scrolled = winScroll / height
        if (scrolled > 0.95) {
            this.setState({
                page: this.state.page + 1,
            }, function(){
                let targetUrl = "";
                if (this.state.category) {
                    targetUrl = url + get_by_genre + api_key + '&with_genres=' + this.state.category_id + '&page=' + this.state.page
                } else if (this.state.search.length > 2) {
                    targetUrl = url + search + api_key + '&query=' + this.state.search + '&page=' + this.state.page
                } else {
                    targetUrl = url + url_popular + api_key + '&page=' + this.state.page
                }
                console.log(targetUrl);
                this.getMovies(targetUrl);
            })
        }
    };

    render(){
        return (
            <div className="home">
                <div className="sidebar" style={{display:'inline-block'}}>
                    <h4 class="title is-4">Categorie</h4>
                    <div className="list">
                        {this.state.list.map((category) => (
                            <div onClick={ () => this.getByGenre(category.id, category.name) } style={{cursor: 'pointer', zIndex:100}}>
                                <span >
                                    <h2 class="subtitle sub-color">{category.name}</h2>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="content">
                    
                        {this.state.movies.length > 0 ?
                            this.state.movies.map((movie, key) => (
                                <div onClick={ () => this.getMovieInfo(movie.id) } className={'box movies flex ' + (movie.id == this.state.checked ? "activated" : "") } >
                                    <div>
                                        <div>
                                            <h1 className="title">{ movie.original_title }</h1>
                                        </div>
                                        <div className='flex'>
                                            <span class="icon">
                                                <i class="fa fa-history"></i>
                                            </span>
                                            <h6 class="subtitle is-6">{moment(movie.release_date).format('LL')}</h6>
                                        </div>
                                        <div className="resume">
                                            <div className="subtitle is-5 crop">{movie.overview}</div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <figure class="image is-128x128">
                                            {movie.poster_path ? 
                                            <img src={this.getImage(movie.poster_path)}/>
                                            : <img src={load}/>
                                            }
                                        </figure>
                                    </div>
                                </div>
                            ))
                        :
                        !this.state.loading ?
                            <article class="message is-danger">
                                <div class="message-body">
                                    No movie found with that name :'(
                                </div>
                            </article>
                            :
                            null
                        }
                        { this.state.loading ?
                            <div style={{marginLeft: '40%'}}>
                                <figure class="image is-64x64">
                                    <img src={load} />
                                </figure>
                            </div> 
                            :
                            null
                        }
                </div>
                <div className="movieDetail">
                    <div className={"modal " + (this.state.isModal ? 'is-active': '')}>
                        <div class="modal-card box_shadow">
                            <header class="modal-card-head">
                                <p class="modal-card-title">
                                    <p>{this.state.selectedMovie.title}</p>
                                    <p class="subtitle is-6">{this.state.selectedMovie.tagline}</p>
                                </p>

                                <button class="delete" aria-label="close" onClick={() => this.closeModal()}></button>
                            </header>
                            <section class="modal-card-body">
                                <div className='flex' style={{width: '100%'}}>
                                    <div className='flex'>
                                        <span class="icon">
                                            <i class="fa fa-history"></i>
                                        </span>
                                        <h6 class="subtitle is-6">{moment(this.state.selectedMovie.release_date).format('L')}</h6>
                                    </div>
                                    <div className='flex tags'>
                                        {this.state.selectedMovie.genres.map((genre) => (
                                            <div style={{padding: '5px'}}>
                                                <span class="tag is-primary">{genre.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div style={{marginTop:'20px'}}>
                                    <article class="message">
                                        <div class="message-body" style={{fontStyle:'italic'}}>
                                            "{this.state.selectedMovie.resume}"
                                        </div>
                                    </article>
                                </div>
                                <div style={{marginTop:'20px'}}>
                                    <span>Language:</span>
                                    <span class="tag" style={{marginLeft:'10px'}}>{this.state.selectedMovie.lang}</span>
                                </div>
                                <div>

                                </div>
                            </section>
                            <footer class="modal-card-foot">
                               <a target='_blank' href={this.state.selectedMovie.website}>
                                    <span class="icon is-small">
                                        <i class="fa fa-globe"></i>
                                    </span>
                                </a>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}