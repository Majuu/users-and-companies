//json-server --watch db.json

/*
let  users = [];
let userNames = [];
let companiesList = [];
let userFinal = [];

fetch(`http://localhost:3000/users`)
    .then(usersResponse => {
        console.log('The users are fetched');
        return usersResponse.json();
    })
    .then(usersData => {

        for (let number = 0; number < 2500; number++){                 // Take names and uris from ready data
            users[number] = usersData[number].uris;
            userNames[number] = usersData[number].name;
        }

        let table = document.getElementById("usersTable");

        for (let counter = 0; counter < usersData.length; counter++) {        // Makes objects from database: user's name and number of company

            var thenum = users[counter].company.replace( /^\D+/g, '');        // Filters "uris" to get raw number of company

            userFinal.push({ name: userNames[counter], rowNum: thenum});
        }

        let writeNames = [];
        for(let counter = 0; counter < 1000; counter ++) {             //Makes the Users table on the left

            var row = table.insertRow(counter + 1);
            var cell = row.insertCell(0);

            for(let finder = 0; finder < 2500; finder++)              //Searches for correct users, then writes them inside cell

                if(userFinal[finder].rowNum == counter) {

                writeNames.push(userFinal[finder].name);

                cell.innerText = writeNames;
            }
            if(writeNames.length == 0){

                cell.innerText = "-- No users --";
            }
            writeNames = [];
        }

        return fetch(`http://localhost:3000/companies`);
    })
    .then(companiesResponse => {
        console.log('The companies are fetched');
        return companiesResponse.json();
    })
    .then(companiesData => {

        for (let number = 0; number < 1000; number++){
            companiesList[number] = companiesData[number].name;
        }

        var table = document.getElementById("companiesTable");      // Makes the companies table on the right

        for(let counter = 0; counter < 1000; counter ++) {

            var row = table.insertRow(counter + 1);

            var cell1 = row.insertCell(0);

            cell1.innerText = companiesList[counter];
        }
    });
*/    //Solution #1



// Solution #2 --->  FILTER + MAP

async function init() {
    let users = await getUsers();
    let companies = await getCompanies();
    var table = document.getElementById("myTable");

    for(let counter = 0; counter < companies.length; counter++) {

        var row = table.insertRow(counter + 1);              // Create the table and write values inside
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        cell1.innerText = companies.filter(function (entry) {           //filter finds Users
            return entry.uri === `/companies/${counter}`
        }).map(a => a.name);                                            //map takes only the names
        cell2.innerText = users.filter(function (entry) {
            return entry.uris.company === `/companies/${counter}`
        }).map(a => a.name);
    }
}

async function getUsers() {
    let users;

    const data = fetch(`http://localhost:3000/users`).then(
        res => res.json()
    );

    await data.then(
        res => users = res
    );

    return users;
}

async function getCompanies() {
    let companies;

    const data = fetch(`http://localhost:3000/companies`).then(
        res => res.json()
    );

    await data.then(
        res => companies = res
    );

    return companies;
}
init();


