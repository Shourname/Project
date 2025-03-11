// устанавливаем соответствие между полями формы и столбцами таблицы
let correspond = {
    "Название": "structure",
    "Тип": "category",
    "Страна": "country",
    "Город": "city",
    "Год": ["yearFrom", "yearTo"],
    "Высота": ["heightFrom", "heightTo"]
}

let dataFilter = (dataForm) => {
    
    let dictFilter = {};
    
    for(let j = 0; j < dataForm.elements.length; j++) {

        let item = dataForm.elements[j];
        let valInput = item.value;

        if (item.type == "text") {
            valInput = valInput.toLowerCase();
        } 
        if (item.type === "number") {
            if (valInput) {
                valInput = Number(valInput);
            } else {
                if (item.id.includes("From")) {
                    valInput = -Infinity;
                } else if (item.id.includes("To")) {
                    valInput = Infinity;
                }
            }
        }
        dictFilter[item.id] = valInput;
    }       
    return dictFilter;
}

let filterTable = (data, idTable, dataForm) =>{
    
    let datafilter = dataFilter(dataForm);
    
    let tableFilter = data.filter(item => {

        let result = true;
        
        for(let key in item) {
            
            let val = item[key];
            
            if (typeof val == 'string') {
                val = item[key].toLowerCase() 
                result &&= val.indexOf(datafilter[correspond[key]]) !== -1 
            }
            if (typeof val != 'string') {
                let min = datafilter[correspond[key][0]];
                let max = datafilter[correspond[key][1]];

                if (key === "Год" || key === "Высота") {
                    result &&= (val >= min && val <= max);
                }
            }
         }
         return result;
    });     

    clearTable(idTable);
    createTable(tableFilter, idTable); 

    let sortSelects = document.getElementById('sort').getElementsByTagName('select');
    
    for (let i = 0; i < sortSelects.length; i++) {   
        sortSelects[i].value = 'Нет';
        sortSelects[i].selectedIndex = 0;
        document.getElementById(sortSelects[i].id + 'Desc').checked = false;
    }

    changeNextSelect('fieldsSecond', document.getElementById('fieldsFirst'));
}

function clearFilter(idTable, data) {
    const form = document.getElementById('filter');
    const inputs = form.getElementsByTagName('input');
    for (let input of inputs) {
        input.value = '';
    }
    inputs[8].value = 'Найти';
    inputs[9].value = 'Очистить фильтры';

    clearTable(idTable);
    createTable(data, idTable);

    let sortSelects = document.getElementById('sort').getElementsByTagName('select');
    
    for (let i = 0; i < sortSelects.length; i++) {   
        sortSelects[i].value = 'Нет';
        sortSelects[i].selectedIndex = 0;
        document.getElementById(sortSelects[i].id + 'Desc').checked = false;
    }

    changeNextSelect('fieldsSecond', document.getElementById('fieldsFirst'));
}