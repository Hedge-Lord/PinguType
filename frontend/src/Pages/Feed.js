import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Feed.css';

function Feed() {
    const [feedData, setFeedData] = useState([]);

    useEffect(() => {
        const fetchFeedData = async () => {
            try {
                const response = await axios.get('http://localhost:3333/feed');
                setFeedData(response.data.feed);
            } catch (error) {
                console.error('Error fetching feed data:', error);
            }
        };

        fetchFeedData();
    }, []);

    return (
        <div>
            <h1>Feed Page</h1>
            <ul>
                {feedData.map((feedItem) => (
                    <li key={feedItem._id}>
                        <p>{feedItem.activityType}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Feed;