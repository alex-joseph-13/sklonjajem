
const vowels = 'аяэеыиоёую'
const consonants = 'шщртйпсдфгхжклзцчвбнм'

const englishVowels = 'aeiou'
const englishDoublingConsonants = 'bdgklmnprtvz'



const nounCases = ["nominative","accusative","genitive","dative","prepositional","instrumental"];





function nthVowel(string, n) {
	// 1-based indexing
	if (n==-1){
		return lastVowel(string);
	}
	
	for (let i in string) {
		if(vowels.includes(string[i])) {
			n--;
		}
		if(n==0){
			return +i +1;
		}
	}
	return 0;
}

function lastVowel(string) {
	for (let i=string.length; i>=0; i--){
		if (vowels.includes(string[i])) {
			return i+1;
		}
	}
	return 0;
}

function countVowels(string) {
	let count = 0;
	for (let i of string) {
		if (vowels.includes(i)) {
			count++;
		}
	}
	return count;
}

function stressify(word, stress) {
	const syls = countVowels(word);
	if (syls <= 1){
		return word;
	}
	
	if (stress > syls){
		return stressify(word, -1);
	}
	
	const accentIndex = nthVowel(word, stress);
	
	n = word.length;
	for (let i=0; i<n; i++) {
		if (word[i] == 'ё' && i!=accentIndex-1) {
			word = word.substr(0,i) + 'е' + word.substr(i+1);
		}
	}
	
	if(word[accentIndex-1] == 'ё'){
		return word;
	}
	return word = word.substr(0,accentIndex) + '\u0301' + word.substr(accentIndex);
}

































class Noun {
	base; // the base form is the nominative singular
	declension; // declensions: -1=indeclinable, 0=neuter, 1=masc, 2=fem а/я, 3=fem ь
	stem;
	stress;
	pluralDeclension;
	pluralStem;
	pluralStress;
	paradigmChanges;
	stressChanges;
	translation;
	
	//params:
		//animate: true or false (false by default)
		//declension: -1,0,1,2,3 (guesses by default)
		//paradigmChanges: {0:irreglar nomSing form, 8: irregular genPl form, ...}
		//stress: the stress of the noun, if multisyllable (default -1)
		//pluralStem: (default is same as singular stem)
		//pluralDeclension (default is same as singular)
		//pluralStress (default is same as singular)
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
			throw new Error(docstring);
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
		
		this.paradigmChanges = params.paradigmChanges ?? {};
		if (!!params.genPl) {
			this.paradigmChanges[8] = params.genPl;
		}
		
		this.pluralDeclension = params.pluralDeclension ?? this.declension;
		this.pluralStem = params.pluralStem ?? this.stem;
		
		this.stress = params.stress ?? countVowels(this.paradigmChanges[0] ?? base);
		this.pluralStress = params.pluralStress ?? this.stress;
		this.stressChanges = params.stressChanges ?? {};
		
		
	}
	
	toString(){
		return this.dictionaryForm();
	}
	
	// cases: 0=nominative, 1=accusative, 2=genitive, 3=dative, 4=prepositional, 5=instrumental
	// numbers: 0=singular, 1=plural
	decline(nounCase, number){
		
		
		let overrideNumber = 6*number + nounCase;
		let stress;
		if (overrideNumber in this.stressChanges) {
			stress = this.stressChanges[overrideNumber];
		} else {
			stress = (number==0) ? this.stress : this.pluralStress;
		}
		
		// there are 2 circumstances in which we can skip declension rules:
		
		if (overrideNumber in this.paradigmChanges){
			return stressify(this.paradigmChanges[overrideNumber], stress);
		}
		
		const declension = (number==0)? this.declension : this.pluralDeclension;
		if (declension == -1){
			// indeclinable nouns
			return stressify(this.base, stress);
		}
		
		
		const stem = (number==0) ? this.stem : this.pluralStem;
		
		let output;
		switch(6*number + nounCase) {
			case 0:
				// nom sing
				output = this.base;
				break;
			case 1:
				
				// acc sing
				if (declension == 1 && this.animate) {
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
				if (declension == 0){
					output = stem + 'ом';
				} else if (declension == 1){
					output = stem + ( ('жцчшщ'.includes(stem[stem.length-1])&&stress<=countVowels(stem)) ? 'ём' : 'ом');
				} else if (declension == 2){
					output = stem + ('жцчшщ'.includes(stem[stem.length-1]) ? 'ёй' : 'ой');
				} else {
					output = stem + 'ю';
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
				if (this.animate) {
					return this.decline(2,1)
				} else {
					return this.decline(0,1)
				}
				break;
			case 8:
				// gen pl
				if (declension == 1 && stem[stem.length-2] == 'ц') {
					output = stem + 'ев'
				} else if (declension != 2 && ['ь','ч','ж','ш','щ'].includes(stem[stem.length-1])){
					output = stem + 'ей'
				} else if (declension == 1){
					output = stem + 'ов'
				} else {
					// remove the vowel from the end, but two consonants in a row are not allowed at word end
					if ( (!vowels.includes(stem[stem.length-1])) && !vowels.concat('с').includes(stem[stem.length-2]) ) {
						const epenthetic = (['ш','ь'].includes(stem[stem.length-2])) ? 'e' : 'o';
						output = stem.substr(0,stem.length-1) + epenthetic + stem[stem.length-1];
					} else {
						output = stem;
					}
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
				return this.decline(3,1) + 'и'
				break;
		}
		
		output = output.replace(/[йь]а/,'я');
		output = output.replace(/[йь]е/,'е');
		output = output.replace(/[йь]о/,'ё');
		output = output.replace(/[йь]у/,'ю');
		output = output.replace(/[йь]ы/,'и');
		
		output = output.replace('гы','ги');
		output = output.replace('кы','ки');
		output = output.replace('хы','хи');
		output = output.replace('шы','ши');
		output = output.replace('щы','щи');
		output = output.replace('жы','жи');
		output = output.replace('чы','чи');
		
		output = stressify(output, stress);
		
		
		
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
	
	
	dictionaryForm() {
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
	
	dictionaryForm() {
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
	extra;
	
	constructor(singular, plural){
		
		this.extra = '';
		if (singular[singular.length-1] == ')' ) {
			this.extra = ' ' + singular.substring(singular.indexOf('(')+1, singular.indexOf(')'));
			singular = singular.substr(0, singular.indexOf('(')-1);
		}
		
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
		return this.num(0);
	}
	
	// 0=singular, 1=plural
	num(number) {
		return ((number==0) ? this.singular : this.plural) + this.extra;
	}
	
	possessive(number) {
		if (number == 1 && this.plural[this.plural.length-1] == 's'){
			return this.plural + "'" + this.extra;
		}
		return this.num(number) + "'s" + this.extra;
	}
	
	indefinite(number) {
		if (number == 0) {
			return (englishVowels.includes(this.singular[0]) ? "an " : "a ") + this.num(0);
		} else {
			return "some " + this.num(1);
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
