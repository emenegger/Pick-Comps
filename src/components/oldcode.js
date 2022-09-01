
    // the first arg is the name of the state, the second is the func
    const [nbaPlayerStats, setNbaPlayerStats] = useState([])
    // const [nbaPlayerBio, setPlayerBio] = useState([])

// use axios
    // use effect's second arg is a dependency and what the function depends on to run
    // if you give an empty array it will run on page load.
    // when you set it, you're not able to access it immediately
    // you can put anything inside the dependency
    // so once nbaPlayerStats is changed in the testFetch
    useEffect(() => {
        console.log('nbaPlayerStats', nbaPlayerStats)
    }, [nbaPlayerStats])

    useEffect(() => {
        getNbaPlayerStats()
    }, []);

    // useEffect(() => {
    //     matchIdToPlayerFunc()
    // }, [playerMatchFunc]);


    const getNbaPlayerStats = async () => {
        const arr = [];
        // Rate limit of 60 requests per minute
        for (let i = 2; i < 10; i++) {
            const result = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${i}`)
            arr.push(result.data.data.first_name);
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
                // const simalarityTotal =  (adjustedUserStats.pts / playerObj.pts + adjustedUserStats.ast / playerObj.ast + adjustedUserStats.reb / playerObj.reb) / 3
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
                }
            }
        }

        console.log(bestMatch);

        return bestMatch;
    }

    // const matchIdToPlayerFunc = async (id) => {
    //     const result = await axios.get(`https://www.balldontlie.io/api/v1/players/${id}`);
    //     console.log('result in match func', result);
    //     console.log('result.data.data[0]', result.data.data[0]);
    //     setPlayerBio(result);
    // }
    
    const handleUserInput = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        setUserInput({
            ...userInput,
            [e.target.id]: e.target.value,
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('userInput', userInput)
        const adjustedStats = adjustUserStats(userInput, leagueAverageTeamPoints);
        playerMatchFunc(adjustedStats, nbaPlayerStats);
        const playerStatMatch = playerMatchFunc(adjustedStats, nbaPlayerStats);
        console.log(playerStatMatch.player_id)
        // matchIdToPlayerFunc(playerStatMatch.player_id)
        // const returnedPlayerBio = matchIdToPlayerFunc(playerStatMatch.player_id);
        // console.log(returnedPlayerBio);
    }