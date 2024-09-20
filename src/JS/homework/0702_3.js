import assert from 'assert/strict';

const searchByKoreanInitialSound = (datas, initConsonants) => {
    const makeJamoRange = () => {
        const result = [];

        for (const consonant of initConsonants) {
            const asciiCode = consonant.charCodeAt(0);
            if (asciiCode <= 127) {
                result.push([asciiCode, asciiCode]);
                continue;
            }
            const wordIndex = INITIAL_CONSONANT.indexOf(consonant);
            const jamoStart = GA + (INITIAL_INTERVAL * wordIndex);
            const jamoEnd = jamoStart + INITIAL_INTERVAL - 1;
            result.push([jamoStart, jamoEnd]);
        }
        return result;
    };

    // 초성 모음
    const INITIAL_CONSONANT = [
        'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
        'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
        'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ',
        'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
    ];
    const GA = 44032; // 가
    const INITIAL_INTERVAL = 588; // 가 ~ 나 간격
    const jamoRange = makeJamoRange();

    return datas.reduce((result, word) => {
        for (let i = 0; i < word.length; i += 1) {
            let unicode = word[i].charCodeAt(0);
            let isValid = true;

            for (const [start, end] of jamoRange) {
                if (unicode < start || unicode > end || unicode === undefined) {
                    isValid = false;
                    break;
                }
                unicode = word[i += 1]?.charCodeAt(0);
            }

            if (isValid) {
                result.push(word);
                return result;
            }
        }
        return result;
    }, []);
};

const datas = ['강원도 고성군', '고성군 토성면', '토성면 북면', '북면', '김1수'
    , '네이버', '다음', '아스키코드표', '아스키 코드표', '유니코드', '한글 초성', 'ASCII 코드표'];
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄴㅇ'), ['네이버']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄷㅇ'), ['다음']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱ ㅊ'), ['한글 초성']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅇㄴ'), ['유니코드']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅇㅅㅋ'), ['아스키코드표', '아스키 코드표']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅇㅅㅋ '), ['아스키 코드표']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ASC'), ['ASCII 코드표']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄷ ㄱ'), ['강원도 고성군']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱ ㅌ'), ['고성군 토성면']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱㅅㄱ'), ['강원도 고성군', '고성군 토성면']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅌㅅㅁ'), ['고성군 토성면', '토성면 북면']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅂㅁ'), ['토성면 북면', '북면']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅍㅁ'), []);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱㄴ'), []);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅅㅁ'), ['고성군 토성면', '토성면 북면']);
assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱ1ㅅ'), ['김1수']);
