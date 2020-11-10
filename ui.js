import {findSimilar} from './spellchecker.js';
document.getElementById('button').onclick = () => {
    const word = document.getElementById('lookupText').value.toLowerCase();
    const result = findSimilar(word);
    printResult(result[0]);
}

function printResult(arr) {
    document.getElementById('results').innerHTML =' ';
    let ul = document.createElement('ul');
    document.getElementById('results').appendChild(ul);

    arr.forEach(function (item) {
        let li = document.createElement('li');
        ul.appendChild(li);

        li.innerHTML += item;
    });
}