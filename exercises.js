
function prepForm(prep, noun) {
	noun = noun.replace(/[ьъ]/g,'');
	noun = noun.replace('ф','в');
	if (countVowels(noun) <= 1 && !vowels.includes(noun[0]) && !vowels.includes(noun[1]) ) {
		return prep + 'о';
	}
	if (noun[0] == prep[prep.length-1] && !vowels.includes(noun[1])){
		return prep + 'о';
	}
	return prep;
}





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
				this.englishWord = noun.translation.indefinite(number);
				this.russianSentence = ([2,5,6,7].includes(c) ? "У н" : "У ") + russianPronouns[2][c] + " есть _.";
			}
		},
		
		// nominative template: the (noun) (does something)
		class extends NounExercise {
			constructor(noun, number) {
				super(noun, 0, number);
				
				const verb = intransitiveVerbs[Math.floor(Math.random()*intransitiveVerbs.length)];
				
				this.englishSentence = "_ " + ((number==0 || noun.translation instanceof EnglishUncountableNoun) ? verb.translation.singular() : verb.translation.base) + ".";
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
				
				let c = +(Math.random() > 0.5)
				let p = [0,3,5,6,7][Math.floor(Math.random() * 5)]
				//choice of pronoun from [me, us, them, him, her]
				
				this.englishSentence = ["Send ","Show "][c] + englishPronouns[1][p] + " _.";
				this.englishWord = "the " + noun.translation.num(number);
				this.russianSentence = ["Отправи ","Показай "][c] + russianPronouns[3][p] + " _.";
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
				this.russianSentence = ([2,5,6,7].includes(c) ? "У н" : "У ") + russianPronouns[2][c] + " нет _.";
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
				
				this.englishSentence = "Send " + ["money","a text"][c] + " to _.";
				this.englishWord = "the " + noun.translation.num(number);
				this.russianSentence = "Отправлай " + ["деньги","эсэмэску"][c] + " _.";
			}
		},
		
		// the (noun) needs to (verb)
		class extends NounExercise {
			constructor(noun, number) {
				super(noun, 3, number);
				
				const verb = intransitiveVerbs[Math.floor(Math.random()*intransitiveVerbs.length)];
				
				this.englishSentence = ((number==0 || noun.translation instanceof EnglishUncountableNoun) ? "_ needs to " : "_ need to ") + verb.translation.toString();
				this.englishWord = "the " + noun.translation.num(number);
				this.russianSentence = "_ надо " + verb.inf;
				
				
			}
		}
	],
	
	// prepositional templates
	[
	
		
	
	],
	
	// instrumental templates
	[
	
		// (person) cooks using (noun)
		// -or-
		// (person) is (doing verb) with (anim. noun)
		class extends NounExercise {
			constructor(noun, number) {
				super(noun, 5, number);
				
				const p = Math.floor(Math.random()*8);
				
				if (noun.animate) {
					const c = + (Math.random() > 0.5);
					
					this.englishSentence = englishPronouns[3][p] + [" having lunch with _."," cooking with _."][c];
					this.englishWord = "the " + noun.translation.num(number);
					this.russianSentence = russianPronouns[0][p] + " " + getRussianVerb(["обедать","готовить"][c]).present(p) + " " + prepForm('с',this.russianWord) + " _.";
				} else {
					this.englishSentence = englishPronouns[3][p] + " cooking _.";
					this.englishWord = "using " + noun.translation.indefinite(number);
					this.russianSentence = russianPronouns[0][p] + " " + getRussianVerb('готовить').present(p) + " _.";
				}
				
			}
		}
		
	]
];
















class VerbExercise extends Exercise {
	
	/*russianLemma;
	englishSentence;
	englishWord;
	russianSentence;
	russianWord;
	details;*/
	englishLemma;
	
	constructor (vPair, person, isPerfective) {
		super();
		const c = Math.floor(Math.random() * vPair.predicates.length);
		
		let es = englishPronouns[0][person] + " _ " + vPair.englishPreds[c] + ".";
		let rs = russianPronouns[0][person] + " _ " + vPair.predicates[c] + ".";
		rs = rs.replace(' ,',',');
		this.russianLemma = isPerfective ? vPair.perf : vPair.imp;
		this.englishLemma = vPair.translations[ (c >= vPair.translations.length) ? 0 : c ];
		
		if(es.includes('(') || rs.includes('(')){
			let p = Math.floor(Math.random()*8);
			if((p == 0 || p == 3) && (person == 0 || person == 3)){
				p = p / 3 + 6;
			} else if ((p == 1 || p == 4) && (person == 1 || person == 4)){
				p = (p-1)/3 + 6;
			}
			console.log('replacing time');
			
			es = es.replace('(s)',englishPronouns[0][p]);
			es = es.replace('(o)',englishPronouns[1][p]);
			es = es.replace('(p)',englishPronouns[2][p]);
			es = es.replace('(rp)',englishPronouns[2][person]);
			
			rs = rs.replace('(н)',russianPronouns[0][p]);
			rs = rs.replace('(а)',russianPronouns[1][p]);
			rs = rs.replace('(г)',russianPronouns[2][p]);
			rs = rs.replace('(д)',russianPronouns[3][p]);
			rs = rs.replace('(п)',russianPronouns[4][p]);
			rs = rs.replace('(и)',russianPronouns[5][p]);
		}
		
		this.englishSentence = es;
		this.russianSentence = rs;
		
	}
	
}


class presentVerbExercise extends VerbExercise {
	constructor(vPair, person) {
		super(vPair, person, false);
		
		
		if(vPair.properties.noGerund) {
			this.englishWord = this.englishLemma.toString();
		} else {
			this.englishWord = this.englishLemma.gerund();
			this.englishSentence = this.englishSentence.replace(englishPronouns[0][person],englishPronouns[3][person]);
		}
		
		this.russianWord = this.russianLemma.present(person);
		if(person >= 6) {person = 2};
		this.details = ['1st','2nd','3rd'][person%3 +1] + ' person ' + ['singular','plural'][Math.floor(person/3)] + " present";
	}
}
