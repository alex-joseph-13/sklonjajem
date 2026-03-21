
const vowels = 'аяэеыиоёую'

const englishVowels = 'aeiou'
const englishDoublingConsonants = 'bdgklmnprtvz'

const presentEndings =[
	['ю','ешь','ет','ем','ете','ют'],
	['ю','ишь','ит','им','ите','ят']
]

const futureAux = ['буду','будешь','будет','будем','будете','будут']

const pastEndings = ['ло','л','ла','ли']

const commandEndings = [
	['й','йте'],
	['и','ите']
]

const nounCases = ["nominative","accusative","genitive","dative","prepositional","instrumental"];

const russianPronouns = [
	['я','ты','оно','мы','вы','они','он','она'],
	['меня','тебя','его','нас','вас','их','его','её'],
	['меня','тебя','его','нас','вас','их','его','её'],
	['мне','тебе','ему','нам','вам','им','ему','ей'],
	['мне','тебе','нём','нас','вас','них','ему','ней'],
	['мной','тобой','им','нами','вами','ими','им','ей'],
]

const englishPronouns = [
	['I','you','it','we',"y'all",'they','he','she'],
	['me','you','it','us',"y'all",'them','him','her'],
	['my','your','its','our',"y'alls",'their','his','her'],
]































class PerfectiveVerb {
	inf;
	verbClass;
	stem;
	transitivity;
	translation;
	
	// transitivity is 0 for intransitive, 1 for transitive,
	//  and 2 for ditransitive
	constructor(infinitive, translation, transitivity, stem=null){
		this.inf = infinitive;
		this.transitivity = transitivity;
		
		// verb class 1 ends in -ить, class 0 ends in -ть
		//  (usually called 2 and 1 respectively)
		this.verbClass = (infinitive[infinitive.length-3] == 'и') ? 1 : 0;
		
		// понимать -> понима-
		// говорить -> говор-
		if (stem == null) {
			this.stem = infinitive.substr(0, infinitive.length - 2 - this.verbClass);
		} else {
			this.stem = stem;
		}
		
		if (translation.includes(" ")){
			this.translation = new EnglishVerbPhrase(translation.substr(0,translation.indexOf(" ")), translation.substring(translation.indexOf(" ")+1,translation.length));
		} else {
			this.translation = getVerb(translation);
		}
		
	}
	
	toString() {
		return this.inf;
	}
	
	//persons: 0=1s, 1=2s, 2=3s, 3=1p, 4=2p, 5=3p
	future(person){
		return this.stem + presentEndings[this.verbClass][person]
	}
	
	//genders: 0=neuter, 1=masc, 2=fem, 3=plural
	past(gender){
		return this.stem + pastEndings[person];
	}
	
	//numbers: 0=singular, 1=plural
	command(number){
		return this.stem + commandEndings[this.verbClass][number]
	}
	
	activePastParticiple(){
		return stem + "вший";
	}
	
	passivePastParticiple(){
		if (this.verbClass == 0){
			return stem + "нный";
		} else {
			return stem + "енный";
		}
	}
	
	adverbialPastParticiple(){
		let past = this.past(1);
		return past.substr(0,past.length-1) + 'в'
	}
}

class ImperfectiveVerb extends PerfectiveVerb {
	
	//persons: 0=1s, 1=2s, 2=3s, 3=1p, 4=2p, 5=3p
	present(person){
		return super.future(person);
	}
	
	future(person){
		return futureAux[person] + " " + this.inf;
	}
	
	//past and command methods are inherited
	
	activePresentParticiple(){
		let form3p = this.present(5);
		return form3p.substr(0,form3p.length-1) + "щий";
	}
	
	passivePresentParticiple(){
		return this.present(3) + "ый";
	}
	
	adverbialPresentParticiple(){
		return stem + (verbClass == 0) ? "я" : "а";
	}
	
}



class Noun {
	base; // the base form is the nominative singular
	declension; // declensions: -1=indeclinable, 0=neuter, 1=masc, 2=fem а/я, 3=fem ь
	stem;
	pluralDeclension;
	pluralStem;
	paradigmChanges;
	translation;
	
	//params:
		//animate: true or false (false by default)
		//declension: -1,0,1,2,3
		//paradigmChanges: {0:irreglar nomSing form, 8: irregular genPl form, ...}
		//pluralStem: (default is same as singular stem)
		//pluralDeclension (default is same as singular)
		//genPl: specifically the form for the genitive plural, if this is the only thing that is different
	
	constructor(base, translation, params={}) {
		this.base = base;
		this.animate = !!params.animate;
		
		const docstring = `
		 the translation parameter can be:
			a string, if it is a regular noun (e.g. "computer")
			an array of two strings, if it's an irregular noun (e.g. ["goose","geese"])
			an array of one string, if it's an uncountable noun (e.g. ["rice"])`
		if (typeof translation == "string") {
			this.translation = new EnglishNoun(translation);
		} else if (translation instanceof Array) {
			if (translation.length == 1){
				this.translation = new EnglishUncountableNoun(translation[0]);
			} else {
				this.translation = new EnglishNoun(translation[0],translation[1]);
			}
		} else {
			throw new Error("The translation parameter must be an EnglishNoun, string, or array of strings.")
		}
		
		if (params.declension == undefined) {
			if (['а','я'].includes(base[base.length-1])) {
				this.declension = 2;
			} else if (['о','е'].includes(base[base.length-1])) {
				this.declension = 0;
			} else {
				this.declension = 1;
			}
		} else {
			this.declension = params.declension;
		}
		
		if (['а','о'].includes(base[base.length-1])){
			this.stem = base.substr(0, base.length-1);
		} else if (['я','е'].includes(base[base.length-1])){
			this.stem = base.substr(0, base.length-1) + 'й';
		} else {
			this.stem = base;
		}
		
		this.pluralDeclension = params.pluralDeclension ?? this.declension;
		this.pluralStem = params.pluralStem ?? this.stem;
		
		this.paradigmChanges = params.paradigmChanges ?? {};
		if (!!params.genPl) {
			this.paradigmChanges[8] = params.genPl;
		}
		
	}
	
	toString(){
		return this.lemma();
	}
	
	// cases: 0=nominative, 1=accusative, 2=genitive, 3=dative, 4=prepositional, 5=instrumental
	// numbers: 0=singular, 1=plural
	decline(nounCase, number){
		
		let overrideNumber = 6*number + nounCase;
		if (overrideNumber in this.paradigmChanges){
			return this.paradigmChanges[overrideNumber];
		}
		
		let stem = (number==0) ? this.stem : this.pluralStem;
		let declension = (number==0) ? this.declension : this.pluralDeclension;
		let animate = this.animate;
		
		if (declension == -1){
			// indeclinable nouns
			return this.base;
		}
		
		let output;
		
		switch(6*number + nounCase) {
			case 0:
				// nom sing
				output = this.base;
				break;
			case 1:
				
				// acc sing
				if (declension == 1 && animate) {
					return this.decline(2,0);
				} else if (declension == 2){
					output = stem + 'у'
				} else {
					return this.decline(0,0);
				}
				break;
			case 2:
				// gen sing
				if (declension <= 1){
					output = stem + 'а'
				} else {
					output = stem + 'ы'
				}
				break;
			case 3:
				// dat sing
				if (declension <= 1){
					output = stem + 'у'
				} else if (declension == 2){
					return this.decline(4,0)
				} else {
					output = stem + 'ы'
				}
				break;
			case 4:
				// prep sing
				if (declension == 3){
					output = stem + 'ы'
				} else if (this.base[this.base.length-2] == 'и') {
					output = stem + 'ы'
				} else {
					output = stem + 'е'
				}
				break;
			case 5:
				// inst sing
				if (declension <= 1){
					output = stem + 'ом'
				} else if (declension == 2){
					output = stem + 'ой'
				} else {
					output = stem + 'ю'
				}
				break;
			case 6:
				// nom pl
				if (declension == 0){
					output = stem + 'а'
				} else {
					output = stem + 'ы';
				}
				break;
			case 7:
				// acc pl
				if (animate) {
					return this.decline(2,1)
				} else {
					return this.decline(0,1)
				}
				break;
			case 8:
				// gen pl
				if (declension == 1 && stem[stem.length-2] == 'й') {
					output = stem + 'ев'
				} else if (declension != 2 && stem[stem.length-1] == 'ь'){
					output = stem + 'ей'
				} else if (declension == 1){
					output = stem + 'ов'
				} else {
					output = stem
				}
				break;
			case 9:
				// dat pl
				output = stem + 'ам'
				break;
			case 10:
				// prep pl
				output = stem + 'ах'
				 break;
			case 11:
				// inst pl
				output = stem + 'ами'
				break;
		}
		
		output = output.replace('йа','я');
		output = output.replace('ьа','я');
		output = output.replace('йе','е');
		output = output.replace('ье','е');
		output = output.replace('йо','ё');
		output = output.replace('ьо','ё');
		output = output.replace('йу','ю');
		output = output.replace('ьу','ю');
		output = output.replace('йы','и');
		output = output.replace('ьы','и');
		
		output = output.replace('гы','ги');
		output = output.replace('кы','ки');
		output = output.replace('хы','хи');
		output = output.replace('шы','ши');
		output = output.replace('щы','щи');
		output = output.replace('жы','жи');
		output = output.replace('чы','чи');
		
		return output;
		
		
		// and those are the declensions.
	}
	
	
	allDeclensions() {
		let ret = [[],[]];
		
		for (let i=0; i<6; i++){
			ret[0].push(this.decline(i,0));
		}
		for (let i=0; i<6; i++){
			ret[1].push(this.decline(i,1));
		}
		
		return ret;
	}
	
	
	lemma() {
		return this.decline(0,0);
	}
	
}


class DefectivePluralNoun extends Noun {
	decline(nounCase, number) {
		if (number == 0){
			return undefined;
		} else {
			return super.decline(nounCase,1);
		}
	}
	
	lemma() {
		return this.decline(0,1);
	}
	
}

class DefectiveSingularNoun extends Noun {
	decline(nounCase, number) {
		if (number == 1){
			return undefined;
		} else {
			return super.decline(nounCase,0);
		}
	}
	
}

//а я е ы и о ё у ю й ь

































class EnglishNoun {
	
	singular;
	plural;
	
	constructor(singular, plural){
		this.singular = singular;
		
		if (plural == '-'){
			this.plural = singular + " (plural)"
		} else if (!plural) {
			if (['s','z'].includes(singular[singular.length-1])) {
				this.plural = singular + 'es';
			} else if (['ch','sh'].includes(singular.substr(singular.length-2,2))) {
				this.plural = singular + 'es';
			} else if (singular[singular.length-1] == 'y' && !englishVowels.includes(singular[singular.length-2])) {
				this.plural = singular.substr(0,singular.length-1) + 'ies';
			} else {
				this.plural = singular + 's';
			}
		} else {
			this.plural = plural;
		}
	}
	
	toString() {
		return this.singular;
	}
	
	// 0=singular, 1=plural
	num(number) {
		return (number==0) ? this.singular : this.plural;
	}
	
	possessive(number) {
		if (number == 1 && this.plural[this.plural.length-1] == 's'){
			return this.plural + "'";
		}
		return this.num(number) + "'s";
	}
	
	indefinite(number) {
		if (number == 0) {
			return (englishVowels.includes(this.singular[0]) ? "an " : "a ") + this.singular;
		} else {
			return "some " + this.plural;
		}
	}
}


class EnglishUncountableNoun extends EnglishNoun {
	constructor(singular) {
		super(singular, singular);
	}
	
	indefinite(number) {
		return "some " + this.singular;
	}
}


class EnglishVerb {
	base;
	
	//params: singular (does), past (did), participle (done)
	constructor(base, params={}) {
		this.base = base;
		if (!!params.past){
			this.specialPast = params.past;
		}
		if (!! params.participle) {
			this.specialParticiple = params.participle;
		}
		if (!! params.singular){
			this.specialSingular = params.singular;
		}
	}
	
	
	toString(){
		return this.base;
	} 
	
	past() {
		if (!!this.specialPast) {
			return this.specialPast;
		}
		const base = this.base;
		const L = base.length;
		if (base[L-1] == 'e'){
			return base + 'd';
		}
		if (base[L-1] == 'y'){
			return base.substr(0,L-1) + 'ied';
		}
		if (base[L-1] == 'c' && englishVowels.includes(base[L-2])){
			return base + "ked";
		}
		if (englishDoublingConsonants.includes(base[L-1]) && englishVowels.includes(base[L-2]) && ! englishVowels.includes(base[L-3])){
			return base + base[L-1] + "ed";
		}
		return base + 'ed';
	}
	
	participle() {
		if (!!this.specialParticiple){
			return this.specialParticiple;
		}
		return this.past();
	}
	
	singular() {
		const base = this.base;
		
		if(!!this.specialSingular){
			return (this.specialSingular == "-") ? this.base : this.specialSingular;
		}
		
		if (['s','z'].includes(base[base.length-1])) {
			return base + 'es';
		} else if (['ch','sh'].includes(base.substr(base.length-2,2))) {
			return base + 'es';
		} else if (base[base.length-1] == 'o' && base[base.length-2] != 'o') {
			return base + 'es';
		} else if (base[base.length-1] == 'y' && !englishVowels.includes(base[base.length-2])) {
			return base.substr(0,base.length-1) + 'ies';
		} else {
			return base + 's';
		}
	}
	
	gerund() {
		const base = this.base;
		const L = base.length;
		
		if (base[L-1] == 'e'){
			return base.substr(0,L-1) + 'ing';
		}
		if (base.substr(L-2,2) == "ie"){
			return base.substr(0,L-2) + "ying";
		}
		if (base[L-1] == 'c' && englishVowels.includes(base[L-2])){
			return base + "king";
		}
		if (englishDoublingConsonants.includes(base[L-1]) && englishVowels.includes(base[L-2]) && ! englishVowels.includes(base[L-3])){
			return base + base[L-1] + "ing";
		}
		return base + 'ing';
	}
	
}


function getVerb(lemma) {
	let left = 0;
	let right = englishVerbs.length;
	
	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		
		if(englishVerbs[mid].toString() == lemma){
			return englishVerbs[mid];
		}
		
		if (englishVerbs[mid] < lemma){
			left = mid+1;
		} else {
			right = mid-1;
		}
		
	}
	
	return null;
}


class EnglishVerbPhrase extends EnglishVerb {
	verb;
	complement;
	
	constructor(verb, complement){
		if(typeof verb == "string"){
			super();
			this.verb = getVerb(verb) ?? new EnglishVerb(verb);
		}
		
		this.complement = " " + complement;
		this.base = verb + this.complement;
	}
	
	past() {return this.verb.past() + this.complement;}
	participle() {return this.verb.participle() + this.complement;}
	singular() {return this.verb.singular() + this.complement;}
	gerund() {return this.verb.gerund() + this.complement;}
}




































englishVerbs = [
	
	new EnglishVerb("work"),
	new EnglishVerb("eat", {past:"ate",participle:"eaten"}),
	new EnglishVerb("cough"),
	new EnglishVerb("speak", {past:"spoke",participle:"spoken"}),
	new EnglishVerb("forget", {past:"forgot",participle:"forgotten"}),
	new EnglishVerb("study"),
	new EnglishVerb("do", {past:"did",participle:"done"}),
	new EnglishVerb("know", {past:"knew",participle:"known"}),
	new EnglishVerb("read", {past:"read"}),
	new EnglishVerb("understand", {past:"understood"}),
	new EnglishVerb("solve"),
	new EnglishVerb("help"),
	new EnglishVerb("send", {past:"sent"}),
	new EnglishVerb("show", {participle:"shown"}),
	
]

englishVerbs.sort();



regularImperfectiveVerbs = [

	new ImperfectiveVerb("работать", "work", 0),
	new ImperfectiveVerb("обедать", "eat lunch", 0),
	new ImperfectiveVerb("кашлять", "cough", 0),
	new ImperfectiveVerb("говорить", "speak", 0),
	
	new ImperfectiveVerb("забывать", "forget", 1),
	new ImperfectiveVerb("изучать", "study", 1),
	new ImperfectiveVerb("делать", "do", 1),
	new ImperfectiveVerb("знать", "know", 1),
	new ImperfectiveVerb("читать", "read", 1),
	new ImperfectiveVerb("понимать", "understand", 1),
	new ImperfectiveVerb("решать", "solve", 1),
	new ImperfectiveVerb("помогать", "help", 1),

	new ImperfectiveVerb("отправлять", "send", 2),
	new ImperfectiveVerb("показывать", "show", 2),
	
]


regularNouns = [

	new Noun('урок','assignment'),
	new Noun('язык','language'),
	new Noun('класс','class'),
	new Noun('человек',['person','people'], {animate:true}),
	new Noun('здание','building'),
	new Noun('школа','school'),
	new Noun('вопрос','question'),
	new Noun('эсэмэска','text message'),
	new Noun('идиот','(male) idiot',{animate:true}),
	new Noun('рука','hand'),
	new Noun('дело','thing'),
	new Noun('голова','head'),
	new Noun('слово','word'),
	new Noun('место','place'),
	new Noun('лицо','face'),
	new Noun('мама','mom',{animate:true}),
	
	new Noun('девушка','girl',{animate:true,genPl:"девушек"}),
	new Noun('идиотка','(female) idiot',{animate:true,genPl:"идиоток"}),
	
]


singularNouns = [
	new DefectiveSingularNoun('еда',['food']),
	new Noun('чай',['tea']),
	new Noun('математика',['math']),
	new Noun('физика',['physics']),
]

pluralNouns = [
	new DefectivePluralNoun('деньга',['money'],{genPl:"денег"}),
]



irregularNouns = [
	new Noun('парнь','guy',{animate:true,paradigmChanges: ["парень"]}),
	new Noun('друг','friend',{animate:true,pluralStem:"друзьй",pluralDeclension:0,genPl:"друзей"}),
	new Noun('глаз','eye',{pluralDeclension:0}),
	new Noun('днь','day',{paradigmChanges:['день']}),
	new Noun('дом','house',{paradigmChanges:{6:'дома'}}),
	new Noun('отц','father',{animate:true,paradigmChanges:['отец']}),
]


let nouns = regularNouns.concat(irregularNouns);




































class Exercise {
	russianLemma;
	englishSentence;
	englishWord;
	russianSentence;
	russianWord;
	details;
}

class NounExercise {
	constructor(noun, nounCase, number) {
		this.russianLemma = noun.toString();
		this.englishWord = noun.translation.num(number);
		this.russianWord = noun.decline(nounCase, number);
		this.details = nounCases[nounCase] + [" singular"," plural"][number];
	}
}


nounExercises = [

	// nominative templates
	[
		// (person) has (noun)
		class extends NounExercise {
			constructor(noun, number) {
				super(noun, 0, number);
				
				const c = Math.floor(Math.random() * 8) //choice of pronoun
				
				this.englishSentence = englishPronouns[0][c] + ([2,6,7].includes(c) ? " has " : " have ") + "_.";
				this.englishWord = ((number == 0) ? "a " : "some ") + noun.translation.num(number);
				this.russianSentence = ([2,5,6,7].includes(c) ? "У н" : "У ") + russianPronouns[1][c] + " есть _.";
			}
		},
		
		// nominative template: the (noun) (does something)
		class extends NounExercise {
			constructor(noun, number) {
				super(noun, 0, number);
				
				const intransitiveVerbs = regularImperfectiveVerbs.filter(v => v.transitivity == 0);
				const verb = intransitiveVerbs[Math.floor(Math.random()*intransitiveVerbs.length)];
				
				this.englishSentence = "_ " + ((number==0) ? verb.translation.singular() : verb.translation.base) + ".";
				this.englishWord = "The " + noun.translation.num(number);
				this.russianSentence = "_ " + verb.present(2 + 3*number) + ".";
			}
		},
	],

	// accusative templates
	[
		// send (person) the (noun)
		class extends NounExercise {
			constructor(noun, number) {
				super(noun, 1, number);
				
				let p = [0,3,5,6,7][Math.floor(Math.random() * 5)]
				//choice of pronoun from [me, us, them, him, her]
				
				this.englishSentence = "Send " + englishPronouns[1][p] + " _.";
				this.englishWord = "the " + noun.translation.num(number);
				this.russianSentence = "Отправлай " + russianPronouns[3][p] + " _.";
			}
		},
	],

	// genitive templates
	[
		// (person) doesn't have (noun)
		class extends NounExercise {
			constructor(noun, number) {
				super(noun, 2, number);
				
				const c = Math.floor(Math.random() * 8) //choice of pronoun
				
				this.englishSentence = englishPronouns[0][c] + ([2,6,7].includes(c) ? " doesn't have " : " don't have ") + "_.";
				this.englishWord = noun.translation.indefinite(number).replace('some','any')
				this.russianSentence = ([2,5,6,7].includes(c) ? "У н" : "У ") + russianPronouns[1][c] + " нет _.";
			}
		},
	],

	// dative templates
	[
		// send (money / a messsage) to (noun)
		class extends NounExercise {
			constructor(noun, number) {
				super(noun, 3, number);
				
				const c = Math.floor(Math.random() * 2) //choice of object
				
				this.englishSentence = "Send " + ["money","a message"][c] + " to _.";
				this.englishWord = "the " + noun.translation.num(number);
				this.russianSentence = "Отправлай " + ["деньги","эсэмэску"][c] + " _.";
			}
		},
	],
	
	// prepositional templates
	[
	],
	
	// instrumental templates
	[
	]
];


