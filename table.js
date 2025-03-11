//выводим таблицу на страницу
let createTable = (data, idTable) => {
	let table = document.getElementById(idTable);
	
	let tr = document.createElement('tr');

	for(key in data[0]) {
		let th = document.createElement('th');
		th.innerHTML = key;
		tr.append(th);
	}

	table.append(tr);	
	
	data.forEach((item) => {
           let tr = document.createElement('tr');
           for(let key in item) {
               let td = document.createElement('td');
               td.innerHTML = item[key];
               tr.append(td);
           }
           table.append(tr);
	});	
}

let clearTable = (idTable) => {
    let table = document.getElementById(idTable);

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    table.innerHTML = '';
}