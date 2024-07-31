//Soal 1
//Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"
function reverseAlphabet(str) {
    let alphabets = str.replace(/[0-9]/g, '');
    let numbers = str.replace(/[a-zA-Z]/g, '');

    let reversedAlphabets = alphabets.split('').reverse().join('');

    return reversedAlphabets + numbers;
}

let result = reverseAlphabet("NEGIE1");
console.log("Soal 1: ", result);

//Soal 2
//Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut, jika ada kata dengan panjang yang sama silahkan ambil salah satu
function longest(sentence) {
    const words = sentence.split(' ');

    let longestWord = '';
    for (let word of words) {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    }

    return `${longestWord}: ${longestWord.length} character`;
}

const sentence = "Saya sangat senang mengerjakan soal algoritma";
console.log("Soal 2:", longest(sentence));

//Soal 3
//Terdapat dua buah array yaitu array INPUT dan array QUERY, silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT
function countArray(input, query) {
    const countMap = {};
    input.forEach(word => {
        countMap[word] = (countMap[word] || 0) + 1;
    });

    const result = query.map(word => countMap[word] || 0);

    return result;
}

const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];

const OUTPUT = countArray(INPUT, QUERY);
console.log("Soal 3:", OUTPUT);

//Soal 4
//Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN Contoh:
function countDiagonalMatrix(matrix) {
    const n = matrix.length;
    let primaryDiagonalSum = 0;
    let secondaryDiagonalSum = 0;

    for (let i = 0; i < n; i++) {
        primaryDiagonalSum += matrix[i][i];
        secondaryDiagonalSum += matrix[i][n - 1 - i];
    }

    return {
        primaryDiagonalSum,
        secondaryDiagonalSum,
        difference: primaryDiagonalSum - secondaryDiagonalSum
    };
}

const matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9]
];

const { primaryDiagonalSum, secondaryDiagonalSum, difference } = countDiagonalMatrix(matrix);
console.log(`Soal 4: Hasilnya adalah ${primaryDiagonalSum} - ${secondaryDiagonalSum} = ${difference}`);



