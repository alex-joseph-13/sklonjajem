
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
	new EnglishVerb("cook"),
	
]

englishVerbs.sort();



regularImperfectiveVerbs = [

	new ImperfectiveVerb("работать", "work", 0),
	new ImperfectiveVerb("обедать", "eat lunch", 0),
	new ImperfectiveVerb("кашлять", "cough", 0),
	new ImperfectiveVerb("говорить", "speak", 0),
	new ImperfectiveVerb("готовить", "cook", 0),
	
	new ImperfectiveVerb("забывать", "forget", 1),
	new ImperfectiveVerb("изучать", "learn", 1),
	new ImperfectiveVerb("делать", "do", 1),
	new ImperfectiveVerb("знать", "know", 1),
	new ImperfectiveVerb("читать", "read", 1),
	new ImperfectiveVerb("понимать", "understand", 1),
	new ImperfectiveVerb("решать", "solve", 1),
	new ImperfectiveVerb("помогать", "help", 1),

	new ImperfectiveVerb("отправлять", "send", 2),
	new ImperfectiveVerb("показывать", "show", 2),
	
]

const intransitiveVerbs = regularImperfectiveVerbs.filter(v => v.transitivity == 0);

const russianVerbs = regularImperfectiveVerbs.sort(); //TODO update this by adding the rest of the verbs


let regularNouns = [

	new Noun('урок','assignment'),
	new Noun('язык','language',{stress:-1}),
	new Noun('класс','class'),
	new Noun('человек',['person','people'], {animate:true}),
	new Noun('здание','building',{stress:1}),
	new Noun('школа','school',{stress:1}),
	new Noun('вопрос','question'),
	new Noun('идиот','(male) idiot',{animate:true}),
	new Noun('лицо','face',{pluralStress:1}),
	new Noun('рука','hand',{stressChanges:{1:1,6:1}}),
	new Noun('дело','thing',{stress:1,pluralStress:-1}),
	new Noun('голова','head',{stressChanges:{1:1,6:1}}),
	new Noun('слово','word',{stress:1,pluralStress:-1}),
	new Noun('место','place',{stress:1,pluralStress:-1}),
	new Noun('мама','mom',{animate:true,stress:1}),
	new Noun('креп','crepe'),
	new Noun('писатель','author',{animate:true,stress:2}),
	new Noun('врач','doctor',{animate:true,pluralStress:-1}),
	
	new Noun('девушка','girl',{animate:true,stress:1,genPl:"девушек"}),
	new Noun('идиотка','(female) idiot',{animate:true,stress:3,genPl:"идиоток"}),
	new Noun('эсэмэска','text message',{stress:3,genPl:'эсэмэсок'}),
	
]


let singularNouns = [
	new DefectiveSingularNoun('еда',['food']),
	new Noun('математика',['math'],{stress:3}),
	new Noun('физика',['physics'],{stress:1}),
	new Noun('образование','education',{stress:4}),
	
	new Noun('чай',['tea'],{pluralStress:-1}),
]

let pluralNouns = [
	new DefectivePluralNoun('деньга',['money'],{genPl:"денег",stress:1,stressChanges:{9:-1,10:-1}}),
]



let irregularNouns = [
	new Noun('парнь','guy',{stress:1,animate:true,paradigmChanges:["парень"],stressChanges:{8:2,9:2,10:2}}),
	new Noun('друг','friend',{animate:true,pluralStem:"друзьй",pluralDeclension:0,pluralStress:-1,genPl:"друзей"}),
	new Noun('глаз','eye',{pluralDeclension:0,pluralStress:-1}),
	new Noun('днь','day',{paradigmChanges:['день']}),
	new Noun('дом','house',{paradigmChanges:{6:'дома'},pluralStress:-1}),
	new Noun('отц','father',{animate:true,paradigmChanges:['отец']}),
]

let newNouns = [
]


let nouns = regularNouns.concat(irregularNouns);
