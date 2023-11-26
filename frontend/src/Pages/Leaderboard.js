import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Link, Routes, Route} from "react-router-dom";
import './Leaderboard.css'

function retrieveTop5() {
    const user1 = {userName:"George", WPM:200, date: "11/13/2023"};
    const user2 = {userName:"Jacob", WPM:114, date: "11/24/2023"};
    const user3 = {userName:"Allison", WPM:101, date: "11/13/2023"};
    const user4 = {userName:"Backend Demon", WPM:94, date: "11/24/2023"};
    const user5 = {userName:"Radhika", WPM:20, date: "11/13/2023"};
    const top5array = [user1, user2, user3, user4, user5]
    return top5array
}


function Leaderboard() {
    return(
        <body>
            <div className="leaderboard-whole-body">
                <div className="leaderboard-title">
                    <h1>Leaderboard</h1>
                </div>
                <div className="leaderboard-main-body">
                    <div className="first-column">
                        <h3>Rank</h3>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                    </div>
                    <div className="second-column">
                        <h3>User</h3>
                        <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}><p className="second-column-elements">{retrieveTop5()[0].userName}</p></Link>
                        <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}><p className="second-column-elements">{retrieveTop5()[1].userName}</p></Link>
                        <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}><p className="second-column-elements">{retrieveTop5()[2].userName}</p></Link>
                        <Link to="/profile"style={{ textDecoration: 'none', color: 'black' }}><p className="second-column-elements">{retrieveTop5()[3].userName}</p></Link>
                        <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}><p className="second-column-elements">{retrieveTop5()[4].userName}</p></Link>
                    </div>
                    <div className="third-column">
                        <h3>WPM</h3>
                        <p>{retrieveTop5()[0].WPM}</p>
                        <p>{retrieveTop5()[1].WPM}</p>
                        <p>{retrieveTop5()[2].WPM}</p>
                        <p>{retrieveTop5()[3].WPM}</p>
                        <p>{retrieveTop5()[4].WPM}</p>
                    </div>
                    <div className="fourth-column">
                        <h3>Date</h3>
                        <p>{retrieveTop5()[0].date}</p>
                        <p>{retrieveTop5()[1].date}</p>
                        <p>{retrieveTop5()[2].date}</p>
                        <p>{retrieveTop5()[3].date}</p>
                        <p>{retrieveTop5()[4].date}</p>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default Leaderboard;