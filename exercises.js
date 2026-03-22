
function prepForm(prep, noun) {
	noun = noun.replace(/[ьъ]/g,'');
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
				this.englishWord = ((number == 0) ? "a " : "some ") + noun.translation.num(number);
				this.russianSentence = ([2,5,6,7].includes(c) ? "У н" : "У ") + russianPronouns[1][c] + " есть _.";
			}
		},
		
		// nominative template: the (noun) (does something)
		class extends NounExercise {
			constructor(noun, number) {
				super(noun, 0, number);
				
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
				super(noun, 4, number);
				
				const p = Math.floor(Math.random()*8);
				
				if (noun.animate) {
					const c = + (Math.random() > 0.5);
					
					this.englishSentence = englishPronouns[3][p] + [" having lunch with _."," cooking with _."][c];
					this.englishWord = "the " + noun.translation.num(number);
					this.russianSentence = russianPronouns[0][p] + " " + getRussianVerb(["обедать","готовить"][c]).present(p) + " " + prepForm('с',this.russianWord) + " _.";
				} else {
					this.englishSentence = englishPronouns[3][p] + " cooking using _.";
					this.englishWord = noun.translation.indefinite(number);
					this.russianSentence = russianPronouns[0][p] + " " + getRussianVerb('готовить').present(p) + " " + prepForm('с',this.russianWord) + " _.";
				}
				
			}
		}
		
	]
];