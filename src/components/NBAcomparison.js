import React, { useState, setState, useEffect } from 'react';
import axios from 'axios';
import './NBAcomparison.sass';

const NBAcomparison = props => {

    console.log('props!!!!', props);
    const nbaComp = props.nbaPlayerBio.data;
    console.log('nbaComp', nbaComp)

        return (
        <div id="comp-container">
            <div id="user-adj-stats">
                <div class="stats-header">
                    <h2>Your Stats</h2>
                    <h3>Adjusted for full length NBA game</h3>
                </div>
                <div class="comp-grid-container">
                    <div class="grid-item">{props.adjUserStats.pts} points</div>
                    <div class="grid-item">{props.adjUserStats.ast} assists</div>
                    <div class="grid-item">{props.adjUserStats.reb} rebounds</div>
                    <div class="grid-item">{props.adjUserStats.reb} steals</div>
                </div>
            </div>
            <div id="matched-player-stats">
                <div class="stats-header">
                    <h2>Your NBA Equivalent</h2>
                    <h3>{props.nbaPlayerBio.data ? `${nbaComp.first_name} ${nbaComp.last_name}` : null}</h3>
                </div>
                <div class="comp-grid-container" id="nba-equivalent">
                    <div class="grid-item">{props.matchedNBAplayer ? `${props.matchedNBAplayer.pts} points` : null}</div>
                    <div class="grid-item">{props.matchedNBAplayer ? `${props.matchedNBAplayer.ast} assists` : null}</div>
                    <div class="grid-item">{props.matchedNBAplayer ? `${props.matchedNBAplayer.reb} rebounds` : null}</div>
                    <div class="grid-item">{props.matchedNBAplayer ? `${props.matchedNBAplayer.stl} steals` : null}</div>
                </div>
            </div>
        </div>
        )
    // }

}

export default NBAcomparison;