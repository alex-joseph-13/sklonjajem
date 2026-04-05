
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
	['у','ешь','ет','ем','ете','ут'],
	['ю','ишь','ит','им','ите','ят'],
	['у','ишь','ит','им','ите','ат'],
	['ю','ёшь','ёт','ём','ёте','ют'],
	['у','ёшь','ёт','ём','ёте','ут'],
]

const futureAux = ['буду','будешь','будет','будем','будете','будут']

const pastEndings = ['о','','а','и']




























class PerfectiveVerb {
	inf;
	verbClass;
	stem;
	stress;
	stressShift;
	pastShift;
	irregCommand;
	irregPast;
	regular;
	
	// params:
	//  stem (if different from default)
	//  verbClass (if different from default)
	//  stress (default is last syllable)
	//  stressShift (if the stress shifts back by one syllable in present conjugations)
	//  pastStress (if different from default)
	//  pastShift (if the stress shifts to the ending on femenine past)
	//  irregCommand (command form, if different from computed)
	//  irregPast (past form, if different from computed)
	//  overrides (all present/future forms, if different from computed)
	constructor(infinitive, params={}){
		
		this.regular = true;
		
		// verb class 1 ends in -ить, class 0 ends in -ть
		//  (usually called 2 and 1 respectively)
		if (!!params.verbClass) {
			this.verbClass = params.verbClass;
			this.regular = false;
		} else if (infinitive[infinitive.length-3] == 'у'){
			this.verbClass = 3;
			this.regular = false;
		} else if (infinitive[infinitive.length-3] != 'и'){
			this.verbClass = 0;
		} else if ('кгхжшщчц'.includes(infinitive[infinitive.length-4])){
			this.verbClass = 2;
		} else {
			this.verbClass = 1;
		}
		
		// понимать -> понима-
		// говорить -> говор-
		if (! params.stem) {
			if (this.verbClass >= 1) {
				this.stem = infinitive.slice(0,-3);
			} else {
				this.stem = infinitive.slice(0,-2) + 'й';
			}
		} else {
			this.stem = params.stem;
			this.regular = false;
		}
		
		this.stress = params.stress ?? countVowels(infinitive);
		this.stressShift = (params.stressShift===true) ? this.stress-1 : params.stressShift ?? false;
		this.pastStress = params.pastStress ?? this.stress;
		this.pastShift = !!params.pastShift;
		this.irregCommand = params.irregCommand ?? null;
		this.irregPast = params.irregPast ?? null;
		if ( !!this.irregCommand || !!this.irregPast ) {
			this.regular = false;
		}
		
		if (!!params.overrides) {
			this.overrides = params.overrides;
			this.regular = false;
		} else {
			this.overrides = [];
		}
		
		this.inf = infinitive;
		
	}
	
	toString() {
		return this.inf;
	}
	
	dictionaryForm() {
		return stressify(this.inf, this.stress);
	}
	
	//persons: 0=1s, 1=2s, 2=3s, 3=1p, 4=2p, 5=3p
	future(person){
		if(person > 5) {person = 2}
		const stress = (this.stressShift && person>0) ? this.stressShift : this.stress;
		
		if(person in this.overrides){
			return stressify(this.overrides[person], stress);
		}
		
		let stem = this.stem;
		const suffix = presentEndings[this.verbClass][person];
		
		if("бвмфп".includes(stem[stem.length-1]) && suffix[0] == 'ю'){
			stem = stem + 'л';
		}
		
		let output = stem + suffix;
		output = output.replace(/[йь]е/,'е');
		output = output.replace(/[йь]у/,'ю');
		output = output.replace('ге','же');
		output = output.replace('ке','ше');
		
		return stressify(output, stress);
	}
	
	//genders: 0=neuter, 1=masc, 2=fem, 3=plural
	past(gender){
		const stress = (this.pastShift && gender==2) ? -1 : this.pastStress;
		if (!!this.irregPast) {
			let output = this.irregPast;
			if(output[output.length-1] != 'л' && gender!=1){
				output += 'л';
			}
			output = output + pastEndings[gender];
			return stressify(output, stress);
		}
		const output = this.toString().slice(0,-2) + 'л' + pastEndings[gender];
		return stressify(output, stress);
	}
	
	//numbers: 0=singular, 1=plural
	command(number){
		if(number == 1){
			return this.command(0) + 'те';
		}
		
		if(this.irregCommand != null) {
			return this.irregCommand;
		}
		
		let suffix;
		if(this.stem[this.stem.length-1] == 'й') {
			// stem ends in a vowel
			suffix = "";
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
			['command',this.command(0),this.command(1),"",this.dictionaryForm()],
			[],
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
			['command',this.command(0),this.command(1),"",this.dictionaryForm()],
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


class EnglishVerbPhrase extends EnglishVerb {
	verb;
	complement;
	
	constructor(verb, complement){
		super();
		this.verb = verb;
		
		this.complement = " " + complement;
		this.base = verb + this.complement;
	}
	
	past() {return this.verb.past() + this.complement;}
	participle() {return this.verb.participle() + this.complement;}
	singular() {return this.verb.singular() + this.complement;}
	gerund() {return this.verb.gerund() + this.complement;}
}











function getVerb(lemma) {
	if (lemma.includes(' ')){
		return new EnglishVerbPhrase(getVerb(lemma.substr(0,lemma.indexOf(' '))), lemma.substr(lemma.indexOf(' ')+1));
	}
	
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
	
	const msg = "no such english verb exists: " + lemma;
	console.log(msg);
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









































class VerbPair {
	imp;
	perf;
	translations;
	predicates;
	englishPreds;
	properties;
	
	constructor(imp, perf, translations, predicates, englishPreds, properties={}) {
		this.imp = getRussianVerb(imp);
		this.perf = getRussianVerb(perf);
		if(translations instanceof Array) {
			this.translations = translations.map(v => getVerb(v));
		} else {
			this.translations = [getVerb(translations)];
		}
		this.predicates = predicates ?? [''];
		this.englishPreds = englishPreds ?? [''];
		this.properties = properties;
	}
}