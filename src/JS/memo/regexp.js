var s = '강원도 고성군 토성면';
console.log(s.match(/성/));       // [ '성', index: 5, input: '강원도 고성군 토성면', groups: undefined ]
console.log(s.match(/성/g));      // [ '성', '성' ]
console.log(s.match(/.../g));    // [ '강원도', ' 고성', '군 토' ]
console.log(s.match(/\S\S\S/g)); // [ '강원도', '고성군', '토성면' ]  ⇐⇒ /\S{1,3}/g, /\S{3}/g
console.log(s.match(/도|고|리/g));    // [ '도', '고' ]   ⇐⇒ s.match(/[도고리]/g);
console.log(s.match(/성군/g));       // [ '성군' ]  cf. s.search(/성군/g); ⇐ 5, s.search(/도/g); ⇐ 2
console.log(s.match(/성(군|면)/g));   // [ '성군', '성면' ]    ⇐⇒ s.match(/성[군면]/g);
console.log(s.match(/.성(군|면)/g));  // [ '고성군', '토성면' ]  ⇐⇒ /..(군|면)/g, /..?(군|면)/g

s = '강원도 고성군 토성면 북면';
console.log(s.match(/.성(군|면)/g));      // [ '고성군', '토성면' ]
console.log(s.match(/..?(군|면)/g));     // [ '고성군', '토성면', ' 북면' ]
console.log(s.match(/..{0,1}(군|면)/g)); // [ '고성군', '토성면', ' 북면' ]
console.log(s.match(/\S.?(군|면)/g));    // [ '고성군', '토성면', '북면' ]   ⇐⇒ s.match(/\S.{0,1}(군|면)/g)
console.log(s.match(/\S.*(군|면)/g));    // ?     ⇐⇒ s.match(/\S.+(군|면)/g)
console.log(s.match(/[가-기]/g));        // [ '강', '고', '군' ]   cf. '영나수ㄴㅃㅅㄲ'.match(/[ㄴ나-닣]/g)
console.log(s.match(/[가-기]\S/g));      // [ '강원', '고성' ]  cf. '영강수ㄴㅃㅅㄲ'.match(/[ㄱㄲ가-깋]/g)
console.log('연습 중..', s.match(/\\*[ㅌㅅ]\S/g));

const reg = new RegExp('/\S.?(군|면)/', 'g');
console.log(reg.exec(s));
// 가-깋 = 587개, 동일
for (let i = 'ㄱ'.charCodeAt(0); i <= 'ㅎ'.charCodeAt(0); i += 1) {
    console.log(String.fromCharCode(i), i, String.fromCharCode(i + 32026));
}

const charCode = (char) => char.charCodeAt(0);
console.log('>>', charCode('ㅏ'));
console.log('>>', charCode('ㅣ'));
console.log('>>', charCode('가'));
console.log('>>', charCode('ㄴ'))
console.log('>>', charCode('ㅏ'))
console.log('>>', charCode('나'));
console.log('>>', charCode('ㄴ') + charCode('ㅏ'))
console.log('>>', charCode('ㄷ'))
console.log('>>', charCode('ㅏ'))
console.log('>>', charCode('다'));
console.log('>>', charCode('ㄷ') + charCode('ㅏ'))
console.log('>>', charCode('ㄹ'))
console.log('>>', charCode('ㅏ'))
console.log('>>', charCode('라'));
console.log('>>', charCode('ㄹ') + charCode('ㅏ'))

const a = Math.abs(('ㄱ'.charCodeAt(0) - 'ㄲ'.charCodeAt(0)));
const b = a * 588;
const c = '가'.charCodeAt(0) + b;
console.log(String.fromCharCode(c), c);

console.log('가'.charCodeAt(0) - '나'.charCodeAt(0));
console.log('나'.charCodeAt(0) - '다'.charCodeAt(0));


console.log(('ㄷ'.charCodeAt(0) - 'ㄱ'.charCodeAt(0)) * 587);
console.log(String.fromCharCode('가'.charCodeAt(0) + (('ㄷ'.charCodeAt(0) - 'ㄱ'.charCodeAt(0)) * 587)));
console.log('ㄱ'.charCodeAt(0), '가'.charCodeAt(0));
console.log('ㄴ'.charCodeAt(0), '나'.charCodeAt(0));
console.log('ㄷ'.charCodeAt(0), '다'.charCodeAt(0));
console.log('ㄹ'.charCodeAt(0), '라'.charCodeAt(0));
console.log('ㄹ'.charCodeAt(0), 'ㅏ'.charCodeAt(0), '라'.charCodeAt(0));
console.log('가'.charCodeAt(0) - 'ㄱ'.charCodeAt(0) + 'ㅏ'.charCodeAt(0));
console.log('나'.charCodeAt(0) - 'ㄴ'.charCodeAt(0) + 'ㅏ'.charCodeAt(0));
console.log('다'.charCodeAt(0) - 'ㄷ'.charCodeAt(0) + 'ㅏ'.charCodeAt(0));
console.log('라'.charCodeAt(0) - 'ㄹ'.charCodeAt(0) + 'ㅏ'.charCodeAt(0));

console.log(s.match(/\\*[타-팋][사-싷]\S/g));

const myRe = new RegExp("d(b+)d", "g");
console.log(myRe.exec("cdbbdbsbz"));

// const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
const korean = /[사-싷하-힣|ㅏ-ㅣ]/g;
console.log('한승범'.match(korean));