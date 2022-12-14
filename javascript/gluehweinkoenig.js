var userbase = "";

function submit(data) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                console.log(this.responseText);
                init();
            } else {
                failure("Leider ist ein Fehler aufgetreten. Bitte versuchen sie es erneut.");
            }
        }
    }
    request.open("POST", "php/userlogin.php");
    request.send(data);
}

function init() {
    fetchData("groups", ["Vereine nicht gefunden"]);
    fetchData("users", "Keine Nutzer gefunden.");
    buttonSetupt();
}

function fetchData(resultType, failString, requestString) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var list = transformData(this.responseText);
                result(list, resultType);
            } else {
                result(failString, resultType);
            }
        }
    }
    if (resultType == "groups") {
        request.open("GET", "../php/userhandling.php?action=fetch_grouplist");
    } else {
        request.open("GET", "../php/userhandling.php?action=fetch_userlist");
    }
    request.send();
}

function transformData(data) {
    try {
        return JSON.parse(data);
    } catch (e) {
        return "";
    }
}

function result(data, resultType) {
    if (resultType === "groups") {
        groupResult(data);
    } else {
        userResult(data);
    }
}

function userResult(users) {
    let userList = "";
    if (!Array.isArray(users)) {
        userList = users;
    } else {
        userbase = users;
        for (var x = users.length - 1; x > -1; x--) {
            var row = users[x];
            userList += "<p><span>" + row['user_index'] + " " + row['user_name'] + " " + row['user_group'] + "</span></p>\n";
        }
    }
    $('#active_users').html(userList);
}

function groupResult(groups) {
    let groupSelector = "   <label for display_selection><b>Anzeige:</b><label>\n" +
        "   <select id='year_selection' onchange='displaySwap(this.value)'>\n";
    for (let x of groups) {
        groupSelector += "       <option>" + x['group_name'] + "</option>\n";
    }
    groupSelector += "   </select>\n";
    $('#group_selector').html(groupSelector);
}

function buttonSetupt() {
    let url = window.location.href;
    if (!url.includes("?admin")) {
        $('.team_display').remove();
        $('#loginBlock').removeClass("loginBlock");
        $('#loginBlock').html($('#loginBlock').html());
    } else {
        $('#team_creator').click(function (event) {
            fillTeams();
        });
    }
}

function fillTeams() {
    var teambase = shuffle(userbase);
    var team1 = [];
    var team2 = [];
    var team3 = [];
    var teamList = [team1, team2, team3];
    var j = 0;

    for (var u of teambase) {
        teamList[j].push(u);
        j++;
        if (j == 3) j = 0;
    }

    var teamTable = "<table id='team_table'>\n" +
        "   <caption><strong>Teams</strong></caption>\n" +
        "   <thead>\n" +
        "       <tr>\n";
    for (i = 0; i < teamList.length; i++) {
        teamTable += "           <th id='team" + (i + 1) + "'>Team " + (i + 1) + "</th>\n";
    }
    teamTable += "       </tr>\n" +
        "   </thead>\n" +
        "   <tbody>\n";

    for (var i = 0; i < team1.length; i++) {
        teamTable += "       <tr>\n";
        for (var t = 0; t < teamList.length; t++) {
            var teamEntry = teamList[t];
            if (teamEntry[i]) {
                teamTable += "           <td headers='team" + (parseInt(t) + 1) + "'>" + teamEntry[i]['user_name'] + " " + teamEntry[i]['user_group'] + "</td>\n";
            }
        }
        teamTable += "       </tr>\n";
    }

    teamTable += "   </tbody>\n" +
        "</table>";

    $('#team_display').html(teamTable);
}

function shuffle(array) {

    var randomIndex = 0;
    var currentIndex = array.length;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    randomIndex = Math.floor(Math.random() * array.length);
    [array[0], array[randomIndex]] = [array[randomIndex], array[0]];

    return array;
}