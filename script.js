//get today's data in yyyy-mm-dd format
const today = new Date().toISOString().split('T')[0];
console.log(today);

// const today = '2025-05-20';

//IPL teams
const iplTeams = [
    "Chennai Super Kings",
    "Mumbai Indians",
    "Royal Challengers Bangalore",
    "Kolkata Knight Riders",
    "Rajasthan Royals",
    "Sunrisers Hyderabad",
    "Delhi Capitals",
    "Punjab Kings",
    "Lucknow Super Giants",
    "Gujarat Titans"
  ];

//funtion that returns the filtered match data
const getFilteredMatchData = (data, iplTeams, today) => {
    const matchData = data;
  
    const checkTeams = (teams) => {
      return teams.every(team => iplTeams.includes(team));
    };
  
    const filteredMatches = matchData[0]?.data?.filter(match => {
      return match.date === today && checkTeams(match.teams);
    });
  
    return filteredMatches;
  };

// using axios get the data from the api
const apiurl = "https://api.cricapi.com/v1/currentMatches?apikey=4e72174d-0eb9-43c4-94b9-5dd106650e01&offset=1";

// store the response in a variable using async/await
const getData = async () => {
    try {
        const response = await axios.get(apiurl);
        let matchData = response.data;
        return matchData;
    } catch (error) {
        console.error(error);
        return null;
    }
};

getData().then(data => {
    if (data) {
        console.log(data);
        let listData = [data]
        const result = getFilteredMatchData(listData, iplTeams, today);
        // console.log(result);
        let team1Runs = result?.[0]?.score?.[0]?.r ?? '';
        let team2Runs = result?.[0]?.score?.[1]?.r ?? '';
        let team1Wickets = result?.[0]?.score?.[0]?.w ?? '';
        let team2Wickets = result?.[0]?.score?.[1]?.w ?? '';
        let team1Overs = result?.[0]?.score?.[0]?.o ?? '';
        let team2Overs = result?.[0]?.score?.[1]?.o ?? '';
        let team1Name = result?.[0]?.teams?.[0] ?? '';
        let team2Name = result?.[0]?.teams?.[1] ?? '';
        let team1Image = result?.[0]?.teamInfo?.[0]?.img ?? 'https://picsum.photos/200';
        let team2Image = result?.[0]?.teamInfo?.[1]?.img ?? 'https://picsum.photos/200';

        //modfiy the width of the image to 200
        team1Image = team1Image.replace(/w=\d+/, 'w=200');
        team2Image = team2Image.replace(/w=\d+/, 'w=200');

        let matchTeamName = `${team1Name} vs ${team2Name}`;
        let liveScore = `Score: ${team1Runs}-${team1Wickets} (${team1Overs}) | ${team2Runs}-${team2Wickets} (${team2Overs})`;
        //use jquery to update the html
        $('#matchTeamName').text(matchTeamName);
        $('#liveScore').text(liveScore);
        $('#team1Logo').attr('src', team1Image);
        $('#team2Logo').attr('src', team2Image);
        console.log(team1Runs, team2Runs, team1Wickets, team2Wickets, team1Overs, team2Overs, team1Name, team2Name);
    }
});

$('#liveScoreButton').on('click', function() {
    getData().then(data => {
        if (data) {
            console.log(data);
            let listData = [data];
            const result = getFilteredMatchData(listData, iplTeams, today);
            let team1Runs = result?.[0]?.score?.[0]?.r ?? '';
            let team2Runs = result?.[0]?.score?.[1]?.r ?? '';
            let team1Wickets = result?.[0]?.score?.[0]?.w ?? '';
            let team2Wickets = result?.[0]?.score?.[1]?.w ?? '';
            let team1Overs = result?.[0]?.score?.[0]?.o ?? '';
            let team2Overs = result?.[0]?.score?.[1]?.o ?? '';
            let team1Name = result?.[0]?.teams?.[0] ?? '';
            let team2Name = result?.[0]?.teams?.[1] ?? '';
            //Sometime the image sequence is not correct, so we need to find the image from the teamInfo array
            let team1Image = result?.[0]?.teamInfo?.find(team => team.name === team1Name)?.img ?? 'https://picsum.photos/200';
            let team2Image = result?.[0]?.teamInfo?.find(team => team.name === team2Name)?.img ?? 'https://picsum.photos/200';

            //modfiy the width of the image to 200
            team1Image = team1Image.replace(/w=\d+/, 'w=200');
            team2Image = team2Image.replace(/w=\d+/, 'w=200');

            let matchTeamName = `${team1Name} vs ${team2Name}`;
            let liveScore = `Score: ${team1Runs}-${team1Wickets} (${team1Overs}) | ${team2Runs}-${team2Wickets} (${team2Overs})`;
            //use jquery to update the html
            $('#matchTeamName').text(matchTeamName);
            $('#liveScore').text(liveScore);
            $('#team1Logo').attr('src', team1Image);
            $('#team2Logo').attr('src', team2Image);
            console.log(team1Runs, team2Runs, team1Wickets, team2Wickets, team1Overs, team2Overs, team1Name, team2Name);
        }
    });
});