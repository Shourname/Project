function checkKindNumber() {
    let item = document.getElementsByTagName('div')[0];
    let radios = item.querySelectorAll('input[type="radio"]');

    for(let i in radios) {

        if(radios[i].checked) {
            let idRadio = radios[i].value;
            let number = document.getElementsByTagName('div')[2];
            let numberChild1 = number.children[0];
            let numberChild2 = number.children[1];

            if (idRadio == 'trg') {
                numberChild1.children[5].style.color = 'black';
                numberChild2.children[5].style.color = 'black';
                numberChild1.children[2].innerHTML = ` * (cos `;
                numberChild2.children[2].innerHTML = ` * (cos `;
                numberChild1.children[4].innerHTML = ` + i * sin `;
                numberChild2.children[4].innerHTML = ` + i * sin `;
                numberChild1.children[6].innerHTML = `)`;
                numberChild2.children[6].innerHTML = `)`;
            }
            if (idRadio == 'alg') {
                numberChild1.children[5].style.color = 'white';
                numberChild2.children[5].style.color = 'white';
                numberChild1.children[2].innerHTML = ` + i `;
                numberChild2.children[2].innerHTML = ` + i `;
                numberChild1.children[4].innerHTML = ``;
                numberChild2.children[4].innerHTML = ``;
                numberChild1.children[6].innerHTML = ``;
                numberChild2.children[6].innerHTML = ``;
            }
        }

    }
}

function checkInputNumber(number, isNumber) {
    let error = document.getElementsByTagName('div')[2];
    let errorChild = error.children[0];

    if (isNumber == 1 || isNumber == 2) {
        errorChild = error.children[0];
        if (isNumber == 1) {
            if (isNaN(number) == true || number == '') {
                errorChild.children[1].style = "outline: 1px solid red;";
                return false;
            }
        }
        if (isNumber == 2) {
            if (isNaN(number) == true || number == '') {
                errorChild.children[3].style = "outline: 1px solid red;";
                return false;
            }
        }
    }
    if (isNumber == 3 || isNumber == 4) {
        errorChild = error.children[1];
        if (isNumber == 3) {
            if (isNaN(number) == true || number == '') {
                errorChild.children[1].style = "outline: 1px solid red;";
                return false;
            }
        }
        if (isNumber == 4) {
            if (isNaN(number) == true || number == '') {
                errorChild.children[3].style = "outline: 1px solid red;";
                return false;
            }
        }
    }
    return true;
}

function checkInputCheckBox() {
    let sum = document.getElementById('sum');
    let dis = document.getElementById('dis');
    let adj = document.getElementById('adj');
    let dec = document.getElementById('dec');
    
    if (sum.checked == false && dis.checked == false && adj.checked == false && dec.checked == false) {
        sum.style = "outline: 1px solid red;";
        dis.style = "outline: 1px solid red;";
        adj.style = "outline: 1px solid red;";
        dec.style = "outline: 1px solid red;";
        return false;
    }

    return true;
}   

function optionNumbers() {
    let num1_1 = document.getElementById('num_1.1').value;
    let num1_2 = document.getElementById('num_1.2').value;
    let num2_1 = document.getElementById('num_2.1').value;
    let num2_2 = document.getElementById('num_2.2').value;

    let error = document.getElementsByTagName('div')[2];
    let errorChild1 = error.children[0];
    let errorChild2 = error.children[1];
    errorChild1.children[1].style = "";
    errorChild1.children[3].style = "";
    errorChild2.children[1].style = "";
    errorChild2.children[3].style = "";
    document.getElementById('sum').style = "";
    document.getElementById('dis').style = "";
    document.getElementById('adj').style = "";
    document.getElementById('dec').style = "";
    document.getElementsByTagName('div')[11].style.color = "white";
    document.getElementsByTagName('div')[11].innerHTML = "Вывод:<br>";
    
    let fl1 = checkInputNumber(num1_1, 1);
    let fl2 = checkInputNumber(num1_2, 2);
    let fl3 = checkInputNumber(num2_1, 3);
    let fl4 = checkInputNumber(num2_2, 4);
    let fl5 = checkInputCheckBox();

    if (fl1 == true && fl2 == true && fl3 == true && fl4 == true && fl5 == true) {
        let sum = document.getElementById('sum').checked;
        let dis = document.getElementById('dis').checked;
        let adj = document.getElementById('adj').checked;
        let dec = document.getElementById('dec').checked;

        let rad1 = document.getElementById('trg').checked;
        let rad2 = document.getElementById('alg').checked;

        let result = '';

        if (sum == true && rad1 == true) {
            let r1 = (parseFloat(num1_1) * Math.cos(num1_2)) + (parseFloat(num2_1) * Math.cos(num2_2));
            let r2 = (parseFloat(num1_1) * Math.sin(num1_2)) + (parseFloat(num2_1) * Math.sin(num2_2));

            let r = ((r1 ** 2) + (r2 ** 2)) ** 0.5;
            let cos = Math.acos(r1 / r);
            let sin = Math.asin(r2 / r);

            result += '<b>сумма: </b>' + r.toFixed(2) + ' * (cos ' + cos.toFixed(2) + ' + i * sin ' + sin.toFixed(2) + ' )' + '<br>';
        }
        if (sum == true && rad2 == true) {
            let r1 = parseFloat(num1_1) + parseFloat(num2_1);
            let r2 = parseFloat(num1_2) + parseFloat(num2_2);
            result += '<b>сумма: </b>' + '(' + r1 + ') + (' + r2 + ') * i' + '<br>';
        }

        if (dis == true && rad1 == true) {
            let r1 = (parseFloat(num1_1) * Math.cos(num1_2)) - (parseFloat(num2_1) * Math.cos(num2_2));
            let r2 = (parseFloat(num1_1) * Math.sin(num1_2)) - (parseFloat(num2_1) * Math.sin(num2_2));

            let r = ((r1 ** 2) + (r2 ** 2)) ** 0.5;
            let cos = Math.acos(r1 / r);
            let sin = Math.asin(r2 / r);

            result += '<b>вычитание: </b>' + r.toFixed(2) + ' * (cos ' + cos.toFixed(2) + ' + i * sin ' + sin.toFixed(2) + ' )' + '<br>';
        }
        if (dis == true && rad2 == true) {
            let r1 = parseFloat(num1_1) - parseFloat(num2_1);
            let r2 = parseFloat(num1_2) - parseFloat(num2_2);
            result += '<b>вычитание: </b>' + '(' + r1 + ') + (' + r2 + ') * i' + '<br>';
        }

        if (adj == true && rad1 == true) {
            let r1 = parseFloat(num1_1) * parseFloat(num2_1);
            let r2 = parseFloat(num2_1) + parseFloat(num2_2);
            result += '<b>умножение: </b>' + r1 + ' * (cos ' + r2 + ' + i * sin ' + r2 + ' )' + '<br>';
        }
        if (adj == true && rad2 == true) {
            let r1 = (parseFloat(num1_1) * parseFloat(num2_1)) - (parseFloat(num1_2) * parseFloat(num2_2));
            let r2 = (parseFloat(num1_1) * parseFloat(num2_2)) + (parseFloat(num1_2) * parseFloat(num2_1));
            result += '<b>умножение: </b>' + '(' + r1 + ') + (' + r2 + ') * i' + '<br>';
        }

        if (dec == true && rad1 == true) {
            let r1 = parseFloat(num1_1) / parseFloat(num2_1);
            let r2 = parseFloat(num2_1) - parseFloat(num2_2);
            result += '<b>деление: </b>' + r1.toFixed(2) + ' * (cos ' + r2 + ' + i * sin ' + r2 + ' )' + '<br>';
        }
        if (dec == true && rad2 == true) {
            let r1 = ((parseFloat(num1_1) * parseFloat(num2_1)) + (parseFloat(num1_2) * parseFloat(num2_2))) / ((parseFloat(num2_1) ** 2) + (parseFloat(num2_2) ** 2));
            let r2 = ((parseFloat(num1_2) * parseFloat(num2_1)) + (parseFloat(num1_1) * parseFloat(num2_2))) / ((parseFloat(num2_1) ** 2) + (parseFloat(num2_2) ** 2));
            result += '<b>деление: </b>' + '(' + r1.toFixed(2) + ') + (' + r2.toFixed(2) + ') * i' + '<br>';
        }

        document.getElementsByTagName('div')[11].style.color = "black";
        document.getElementsByTagName('div')[11].innerHTML += result;
    }
}

function deleteNumbers() {
    let item = document.getElementsByTagName('div')[2];
    let itemChild1 = item.children[0];
    let itemChild2 = item.children[1];
    let numbers = item.querySelectorAll('input[type="number"]');

    for(let i in numbers) {
        numbers[i].value = '';
    }

    itemChild1.children[5].innerHTML = '';
    itemChild2.children[5].innerHTML = '';
}

function clearInput(input) {
    input.style = "";
}

function clearCheckBox(checkBox) {
    document.getElementById('sum').style = "";
    document.getElementById('dis').style = "";
    document.getElementById('adj').style = "";
    document.getElementById('dec').style = "";
}