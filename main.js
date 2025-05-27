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
            "final": "습니다"
        }
    ],
    "연결": [
        {
    	    "non-final": "게",
            "final": "게"
        }
    ]
}

const words = {
	"대명사": [
	    {
		    word: "내"
		}
	],
	"명사": [
	    {
		    word: "사과"
		}
    ],
    "동사": [
        {
        	word: "먹"
         },
         {
         	word: "달리"
         },
         {
         	word: "배우"
         },
         {
         	word: "모으"
         }
     ]
}


const sentenceEl = document.getElementById("sentence");
let sentence = "";

sentenceEl.innerText = sentence;

function makeSentence() {
	const word1 = getWord("동사").word;
	const suffix1 = hasFinalSound(getLastStr(word1)) ? getSuffix()["final"] : getSuffix()["non-final"];
	
	sentence = sumKoreanStr(word1, suffix1);
	sentenceEl.innerText = sentence;
}

function getWord(part) {
	const index = Math.floor(words[part].length * Math.random());
	
	return words[part][index];
}

function getSuffix() {
	const index = Math.floor(suffixs["종결"].length * Math.random());
	
	return suffixs["종결"][index];
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