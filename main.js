const suffixs = {
    "종결": [
        {
            "non-final": "다",
            "final": "다"
        },
        {
            "non-final": "ㄴ다",
            "final": "는다"
        },
        {
        	"non-final": "ㅂ니다",
            "final": "습니다",
            jondae: true
        }
    ],
    "연결": [
        {
    	    "non-final": "게",
            "final": "게"
        }
    ]
}

const josas = {
	"주격": [
	    {
		    "non-final": "가",
		    "final": "이"
		},
		{
		    "non-final": "께서",
		    "final": "께서",
		    jondae: true
		}
    ],
    "목적격": [
        {
		    "non-final": "를",
		    "final": "을"
		}
    ],
    "보조사": [
        {
        	"non-final": "는",
            "final": "은"
        },
        {
        	"non-final": "만",
            "final": "만"
        },
        {
        	"non-final": "도",
            "final": "도"
        }
    ],
}

const words = {
	"대명사": [
	    {
		    word: "내"
		},
		{
		    word: "저희",
		    jondae: true
		},
		{
		    word: "우리"
		}
	],
	"명사": [
	    {
		    word: "사과"
		}
    ],
    "동사": [
        {
        	word: "먹",
            need: 2
         },
         {
         	word: "달리",
             need: 1
         },
         {
         	word: "배우",
             need: 2
         },
         {
         	word: "모으",
             need: 2
         },
         {
         	word: "하",
             need: 2
         }
     ]
}


const sentenceEl = document.getElementById("sentence");
let sentence = "";

sentenceEl.innerText = sentence;

function makeSentence() {
	const verb = getWord("동사");
	
	const nounSelector = Math.floor(Math.random() * 2);
	const nounType = nounSelector === 0 ? "대명사" : "명사";
	const noun = getWord(nounType);
	const isJondae = noun.jondae;
	
	const object = getWord("명사");
	const isJondae2 = object.jondae;
	
	const josa2 = hasFinalSound(getLastStr(object.word)) ? getJosa("목적격")["final"] : getJosa("목적격")["non-final"];
	
	const josaSelector = Math.floor(Math.random() * 2);
	const josaType = josaSelector === 0 && noun.word != "내" ? "보조사" : "주격";
	const josa = hasFinalSound(getLastStr(noun.word)) ? getJosa(josaType)["final"] : getJosa(josaType)["non-final"];
	
	const suffix = hasFinalSound(getLastStr(verb.word)) ? getSuffix("종결", isJondae)["final"] : getSuffix("종결", isJondae)["non-final"];
	
	sentence = sumKoreanStr(noun.word, josa) + " " + (verb.need >= 2 ? sumKoreanStr(object.word, josa2) : "" )+ " " + sumKoreanStr(verb.word, suffix);
	sentenceEl.innerText = sentence;
}

function getWord(part) {
	const index = Math.floor(words[part].length * Math.random());
	
	return words[part][index];
}

function getSuffix(type, isJondae=false) {
	let suffix;
	
	while(1){
	    const index = Math.floor(suffixs[type].length * Math.random());
	    suffix =  suffixs[type][index];
	
	    if(!isJondae && !suffix.jondae) break;
	    if(isJondae && suffix.jondae) break;
	}
	
	return suffix;
}

function getJosa(type, isJondae=false) {
	let josa;
	
	while(1){
	    const index = Math.floor(josas[type].length * Math.random());   
	    josa =  josas[type][index];
	
	    if(!isJondae && !josa.jondae) break;
	    if(isJondae && josa.jondae) break;
	}
	
	return josa;
}

function hasFinalSound(str) {
	return (str.charCodeAt() - 44032)%28 != 0;
}

function getLastStr(str) {
	return str[str.length - 1];
}

function getFirstStr(str) {
	return str[0];
}

function sumKoreanStr(str1, str2) {
	const str1Last = getLastStr(str1);
	const str2First = getFirstStr(str2);
	const str1Code = str1Last.charCodeAt();
	const str2Code = str2First.charCodeAt();
	
	let strMiddle = "";
	let sumStr = str1 + str2;
	
	if(!hasFinalSound(str1Last) && str2Code >= 12593 && str2Code <= 12622) {
		if(str2Code - 12593 === 24) strMiddle = str1+str2;
		else if(str2Code - 12593 === 18) strMiddle = str1+str2;
		else if(str2Code - 12593 > 24) strMiddle =  String.fromCharCode(str1Code + str2Code - 12593 + 1 - 3);
        else if(str2Code - 12593 > 18) strMiddle =  String.fromCharCode(str1Code + str2Code - 12593 + 1 - 2);
        else if(str2Code - 12593 > 7) strMiddle =  String.fromCharCode(str1Code + str2Code - 12593 + 1 - 1);
        else if(str2Code - 12593 < 7) strMiddle = String.fromCharCode(str1Code + str2Code - 12593 + 1);
        
        sumStr = str1.replace(str1Last, "") + strMiddle + str2.replace(str2First, "");
    }
    
    return sumStr;
}