document.addEventListener("DOMContentLoaded", function() {
    createTable(buildings, 'list');
    setSortSelects(buildings, document.getElementById('sort'));

    document.getElementById("FindFilter").onclick = function() {
        filterTable(buildings, 'list', document.getElementById('filter'));
    };
    document.getElementById("ClearFilter").onclick = function() {
        clearFilter('list', buildings);
    };
    document.getElementById("fieldsFirst").onchange = function() {
        changeNextSelect('fieldsSecond', document.getElementById('fieldsFirst'));
    };
    document.getElementById("SortTable").onclick = function() {
        sortTable('list', document.getElementById('sort'));
    };
    document.getElementById("ClearSort").onclick = function() {
        clearsortTable(document.getElementById('sort'));
    };
})

let createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}

let setSortSelect = (arr, sortSelect) => {
    
    sortSelect.append(createOption('Нет', 0));
    
    for (let i in arr) {
        sortSelect.append(createOption(arr[i], Number(i) + 1));
    }
}

let setSortSelects = (data, dataForm) => { 

    let head = Object.keys(data[0]); // ошибка
    let allSelect = dataForm.getElementsByTagName('select');
    
    for(let j = 0; j < allSelect.length; j++) {
        setSortSelect(head, allSelect[j]);
        if (j > 0) {
            allSelect[j].disabled = true;
        }
    }
}

let changeNextSelect = (nextSelectId, curSelect) => {
    
    let nextSelect = document.getElementById(nextSelectId);
    
    nextSelect.disabled = false;
    nextSelect.innerHTML = curSelect.innerHTML;
    
    if (curSelect.value != 0) {
       nextSelect.remove(curSelect.value);
    } else {
        nextSelect.disabled = true;
    }
}