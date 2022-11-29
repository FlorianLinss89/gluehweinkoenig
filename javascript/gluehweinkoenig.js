var form = document.querySelector('form');
form.addEventListener('submit', function (event) {
   event.preventDefault();
   var data = new FormData(form);
   submit(data);
});

var userbase ="";

function init() {
    fetchgroups();
    fetchUsers();
    buttonSetupt();
}

function transformData(data) {
    try {
        return JSON.parse(data);
    }
    catch(e) {
        return "";
    }
}

function fetchgroups() {

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var groupList = (this.responseText);
            groupsuccess(transformData(groupList));
        } else {
            groupfailure();
        }
    }
    request.open("GET","../php/userhandling.php?action=fetch_grouplist");
    request.send();
}

function fetchUsers() {

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var userList = (this.responseText);
            usersuccess(transformData(userList));
        } else {
            failure("Keine Nutzer gefunden.");
        }
    }
    
    request.open("GET","../php/userhandling.php?action=fetch_userlist");
    request.send();
}

function buttonSetupt() {
    $('#team_creator').click(function(event) {
        teamCreator();
    });
}

function submit(data){

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            init();
        } else {
            failure("Leider ist ein Fehler aufgetreten. Bitte versuchen sie es erneut.");
        }
    }
    request.open("POST","../php/userlogin.php");
    request.send(data);
}

function usersuccess(users) {
    
    var userList = "";
    userbase = users;
    for(var x=users.length-1; x>-1; x--) {
        var row = users[x];
        userList +=  "<p><span>" + row['user_index'] + " " + row['user_name'] + " " + row['user_group'] + "</span></p>\n";
    }
    $('#active_users').html(userList);
}

function failure(msg) {
    document.getElementById('active_users').innerHTML = msg;
}

function groupsuccess(groups) {

    var groupSelector =   "   <label for display_selection><b>Anzeige:</b><label>\n" + 
                            "   <select id='year_selection' onchange='displaySwap(this.value)'>\n";
    for(var x of groups) {
        groupSelector +=  "       <option>" + x['group_name'] + "</option>\n";
    }
    groupSelector +=      "   </select>\n";
    $('#group_selector').html(groupSelector);
}

function groupfailure() {

    var groups = ["Herbert","Petra"];

    var groupSelector =   "   <label for display_selection><b>Anzeige:</b><label>\n" + 
                            "   <select id='year_selection' onchange='displaySwap(this.value)'>\n";
    for(var x of groups) {
        groupSelector +=  "       <option>" + x + "</option>\n";
    }
    groupSelector +=      "   </select>\n";
    $('#group_selector').html(groupSelector);
}

function teamCreator() {

    var groupAmount = 1;
    var check = [];

    try {
        check[0] = userbase[0]['user_group'];
        for(var i of userbase) {
            if(!(check.indexOf(i['user_group'])>-1)) {
                check.push(i['user_group']);
                groupAmount++;
            }
        }

        fillTeams(groupAmount,check);
    }

    catch(e) {
        fillTeams(0,check);
    }
}

function fillTeams(amount, groups) {

    var teambase = shuffle(userbase);
    var team1 = [];
    var team2 = [];
    var team3 = [];
    var teamList = [team1, team2, team3];
    var j=0;

    for(var u of teambase) {
        teamList[j].push(u);
        j++;
        if(j == 3) j=0;
    }
   
    var teamTable = "<table id='team_table'>\n" +
                    "   <caption><strong>Teams</strong></caption>\n" +
                    "   <thead>\n" +
                    "       <tr>\n";
    for(i=0; i<teamList.length; i++) {
        teamTable +="           <th id='team" + (i+1) + "'>Team " + (i+1) + "</th>\n";
    }
    teamTable +=    "       </tr>\n" +
                    "   </thead>\n" +
                    "   <tbody>\n";

    for(var i=0; i<team1.length; i++) {
        teamTable +="       <tr>\n";
        for(var t=0; t<teamList.length; t++) {
            var teamEntry = teamList[t];
            if(teamEntry[i]) {
                teamTable +="           <td headers='team" + (parseInt(t)+1) + "'>" + teamEntry[i]['user_name'] + " " + teamEntry[i]['user_group'] + "</td>\n";
            }
        }
        teamTable +="       </tr>\n";
    }

    teamTable +=    "   </tbody>\n" +
                    "</table>";
    
    $('#team_display').html(teamTable);
}

function shuffle(array) {

    var randomIndex = 0;
    var currentIndex = array.length;

    while(currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    randomIndex = Math.floor(Math.random() * array.length);
    [array[0], array[randomIndex]] = [array[randomIndex], array[0]];

    return array;
}