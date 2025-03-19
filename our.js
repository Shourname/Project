const compare = (st, depth, s, j) => {
    if (st[depth] !== s[j]) {
        return false;
    } else if (depth === st.length - 1) {
        return true;
    } else return compare(st, depth + 1, s, j + 1);
};

const count = (str, s) => {
    return [...s].filter((char, j) => str[0] === char && compare(str, 0, s, j)).length;
};

function DNA(string) {
    const str = string.split(' ');
    const k = Number(str[0]);
    str.shift();
    const s = str.join('');
    const length = s.length;
    const checked = [];
    const result = [];

    Array.from({ length }, (_, i) => length - i)
         .flatMap(i => Array.from({ length: length - i + 1 }, (_, j) => s.substring(j, j + i)))
         .forEach(current => {
            if (!checked.includes(current)){
                checked.push(current);
                if (count(current, s) === k) {
                    result.push(current);
                }
            }
         });
    if (result[0] != undefined) return result[0]; else return '';
}


console.log(DNA('2 перпендикуляр, опущенный из заданной точки К на плоскость, будет также параллелен прямой АС, которая вместе с заданной точной К образует плоскость.'));