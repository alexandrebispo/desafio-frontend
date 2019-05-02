function requestHttp(url) {
     let http = fetch(url, {
        method: 'get' 
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => console.error(error));

    return http;
}


function renderInit() {
    document.getElementById("listClient").style.display = 'none';
    document.getElementById("searchResult").style.display = 'none';

    let url = 'http://localhost:3000/api/v1/customers';
    let http = requestHttp(url);
    let clients;

    http.then(function(data){
        clients = data.customers;
        let render = '';
        let totalCollected = 0;
        let overdue = 0;
        let defaulter = 0;
        let totalClients = clients.length;
        let status = '';

        for (var i = 0; totalClients > i; i++) {
            totalCollected = totalCollected + clients[i]['subscription_amount'];
            status = `<div class="status">${clients[i]['status']}</div>`;

            if(clients[i]['status'] == "overdue"){
                overdue = overdue + 1;
                status = `<div class="status-overdue">Inadimplente</div>`;
            }

            if(clients[i]['status'] == "paying"){
                defaulter = defaulter + 1;
                status = `<div class="status">Adimplente</div>`;
            }

            render += `<div class="profile clearfix">
              <div class="avatar">
                <img src="${clients[i]['profile_url']}" alt="Foto de Pefil">
              </div>
              <div class="name">${clients[i]['name']}</div>
              <div class="email">${clients[i]['email']}</div>
              <div class="phone">${clients[i]['phone']}</div>
              ${status}
            </div>`;
        }

        document.getElementById("totalClients").innerHTML = totalClients;
        document.getElementById("overdue").innerHTML = overdue;
        document.getElementById("defaulter").innerHTML = defaulter;
        document.getElementById("totalCollected").innerHTML = "R$ " + getMoney(totalCollected);
        document.getElementById("clientes").innerHTML = render;
        document.getElementById("loading").style.display = 'none';
        document.getElementById("listClient").style.display = 'block';
        return console.log("render Init.");
    })
    .catch(error => console.error(error));

    
}


function getMoney(int){
    int = int.toFixed(2);
    let currency = int+'';
        currency = currency.replace(".", ",");
        if( currency.length > 6 )
                currency = currency.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

        return currency;
}


function removeAccents(newStringWithAccent) {
  let string = newStringWithAccent;
    let mapAccentsHex  = {
        a : /[\xE0-\xE6]/g,
        A : /[\xC0-\xC6]/g,
        e : /[\xE8-\xEB]/g,
        E : /[\xC8-\xCB]/g,
        i : /[\xEC-\xEF]/g,
        I : /[\xCC-\xCF]/g,
        o : /[\xF2-\xF6]/g,
        O : /[\xD2-\xD6]/g,
        u : /[\xF9-\xFC]/g,
        U : /[\xD9-\xDC]/g,
        c : /\xE7/g,
        C : /\xC7/g,
        n : /\xF1/g,
        N : /\xD1/g
    };

    for ( let letter in mapAccentsHex ) {
        let regularExpression = mapAccentsHex[letter];
        string = string.replace( regularExpression, letter );
    }

    return string;
}


function verifySearchClients(clients) {
    let insertClients = [];
    let input = document.getElementById("search").value;
    let search = removeAccents(input.toLowerCase());

        // Search clients
        for (let i = 0; clients.length > i; i++) {
            let nameClient = removeAccents(clients[i]["name"]);
            let nameResult = nameClient.toLowerCase().indexOf(search);

            let emailClient = removeAccents(clients[i]["email"]);
            let emailResult = emailClient.toLowerCase().indexOf(search);

            if(nameResult != -1){
                insertClients.push(i);
            }

            if(emailResult != -1){
                insertClients.push(i);
            }
            
        }
        
        // remove duplicates
        insertClients = insertClients.filter(function(s, x){
            return insertClients.indexOf(s) == x;
        });

        return insertClients;
}


function searchClients() {
    document.getElementById("listClient").style.display = 'none';
    document.getElementById("searchResult").style.display = 'none';
    document.getElementById("loading").style.display = 'block';

    let url = 'http://localhost:3000/api/v1/customers';
    let http = requestHttp(url);
    let clients;
    let foundCustomers;

    http.then(function(data){
        clients = data.customers;
        foundCustomers = verifySearchClients(clients);
        let render = '';
        let totalCollected = 0;
        let totalClients = clients.length;
        let status = '';
        let idclient;

        for(let i = 0; foundCustomers.length > i; i++){

            idclient = foundCustomers[i];

            totalCollected = totalCollected + clients[idclient]['subscription_amount'];
            status = `<div class="status">${clients[idclient]['status']}</div>`;

            if(clients[idclient]['status'] == "overdue"){
                status = `<div class="status-overdue">Inadimplente</div>`;
            }

            if(clients[idclient]['status'] == "paying"){
                status = `<div class="status">Adimplente</div>`;
            }

            render += `<div class="profile clearfix">
              <div class="avatar">
                <img src="${clients[idclient]['profile_url']}" alt="Foto de Pefil">
              </div>
              <div class="name">${clients[idclient]['name']}</div>
              <div class="email">${clients[idclient]['email']}</div>
              <div class="phone">${clients[idclient]['phone']}</div>
              ${status}
            </div>`;
        }

        document.getElementById("clientsSearchResult").innerHTML = render;
        document.getElementById("loading").style.display = 'none';
        return document.getElementById("searchResult").style.display = 'block';
    })
    .catch(error => console.error(error));
}

renderInit();