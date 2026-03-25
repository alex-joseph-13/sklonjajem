
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
	["I'm","you're","it's","we're","y'all are","they're","he's","she's"],
]


const presentEndings =[
	['ю','ешь','ет','ем','ете','ют'],
	['ю','ишь','ит','им','ите','ят']
]

const futureAux = ['буду','будешь','будет','будем','будете','будут']

const pastEndings = ['ло','л','ла','ли']





























class PerfectiveVerb {
	inf;
	verbClass;
	stem;
	stress;
	transitivity;
	translation;
	
	// transitivity is 0 for intransitive, 1 for transitive,
	//  and 2 for ditransitive
	constructor(infinitive, translation, transitivity, params={}){
		this.transitivity = transitivity;
		
		// verb class 1 ends in -ить, class 0 ends in -ть
		//  (usually called 2 and 1 respectively)
		this.verbClass = (infinitive[infinitive.length-3] == 'и') ? 1 : 0;
		
		// понимать -> понима-
		// говорить -> говор-
		this.stem = params.stem ?? infinitive.substr(0, infinitive.length - 2 - this.verbClass);
		this.stress = params.stress ?? countVowels(infinitive);
		
		this.inf = stressify(infinitive, this.stress);
		
		if (translation.includes(" ")){
			this.translation = new EnglishVerbPhrase(translation.substr(0,translation.indexOf(" ")), translation.substring(translation.indexOf(" ")+1,translation.length));
		} else {
			this.translation = getVerb(translation);
		}
		
	}
	
	toString() {
		return this.inf.replace('\u0301','');
	}
	
	//persons: 0=1s, 1=2s, 2=3s, 3=1p, 4=2p, 5=3p
	future(person){
		if(person > 5) {person = 2}
		let stem = this.stem;
		if("бвмфп".includes(stem[stem.length-1]) && person==0){
			stem = stem + 'л';
		}
		const output = stem + presentEndings[this.verbClass][person]
		return stressify(output, this.stress);
	}
	
	//genders: 0=neuter, 1=masc, 2=fem, 3=plural
	past(gender){
		const output = this.stem + ((this.verbClass == 1) ? "и" : "") + pastEndings[gender];
		return stressify(output, this.stress);
	}
	
	//numbers: 0=singular, 1=plural
	command(number){
		let suffix;
		if(this.verbClass == 0) {
			// stem ends in a vowel
			suffix = "й";
		} else if (this.stress > countVowels(this.stem)) {
			// stress on the ending (I ought to be using the stress of the Я form if it is different from default)
			suffix = "и";
		} else if (vowels.includes(this.stem.replace(/ьъ/g,"").slice(-2,-1))) {
			// stem does not end in two consonants (and does not have stress)
			suffix = "ь";
		} else {
			// stem ends in two consonants
			suffix = "и";
		}
		
		if(number==1){
			suffix += 'те';
		}
		const output = this.stem + suffix;
		return stressify(output, this.stress);
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
		return past.substr(0,past.length-1) + 'в';
	}
	
	allConjugations(){
		return [
			['','Я','Ты','Он','Мы','Вы','Они'],
			['future',this.future(0),this.future(1),this.future(2),this.future(3),this.future(4),this.future(5)],
			[],
			['','Оно','Он','Она','Они'],
			['past',this.past(0),this.past(1),this.past(2),this.past(3)],
			[],
			['','Ты','Вы'],
			['command',this.command(0),this.command(1),"",this.inf],
		]
	}
}

class ImperfectiveVerb extends PerfectiveVerb {
	
	//persons: 0=1s, 1=2s, 2=3s, 3=1p, 4=2p, 5=3p
	present(person){
		// if(person>5) {person=2} happens in the below function
		return super.future(person);
	}
	
	future(person){
		if(person > 5) {person = 2}
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
	
	allConjugations(){
		return [
			['','Я','Ты','Он','Мы','Вы','Они'],
			['present',this.present(0),this.present(1),this.present(2),this.present(3),this.present(4),this.present(5)],
			[],
			['','Оно','Он','Она','Они'],
			['past',this.past(0),this.past(1),this.past(2),this.past(3)],
			[],
			['','Ты','Вы'],
			['command',this.command(0),this.command(1),"",this.inf],
		]
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


function getRussianVerb(lemma) {
	let left = 0;
	let right = russianVerbs.length;
	
	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		
		if(russianVerbs[mid].toString() == lemma){
			return russianVerbs[mid];
		}
		
		if (russianVerbs[mid] < lemma){
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
