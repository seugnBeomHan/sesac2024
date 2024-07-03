import assert from 'assert/strict';

const searchByKoreanInitialSound = (datas, initConsonant) => {
    const makeJamoRange = () => {
        const result = [];

        for (const word of initConsonant) {
            const wordIndex = INITIAL_CONSONANT.indexOf(word);
            const jamoStart = GA + (INITIAL_INTERVAL * wordIndex);
            const jamoEnd = jamoStart + SAME_INITIAL_INTERVAL;
            result.push([jamoStart, jamoEnd]);
        }

        return result;
    };

    const INITIAL_CONSONANT = [
        'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
        'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
        'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ',
        'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
    ];
    const GA = 44032; // 가
    const INITIAL_INTERVAL = 588; // 가 ~ 나 간격
    const SAME_INITIAL_INTERVAL = 587; // 가 ~ 깋 간격
    const jamoRange = makeJamoRange();

    return datas.reduce((result, word) => {
        for (let i = 0; i < word.length; i += 1) {
            let unicode = word[i].charCodeAt(0);

            if (unicode >= jamoRange[0][0] && unicode <= jamoRange[0][1]) {
                unicode = word[i += 1]?.charCodeAt(0);

                if (unicode >= jamoRange[1][0] && unicode <= jamoRange[1][1]) {
                    result.push(word);
                    return result;
                }
            }
        }
        return result;
    }, []);
};

const datas = ['강원도 고성군', '고성군 토성면', '토성면 북면', '북면', '김1수'];
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱㅇ'), ['강원도 고성군']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱㅅㄱ'), ['강원도 고성군', '고성군 토성면']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅌㅅㅁ'), ['고성군 토성면', '토성면 북면']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅂㅁ'), ['토성면 북면', '북면']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅍㅁ'), []);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱ1ㅅ'), ['김1수']);
