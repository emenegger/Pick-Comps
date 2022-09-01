import React, { useState, setState, useEffect } from 'react';
import axios from 'axios';
import './UserInput.sass';
import NBAcomparison from './NBAcomparison';

const UserInputContainer = props => {

    // console.log('UserInputCont props', props)

    const [userInput, setUserInput] = useState({
        gameTo: null,
        pts: null,
        ast: null,
        reb: null,
        stl: null,
        blk: null
    })

    const [adjUserStats, setAdjUserStats] = useState({
        gameTo: null,
        pts: null,
        ast: null,
        reb: null,
        stl: null,
        blk: null
    })

    const [matchedNBAplayer, setMatchedNBAplayer] = useState();
    
    const [nbaPlayerStats, setNbaPlayerStats] = useState([])
    
    useEffect(() => {
        getNbaPlayerStats()
    }, []);

    useEffect(() => {
        console.log('nbaPlayerStats', nbaPlayerStats)
    }, [nbaPlayerStats])


    const [nbaPlayerBio, setNBAplayerBio] = useState([])

    useEffect(() => {
        getNBAplayerBio()
    }, [matchedNBAplayer])

    const getNBAplayerBio = async () => {
        console.log(matchedNBAplayer.player_id)
        const result = await axios.get(`https://www.balldontlie.io/api/v1/players/${matchedNBAplayer.player_id}`)
        setNBAplayerBio(result)
    }


    const getNbaPlayerStats = async () => {
        const arr = [];
        // Rate limit of 60 requests per minute
        for (let i = 2; i < 25; i++) {
            const result = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${i}`)
            arr.push(result.data.data[0]);
        }
        // this sets the state property of nbaPlayerStats to the arr we created and pushed into
        setNbaPlayerStats(arr);
    }
    
    const leagueAverageTeamPoints = 110.6;

    const adjustUserStats = (inputStats, currLeagueAverPoints) => {
        const adjustedUserStatsObj = {};
        const factor = currLeagueAverPoints / inputStats.gameTo * (30/48);
        // console.log(factor);
        for (const key in inputStats) {
            // console.log(key);
            adjustedUserStatsObj[key] = Math.floor(inputStats[key] * factor);
        }
        return adjustedUserStatsObj;
    }

    const playerMatchFunc = (adjustedUserStats, apiData) => {
        console.log('apiData', apiData);
        console.log('userAdjusted stats', adjustedUserStats)

        const bestMatch = {
            simalarityTotal: Infinity,
            player_id: null,
            pts: null,
            ast: null,
            reb: null,
        }

        for (const playerObj of apiData) {
            if (playerObj){
                const diff = (a, b) => Math.abs(a - b);
                // refactor this!!!
                const simalarityTotal = diff(adjustedUserStats.pts, playerObj.pts) + diff(adjustedUserStats.ast, playerObj.ast) + diff(adjustedUserStats.reb, playerObj.reb)
                console.log(playerObj.player_id, simalarityTotal);
                if (simalarityTotal < bestMatch.simalarityTotal) {
                    bestMatch.simalarityTotal = simalarityTotal;
                    bestMatch.player_id = playerObj.player_id;
                    bestMatch.pts = playerObj.pts;
                    bestMatch.ast = playerObj.ast;
                    bestMatch.reb = playerObj.reb;
                    bestMatch.stl = playerObj.stl;
                }
            }
        }

        console.log('bestMatch', bestMatch);
        // should I save this to the state?
        return bestMatch;
    }
    
    const handleUserInput = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        // create the object and add the values into it then pass this into the setUserInput
        // const rawUserStatsObj = {
        //     gameTo: null,
        //     pts: null,
        //     ast: null,
        //     reb: null,
        //     stl: null,
        //     blk: null,
        // };
        // for (const key in rawUserStatsObj) {
        //     // console.log(key, [e.target.id]);
        //     if ([e.target.id] == key) {
        //         console.log(true, [e.target.id], key)
        //         rawUserStatsObj[key] = e.target.value
        //     };
        // }
        // console.log(rawUserStatsObj)
        // console.log('rawUserStatsObj',rawUserStatsObj);
        setUserInput({
            ...userInput,
            [e.target.id]: e.target.value,
        })
    }

    // const [matchedNBAplayer, setMatchedNBAplayer] = useState();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('props.state', props.state);
        console.log('userInput', userInput);
        const adjustedStats = adjustUserStats(userInput, leagueAverageTeamPoints);
        setAdjUserStats(adjustedStats);
        // playerMatchFunc(adjustedStats, nbaPlayerStats);
        const matchedPlayerStats = playerMatchFunc(adjustedStats, nbaPlayerStats);
        console.log(matchedPlayerStats);
        setMatchedNBAplayer(matchedPlayerStats);

    // Updating state?? 
        // for (const key in props.state.userStats) {
        //     props.state.userStats[key] = adjustedStats[key];
        // }
        // for (const key in props.state.nbaPlayerStats) {
        //     props.state.nbaPlayerStats[key] = matchedPlayerStats[key];
        // }
        // console.log('new user stats', props.state);

    // Vanilla JS DOM Manipulation
        // const node = document.createElement("li");
        // const textnode = document.createTextNode(`${matchedPlayerStats.pts} ppg`);
        // node.appendChild(textnode);
        // document.getElementById("player-stat-list").appendChild(node);

    }
    


    return (
        <div id="player-comp-container">
        <div className="player-comp">
            <h1>PICKUP COMPS</h1>
            <h3>A tool to compare your stats to current NBA players</h3>
            <h4 id='header-1'>Enter your pick up game stats below:</h4>
                <label for="inp" class="inp">
                    <input type="text" id="gameTo" placeholder="&nbsp;" onChange={handleUserInput}/>
                    <span class="label">Game To</span>
                    <span class="focus-bg"></span>
                </label>
                    <label for="inp" class="inp">
                    <input type="text" id="pts" placeholder="&nbsp;" onChange={handleUserInput}/>
                    <span class="label">Points</span>
                    <span class="focus-bg"></span>
                </label>
                    <label for="inp" class="inp">
                    <input type="text" id="ast" placeholder="&nbsp;" onChange={handleUserInput}/>
                    <span class="label">Assists</span>
                    <span class="focus-bg"></span>
                </label>
                    <label for="inp" class="inp">
                    <input type="text" id="reb" placeholder="&nbsp;" onChange={handleUserInput}/>
                    <span class="label">Rebounds</span>
                    <span class="focus-bg"></span>
                </label>
                <label for="inp" class="inp">
                    <input type="text" id="steals" placeholder="&nbsp;" onChange={handleUserInput}/>
                    <span class="label">Steals</span>
                    <span class="focus-bg"></span>
                </label>
                <label for="inp" class="inp">
                    <input type="text" id="blocks" placeholder="&nbsp;" onChange={handleUserInput}/>
                    <span class="label">Blocks</span>
                    <span class="focus-bg"></span>
                </label>
                <button type="submit" class="btn" onClick={handleSubmit}>Submit</button>
        </div>
            { matchedNBAplayer !== undefined && nbaPlayerBio !== undefined ? 
                < NBAcomparison 
                    nbaPlayerStats={nbaPlayerStats}
                    userStats={userInput} 
                    adjUserStats={adjUserStats}
                    matchedNBAplayer={matchedNBAplayer}
                    nbaPlayerBio={nbaPlayerBio}
                /> : null
            }
            {/* < NBAcomparison 
                nbaPlayerStats={nbaPlayerStats}
                userStats={userInput} 
                adjUserStats={adjUserStats}
                matchedNBAplayer={matchedNBAplayer}
            /> */}
        </div>
    )

}

export default UserInputContainer;