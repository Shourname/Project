let createSortArr = (data) => {
    let sortArr = [];
    
    let sortSelects = data.getElementsByTagName('select');
    
    for (let i = 0; i < sortSelects.length; i++) {   
        let keySort = sortSelects[i].value;

        if (keySort == 0) {
            break;
        }

        let desc = document.getElementById(sortSelects[i].id + 'Desc').checked;
        sortArr.push(
          {column: keySort - 1, 
           order: desc}
        ); 
    }
    return sortArr; 
};

let sortTable = (idTable, data) => {
    
    let sortArr = createSortArr(data);
    
    if (sortArr.length === 0) {
        return false;
    }

    let table = document.getElementById(idTable);
    let rowData = Array.from(table.rows);
    
    rowData.shift();
    
    rowData.sort((first, second) => {
        for(let i in sortArr) {
            let key = sortArr[i].column;
            

            //alert(first.cells[key].innerHTML);
            if (!isNaN(first.cells[key].innerHTML) && !isNaN(second.cells[key].innerHTML)) {
                if (sortArr[i].order == false) {
                    if (Number(first.cells[key].innerHTML) > Number(second.cells[key].innerHTML)) {
                        return 1;
                    } else if (Number(first.cells[key].innerHTML) < Number(second.cells[key].innerHTML)){
                        return -1;
                    }
                } else {
                    if (Number(first.cells[key].innerHTML) < Number(second.cells[key].innerHTML)) {
                        return 1;
                    } else if (Number(first.cells[key].innerHTML) > Number(second.cells[key].innerHTML)){
                        return -1;
                    }
                }
            } else {
                if (sortArr[i].order == false) {
                    if (first.cells[key].innerHTML > second.cells[key].innerHTML) {
                        return 1;
                    } else if (first.cells[key].innerHTML < second.cells[key].innerHTML){
                        return -1;
                    }
                } else {
                    if (first.cells[key].innerHTML < second.cells[key].innerHTML) {
                        return 1;
                    } else if (first.cells[key].innerHTML > second.cells[key].innerHTML){
                        return -1;
                    }
                }
            }
        }
        return 0;
    });
    
    table.innerHTML = table.rows[0].innerHTML;
    rowData.forEach(item => {
        table.append(item);
    });
}

let clearsortTable = (data) => {
    let sortSelects = data.getElementsByTagName('select');
    
    for (let i = 0; i < sortSelects.length; i++) {   
        sortSelects[i].value = 'Нет';
        sortSelects[i].selectedIndex = 0;
        document.getElementById(sortSelects[i].id + 'Desc').checked = false;
    }

    changeNextSelect('fieldsSecond', document.getElementById('fieldsFirst'));
    filterTable(buildings, 'list', document.getElementById('filter'));
}