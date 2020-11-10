import {words} from './englishWords.js'

export function findSimilar(word){
    const max_size = 10;
    let top_words = [];
    let top_scores = [];

    for(let i = 0; i < words.length; i++){
        // compute score
        let element = words[i];
        let temp_score = score(word, element);

            // check if it is a top score
            let index = getListIndex(top_scores, temp_score);
            if(index < max_size){
                top_words.splice(index, 0, element);
                top_scores.splice(index, 0, temp_score);

                if(top_words.length > max_size){
                    top_words.pop();
                    top_scores.pop();
                }
        }
    }
    return [top_words, top_scores];
}

function getListIndex(scores, x){
    for(let i = 0; i < scores.length; i++){
        if(x > scores[i]) return i;
    }
    return scores.length;
}

function score(word, comparingWord){
    const length_weight = 0.3;
    const match_weight = 0.5;
    const shift_weight = 0.2;

    return length_weight * lengthScore(word,comparingWord) + match_weight * matchScore(word,comparingWord)
        + shift_weight * shiftScore(word,comparingWord);
}

function lengthScore(word, comparingWord){
    let lengthDifference = Math.abs(word.length - comparingWord.length);
    return Math.max(1.0 - lengthDifference / 4, 0);
}

function matchScore(word, comparingWord){
    let length = Math.min(word.length, comparingWord.length);
    if(length <= 0) return 0.0;

    let total = 0;
    for(let i = 0; i < length; i++){
        if(word.charAt(i) === comparingWord.charAt(i)) total++;
    }

    let matchDifference = length - total;
    return Math.max(1.0 - matchDifference / 5, 0);
}

function shiftScore(word, comparingWord){
    let l2 = matchScore(word.substring(2), comparingWord);
    let l1 = matchScore(word.substring(1), comparingWord);
    let c = matchScore(word, comparingWord);
    let r1 = matchScore(word, comparingWord.substring(1));
    let r2 = matchScore(word, comparingWord.substring(2));

    return Math.max(l2, l1, c, r1, r2);
}
