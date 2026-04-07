
let englishVerbs = [
	
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
	new EnglishVerb("find", {past:"found"}),
	new EnglishVerb("decide"),
	new EnglishVerb("create"),
	new EnglishVerb("cause"),
	new EnglishVerb("close"),
	new EnglishVerb('consider'),
	new EnglishVerb('think',{past:'thought'}),
	new EnglishVerb('write',{past:'wrote',participle:'written'}),
	new EnglishVerb('cost',{past:'cost'}),
	new EnglishVerb('love'),
	new EnglishVerb('fall',{past:'fell',participle:'fallen'}),
	new EnglishVerb('watch'),
	new EnglishVerb('listen'),
	new EnglishVerb('give',{past:'gave',participle:'given'}),
	new EnglishVerb('call'),
	new EnglishVerb('want'),
	
]

englishVerbs.sort();


let perfectiveVerbs = [
	new PerfectiveVerb("отправить",{stress:2}),
	new PerfectiveVerb("забыть",{stem:"забуд"}),
	new PerfectiveVerb("изучить",{stressShift:true}),
	new PerfectiveVerb("сделать",{stress:1}),
	new PerfectiveVerb("узнать"),
	new PerfectiveVerb("прочитать"),
	new PerfectiveVerb("понять",{stem:"пойм",verbClass:4,command:'пойми',pastStress:1,pastShift:true}),
	new PerfectiveVerb("поработать",{stress:3}),
	new PerfectiveVerb("решить"),
	new PerfectiveVerb("показать",{stem:'покаж',stressShift:true}),
	new PerfectiveVerb("пообедать",{stress:3}),
	new PerfectiveVerb("кашлянуть",{stress:1}),
	new PerfectiveVerb("помочь",{stem:'помог',irregPast:'помог',stress:3,stressShift:true}),
	new PerfectiveVerb("сказать",{stem:'скаж',stressShift:true}),
	new PerfectiveVerb("приготовить",{stress:3}),
	new PerfectiveVerb("создать",{pastShift:true,overrides:['создам','создашь','создаст','создадим','создадите','создадут'],stressShift:3}),
	new PerfectiveVerb("закрыть",{stem:"закрой"}),
	new PerfectiveVerb("написать",{stem:'напиш',stressShift:true}),
	new PerfectiveVerb("захотеть",{overrides:['захочу','захо́чешь','захо́чет']}),
	new PerfectiveVerb("полюбить",{stressShift:true}),
	new PerfectiveVerb("подумать",{stress:2}),
	new PerfectiveVerb("посмотреть",{stressShift:true}),
	new PerfectiveVerb("послушать",{stress:2}),
	new PerfectiveVerb("дать",{pastShift:true,overrides:['дам','дашь','даст','дадим','дадите','дадут'],stressShift:2}),
	new PerfectiveVerb("позвать",{stem:'позов',verbClass:4,stress:3}),
	new PerfectiveVerb('съесть',{overrides:['съем','съешь','съест','съедим','съедите','съедят'],stressShift:2,irregCommand:'съешь',irregPast:"съел"}),
	new PerfectiveVerb('поесть',{overrides:['поем','поешь','поест','поедим','поедите','поедят'],stress:2,stressShift:3,irregCommand:'поешь',irregPast:"поел"}),
	
]


let imperfectiveVerbs = [

	new ImperfectiveVerb("закрывать"),
	new ImperfectiveVerb("отправлять"),
	new ImperfectiveVerb("забывать"),
	new ImperfectiveVerb("изучать"),
	new ImperfectiveVerb("делать", {stress:1}),
	new ImperfectiveVerb("знать"),
	new ImperfectiveVerb("читать"),
	new ImperfectiveVerb("понимать"),
	new ImperfectiveVerb("работать", {stress:2}),
	new ImperfectiveVerb("решать"),
	new ImperfectiveVerb("показывать", {stress:2}),
	new ImperfectiveVerb("обедать", {stress:2}),
	new ImperfectiveVerb("кашлять", {stress:1}),
	new ImperfectiveVerb("помогать"),
	new ImperfectiveVerb("говорить"),
	new ImperfectiveVerb("готовить", {stress:2}),
	new ImperfectiveVerb("создавать",{stem:"созда",verbClass:3,irregCommand:'создавай'}),
	new ImperfectiveVerb('считать'),
	new ImperfectiveVerb('писать',{stress:1}),
	new ImperfectiveVerb('хотеть',{overrides:['хочу','хо́чешь','хо́чет'],stem:"хот"}),
	new ImperfectiveVerb('стоить',{stress:1}),
	new ImperfectiveVerb('любить',{stressShift:true}),
	new ImperfectiveVerb('думать',{stress:1}),
	new ImperfectiveVerb('смотреть',{stressShift:true}),
	new ImperfectiveVerb('слушать',{stress:1}),
	new ImperfectiveVerb('есть',{overrides:['ем','ешь','ест','едим','едите','едят'],stressShift:2,irregCommand:"ешь",irregPast:'ел'}),
	//TODO fix missing stress on this verb ^
	new ImperfectiveVerb('давать',{stem:"да",verbClass:3,irregCommand:'давай'}),
	new ImperfectiveVerb('звать',{stem:'зов',verbClass:4,stress:2}),
]

const russianVerbs = imperfectiveVerbs.concat(perfectiveVerbs).sort();

let newVerbs = [
]

















let verbPairs = [
	new VerbPair("отправлять",'отправить','send',['(д) эсэмэску','(д) деньги'],['(o) a message','(o) the money']),
	new VerbPair('забывать','забыть','forget',["слово"],["the word"]),
	new VerbPair('изучать','изучить','study',['ру́сский язы́к','кита́йский язы́к','математику','физику'],['Russian','Chinese','math','physics']),
	new VerbPair('делать','сделать','do',['уро́к'],['homework']),
	new VerbPair('знать',null,'know',['того́ челове́ка',', как гото́вить'], ['that person','how to cook'],{noGerund:true}),
	new VerbPair(null,'узнать','find out'),
	new VerbPair('читать','прочитать','read',['эсэмэ́ску','кни́гу'],['the message','a book']),
	new VerbPair('понимать','понять','understand',['','ру́сский язы́к'],['','Russian'],{noGerund:true}),
	new VerbPair('работать','поработать','work'),
	new VerbPair('решать','решить',['decide','solve'],[', что де́лать','пробле́му'],['what to do','the problem']),
	new VerbPair('показывать','показать','show',['(д) фотогра́фию'],['(o) the picture']),
	new VerbPair('обедать','пообедать','eat lunch',['','с дру́гом','с подру́гой'],['','with a friend ♂','with a friend ♀']),
	new VerbPair('кашлять','кашлянуть','cough'),
	new VerbPair('помогать','помочь','help',['(д)'],['(o)']),
	new VerbPair('говорить','сказать','speak',['по-ру́сски','по-английски'],['Russian','English'],{noGerund:true}),
	new VerbPair('готовить','приготовить','cook',['','крепы'],['','crepes']),
	new VerbPair('создавать','создать',['create','cause'],['сайт','проблемы'],['a website','problems']),
	new VerbPair('закрывать','закрыть','close',['глаза́','сайт'],['(rp) eyes','the website']),
	new VerbPair('считать', null, ['consider', 'think'], ['его идио́том',', что она́ врачи́ха'],['him an idiot',"that she's an doctor"],{noGerund:true}),
	new VerbPair('писать','написать','write',['письмо́','кни́га'],['a letter','a book']),
	new VerbPair('хотеть','захотеть','want',['написа́ть кни́га','посмотре́ть','помо́чь'],['to write a book','to see','to help'],{noGerund:true}),
	new VerbPair('стоить',null,'cost',['де́сять до́лларов'],['$10'],{noGerund:true}),
	new VerbPair('любить',null,'love',['(а)','гото́вить','есть'],['(o)','to cook','to eat'],{noGerund:true}),
	new VerbPair(null,'полюбить','fall in love'),
	new VerbPair('думать','подумать','think',[', чай готовый'],['the tea is ready'],{noGerund:true}),
	new VerbPair('смотреть','посмотреть','watch',['телеви́зор','фильм'],['the TV','a movie']),
	new VerbPair('слушать','послушать','listen',['ра́дио','му́зыку'],['to the radio','to music']),
	new VerbPair('есть','поесть','eat',['еда́','банан'],['some food','a banana']),
	new VerbPair('есть','съесть','eat',['ку́ча еды́'],['a lot of food']),
	new VerbPair('давать','дать','give',['(д) э́то','(д) пять до́лларов'],['(o) that','(o) five dollars']),
	new VerbPair('звать','позвать','call',['его Шура','её Мина','её Соня','её Настя','её Вика','его Тёма','его Женя','его Ваня'],['him Shura','her Mina','her Sonya','her Nastya','her Vika','him Tyoma','him Zhenya','him Vanya'],{noGerund:true}),
	
]




































let regularNouns = [

	new Noun('урок','assignment'),
	new Noun('язык','language',{stress:-1}),
	new Noun('класс','class'),
	new Noun('здание','building',{stress:1}),
	new Noun('школа','school',{stress:1}),
	new Noun('вопрос','question'),
	new Noun('идиот','idiot (♂)',{animate:true}),
	new Noun('лицо','face',{pluralStress:1}),
	new Noun('рука','hand',{stressChanges:{1:1,6:1}}),
	new Noun('дело','thing',{stress:1,pluralStress:-1}),
	new Noun('голова','head',{stressChanges:{1:1,6:1}}),
	new Noun('слово','word',{stress:1,pluralStress:-1}),
	new Noun('место','place',{stress:1,pluralStress:-1}),
	new Noun('мама','mom',{animate:true,stress:1}),
	new Noun('креп','crepe'),
	new Noun('писатель','author (♂)',{animate:true,stress:2}),
	new Noun('врач','doctor (♂)',{animate:true,stress:2}),
	new Noun('писательница','author (♀)',{stress:2,animate:true}),
	new Noun('врачиха','doctor (♀)',{stress:2,animate:true}),
	new Noun('подруга','friend (♀)',{stress:2,animate:true}),
	
	new Noun('девушка','girl',{animate:true,stress:1,genPl:"девушек"}),
	new Noun('идиотка','idiot (♀)',{animate:true,stress:3,genPl:"идиоток"}),
	new Noun('эсэмэска','text message',{stress:3,genPl:'эсэмэсок'}),
	
]


let singularNouns = [
	new DefectiveSingularNoun('еда',['food']),
	new Noun('математика',['math'],{stress:3}),
	new Noun('физика',['physics'],{stress:1}),
	new Noun('образование','education',{stress:4}),
	new Noun('человек',['person','people'], {animate:true}),
	new Noun('чай',['tea'],{pluralStress:-1}),
]

let pluralNouns = [
	new DefectivePluralNoun('деньга',['money'],{genPl:"денег",stress:1,stressChanges:{9:-1,10:-1}}),
	//new DefectivePluralNoun('людя',['people'],{stress:1,animate:true,paradigmChanges:{8:'людей',11:'людьми'},stressChanges:{8:2,11:2}}),
]



let irregularNouns = [
	new Noun('парнь','guy',{stress:1,animate:true,paradigmChanges:["парень"],stressChanges:{8:2,9:2,10:2}}),
	new Noun('друг','friend (♂)',{animate:true,pluralStem:"друзьй",pluralDeclension:0,pluralStress:-1,genPl:"друзей"}),
	new Noun('глаз','eye',{pluralDeclension:0,pluralStress:-1}),
	new Noun('днь','day',{paradigmChanges:['день']}),
	new Noun('дом','house',{paradigmChanges:{6:'дома'},pluralStress:-1}),
	new Noun('отц','father',{animate:true,paradigmChanges:['отец']}),
]

let newNouns = [
]


let nouns = regularNouns.concat(irregularNouns);
