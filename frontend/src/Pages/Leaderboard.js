import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Link, Routes, Route} from "react-router-dom";
import './Leaderboard.css'
import axios from 'axios';

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
    const [scores, setScores] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:3333/accounts')
        .then(res => {
            let retrievedScores = res.data.accounts.map((account) => ({
                score: account.best_score,
                user: account.username
                }));
            let filteredScores = retrievedScores.filter(score => score.score !== undefined);
            filteredScores.sort((a, b) => b.score.wpm - a.score.wpm);   
            setScores(filteredScores);
        });
    }, []);

    return(
        <body>
            <div className="leaderboard-whole-body">
                <div className="leaderboard-title">
                    <h1>Leaderboard</h1>
                </div>
                <div className="leaderboard-main-body">
                    <div className="first-column">
                        <h3>Rank</h3>
                        <ul>
                            {scores.map((score, index) => (
                                <li key={index}> {index + 1} </li>
                            ))}
                        </ul>
                    </div>
                    <div className="second-column">
                        <h3>User</h3>
                        <ul>
                            {scores.map((score, index) => (
                                <li key={index}> {score.user} </li>
                            ))}
                        </ul>
                    </div>
                    <div className="third-column">
                        <h3>WPM</h3>
                        <ul>
                            {scores.map((score, index) => (
                                <li key={index}> {score.score.wpm} </li>
                            ))}
                        </ul>
                    </div>
                    <div className="fourth-column">
                        <h3>Accuracy</h3>
                        <ul>
                            {scores.map((score, index) => (
                                <li key={index}> {score.score.acc}% </li>
                            ))}
                        </ul>
                    </div>
                    <div className="fourth-column">
                        <h3>Date</h3>
                        <ul>
                            {scores.map((score, index) => (
                                <li key={index}> {score.score.date} </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default Leaderboard;