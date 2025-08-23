function replaceEnding(word) {
    const original = word; // сохраняем исходный вариант
    const lower = word.toLowerCase(); // для удобства проверки

    let replaced = lower;

    // Начало слова
    if (replaced.startsWith('я')) replaced = 'ya' + replaced.slice(1);
    if (replaced.startsWith('ю')) replaced = 'ju' + replaced.slice(1);
    if (replaced.startsWith('дже')) replaced = 'je' + replaced.slice(3);
	if (replaced.startsWith('диз')) replaced = 'des' + replaced.slice(3);

    // Конец слова
    if (replaced.length >= 5 && replaced.endsWith('к')) replaced = replaced.slice(0, -1) + 'que';
    if (replaced.endsWith('ы')) replaced = replaced.slice(0, -1) + 'ié';
	    if (replaced.endsWith('ый')) replaced = replaced.slice(0, -2) + 'ũy';
    if (replaced.endsWith('оу')) replaced = replaced.slice(0, -2) + 'ow';
    if (replaced.endsWith('у')) replaced = replaced.slice(0, -1) + 'ué';
    if (replaced.endsWith('й')) replaced = replaced.slice(0, -1) + 'y';
    if (replaced.endsWith('йн')) replaced = replaced.slice(0, -2) + 'in';

    // Общие замены
    const map = [
        ['ью', 'éw'], ['ъю', 'éw'], ['оф', 'off'], ['ква', 'qua'],
        ['дж', 'j'], ['ье', 'ie'], ['кс', 'x'], ['ая', 'uä'],
        ['а', 'a'], ['б', 'b'], ['ц', 'c'], ['д', 'd'], ['е', 'e'],
        ['ф', 'f'], ['г', 'g'], ['х', 'h'], ['и', 'i'], ['ю', 'ü'],
        ['к', 'k'], ['л', 'l'], ['м', 'm'], ['н', 'n'], ['о', 'o'],
        ['п', 'p'], ['р', 'r'], ['с', 's'], ['т', 't'], ['у', 'u'],
        ['в', 'v'], ['й', 'y'], ['з', 'z'], ['ъ', 'é'], ['ь', 'é'],
        ['я', 'ä'], ['ё', 'ё'], ['ч', 'ch'], ['ж', 'j'], ['ш', 'š'],
        ['щ', 'ś'], ['э', 'ě']
    ];

    // Функция для сохранения исходного регистра
    function matchCase(original, replacement) {
        let result = '';
        for (let i = 0; i < replacement.length; i++) {
            if (i < original.length && original[i] === original[i].toUpperCase()) {
                result += replacement[i].toUpperCase();
            } else {
                result += replacement[i];
            }
        }
        return result;
    }

    for (let [from, to] of map) {
        let regex = new RegExp(from, 'gi');
        replaced = replaced.replace(regex, (match, offset) => {
            const originalSlice = original.substr(offset, match.length);
            return matchCase(originalSlice, to);
        });
    }

    return replaced;
}

document.getElementById('replaceBtn').onclick = function () {
    let inputText = document.getElementById('input').value;

    if (!inputText.trim()) {
        document.getElementById('output').innerText = "Введите текст для обработки.";
        return;
    }

    let tokens = inputText.match(/[\wа-яё]+|[^\wа-яё]+/gi);

    let processedTokens = tokens.map(token => {
        if (/[\wа-яё]/i.test(token)) {
            return replaceEnding(token);
        } else {
            return token;
        }
    });

    document.getElementById('output').innerText = processedTokens.join('');
};
