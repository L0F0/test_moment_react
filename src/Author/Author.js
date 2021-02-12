import React from "react";
import student from '../assets/pngguru.com.png'
import pp from '../assets/stationF.jpeg'
import cv from '../assets/CV.pdf'

const authorData = {
    "fName": "Yaniss",
    "lName": "PHERON",
    "email": "yaniss.pheron@epitech.eu",
    "job": "Developer",
    "phone": "+ 33 6 95 77 22 43",
    "address": "29 rue albert caron, 92150 Suresnes, FRANCE",
    "linkedinURL": "https://www.linkedin.com/in/yaniss-pheron-epitech/",
    "gitlabURL": "https://gitlab.com/Yaniss",
    "githubURL": "https://github.com/L0F0",
    "aboutMe": "Hello, I'm Yaniss, student developer in 5th at Epitech Paris. I've a rich experience with web development and I'm also very attracted by embeded systems and IoT in general. Here is the techno that I already used in the past...",
    "technos": [
        "React JS",
        "Angular 2+",
        "NodeJS",
        "C / C++",
        "Git",
        "Linux",
        "Mysql",
        "MongoDB",
        "GraphQL",
        "Embeded systems",
        "PHP",
        "CSS",
        "HTML",
    ],
    "knowledges": [
        "Python",
        "Java",
        "React Native",
        "Android Studio",
        "Angular JS"
    ]

}

export default class Author extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <div style={{width: '100vw', height:'100vh'}}>
                <div class="hero is-primary is-bold">
                    <div class="hero-body">
                        <div class="container">
                            <div class="columns" style={{ padding: '10%' }}>
                                <div class="column is-8">
                                    <h1 class="title is-1">{authorData.fName} {authorData.lName}</h1>
                                    <h3 class="subtitle is-3">{authorData.job}</h3>
                                    <div>
                                        <p>
                                            <span class="icon has-text-black-bis">
                                                <i class="fa fa-envelope" aria-hidden="true"></i>
                                            </span>
                                            &nbsp;&nbsp;{authorData.email}
                                        </p>
                                        <p>
                                            <span class="icon has-text-black-bis">
                                                <i class="fa fa-phone" aria-hidden="true"></i>
                                            </span>
                                            &nbsp;&nbsp;{authorData.phone}
                                        </p>
                                        <p>
                                            <span class="icon has-text-black-bis">
                                                <i class="fa fa-map-marker" aria-hidden="true"></i>
                                            </span>
                                            &nbsp;&nbsp;{authorData.address}
                                        </p>
                                    </div>
                                    <div class="is-3 " style={{ marginTop: ' 2%' }}>
                                        <a href={authorData.linkedinURL} style={{ textDecoration: 'none' }}>
                                            <span class="icon has-text-black-bis is-large">
                                                <i class="fa fa-linkedin-square" style={{ fontSize: '38px' }}></i>
                                            </span>
                                        </a>
                                        <a href={authorData.githubURL} style={{ textDecoration: 'none' }}>
                                            <span class="icon has-text-black-bis is-large">
                                                <i class="fa fa-github" style={{ fontSize: '38px' }}></i>
                                            </span>
                                        </a>
                                        <a href={authorData.gitlabURL} style={{ textDecoration: 'none' }}>
                                            <span class="icon has-text-black-bis is-large">
                                                <i class="fa fa-gitlab" style={{ fontDize: '38px' }}></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                                <div class="column">
                                    <img style={{ borderRadius: '50%' }} width="270" height="270" src={pp} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="hero is-light" >
                            <div class="hero-body">
                                <div class="container">
                                    <div class="columns" style={{ padding: '10%' }}>
                                        <div class="column is-6">
                                            <img width="600" height="600" src={student} />
                                        </div>
                                        <div class="column is-1"></div>
                                        <div class="column is-6">
                                            <h3 class="subtitle is-3 has-text-grey-dark">About me</h3>
                                            <p>{authorData.aboutMe}</p>
                                            <div style={{ marginTop: '3%' }}>
                                                {authorData.technos.map((techno) => (
                                                    <span style={{ padding: '5px 0px 0px 5px' }}>
                                                        <span class="tag is-primary" style={{ marginTop: '1%' }}>{techno}</span>
                                                    </span>
                                                ))}
                                            </div>
                                            <p style={{ marginTop: '3%' }}>
                                                But I also know that...
                                                </p>
                                            <div style={{ marginTop: '3%' }}>
                                                {authorData.knowledges.map((knowledge) => (
                                                    <span>
                                                        <span class="tag is-info" style={{ marginTop: '1%' }}>{knowledge}</span>&nbsp;&nbsp;
                                                    </span>
                                                ))}
                                            </div>
                                            <div style={{ marginTop: '5%' }}>
                                                <a class="button is-success is-outlined" href={cv} target="_blank">
                                                    <span>Download my CV</span>
                                                    <span class="icon is-small">
                                                        <i class="fa fa-download" aria-hidden="true"></i>
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer class="footer" >
                    <div class="has-text-centered">
                        <p>Made with 💕 by Yaniss</p>
                    </div>
                </footer>
            </div>
        )
    }
}