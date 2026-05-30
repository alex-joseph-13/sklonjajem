
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
	new EnglishVerb('hear',{past:"heard"}),
	new EnglishVerb('live'),
	new EnglishVerb('walk'),
	new EnglishVerb('go',{past:'went'}),
	new EnglishVerb('drive',{past:'drove',participle:'driven'}),
	new EnglishVerb('wear',{past:'worn',participle:'worn'}),
	new EnglishVerb('carry'),
	new EnglishVerb('fly',{past:'flew',participle:'flown'}),
	new EnglishVerb('sleep',{past:'slept'}),
	new EnglishVerb('grab'),
	new EnglishVerb('catch',{past:'caught'}),
	new EnglishVerb('happen'),
	new EnglishVerb('become',{past:'became',participle:'become'}),
	new EnglishVerb('have',{past:'had',singular:'has'}),
	new EnglishVerb('manage'),
	new EnglishVerb('see',{past:'saw',participle:'seen'}),
	new EnglishVerb('fear'),
	new EnglishVerb('whisper'),
	new EnglishVerb('spy'),
]

englishVerbs.sort();


let russianVerbs = [
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
	new ImperfectVerb("закрывать"),
	new ImperfectVerb("отправлять"),
	new ImperfectVerb("забывать"),
	new ImperfectVerb("изучать"),
	new ImperfectVerb("делать", {stress:1}),
	new ImperfectVerb("знать"),
	new ImperfectVerb("читать"),
	new ImperfectVerb("понимать"),
	new ImperfectVerb("работать", {stress:2}),
	new ImperfectVerb("решать"),
	new ImperfectVerb("показывать", {stress:2}),
	new ImperfectVerb("обедать", {stress:2}),
	new ImperfectVerb("кашлять", {stress:1}),
	new ImperfectVerb("помогать"),
	new ImperfectVerb("говорить"),
	new ImperfectVerb("готовить", {stress:2}),
	new ImperfectVerb("создавать",{stem:"созда",verbClass:3,irregCommand:'создавай'}),
	new ImperfectVerb('считать'),
	new ImperfectVerb('писать',{stress:1}),
	new ImperfectVerb('хотеть',{overrides:['хочу','хо́чешь','хо́чет'],stem:"хот"}),
	new ImperfectVerb('стоить',{stress:1}),
	new ImperfectVerb('любить',{stressShift:true}),
	new ImperfectVerb('думать',{stress:1}),
	new ImperfectVerb('смотреть',{stressShift:true}),
	new ImperfectVerb('слушать',{stress:1}),
	new ImperfectVerb('есть',{overrides:['ем','ешь','ест','едим','едите','едят'],stressShift:2,irregCommand:"ешь",irregPast:'ел'}),
	new ImperfectVerb('давать',{stem:"да",verbClass:3,irregCommand:'давай'}),
	new ImperfectVerb('звать',{stem:'зов',verbClass:4,stress:2}),
	new ImperfectVerb('слышать',{stem:'слыш',verbClass:2,stress:1}),
	new PerfectiveVerb('услышать',{stem:'услыш',verbClass:2,stress:2}),
	new ImperfectVerb('жить',{stem:'жив',verbClass:4,stress:2,pastStress:1,pastShift:true}),
	new PerfectiveVerb('пожить',{stem:'пожив',verbClass:4,stress:3,pastStress:2,pastShift:true}),
	new ImperfectVerb('ходить',{stressShift:true}),
	new ImperfectVerb('идти',{stem:'ид',verbClass:4,irregPast:'шл'}),
	new PerfectiveVerb('пойти',{stem:'пойд',verbClass:4,irregPast:'пошл'}),
	new ImperfectVerb('ездить',{stress:1}),
	new ImperfectVerb('ехать',{stress:1,stem:'ед',irregCommand:'езжай',commandStress:2}),
	new ImperfectVerb('водить',{stressShift:true}),
	new ImperfectVerb('вести',{stem:'вед',verbClass:4,irregPast:'вёл'}),
	new PerfectiveVerb('повести',{stem:'повед',verbClass:4,irregPast:'повёл'}),
	new ImperfectVerb('носить',{stressShift:true}),
	new ImperfectVerb('нести',{stem:'нес',verbClass:4,irregPast:'нёс'}),
	new PerfectiveVerb('понести',{stem:'понес',verbClass:4,irregPast:'понёс'}),
	new ImperfectVerb('летать'),
	new ImperfectVerb('лететь'),
	new PerfectiveVerb('полететь'),
	new ImperfectVerb('спать',{verbClass:1,pastShift:true}),
	new PerfectiveVerb('поспать',{verbClass:1,pastShift:true}),
	new ImperfectVerb('хватать'),
	new PerfectiveVerb('схватить',{stressShift:true}),
	new ImperfectVerb('уметь',{stem:'уме',verbClass:3}),
	new PerfectiveVerb('суметь',{stem:'суме',verbClass:3}),
	new PerfectiveVerb('стать',{stem:'стан'}),
	new ImperfectVerb('завтракать',{stress:1}),
	new PerfectiveVerb('позавтракать',{stress:2}),
	new ImperfectVerb('ужинать',{stress:1}),
	new PerfectiveVerb('поужинать',{stress:2}),
	new ImperfectVerb('случаться'),
	new PerfectiveVerb('случиться'),
	new ImperfectVerb('приходиться',{stressShift:true}),
	new PerfectiveVerb('прийтись',{stem:'прид',verbClass:4,irregPast:'пришл'}),
	new PerfectiveVerb('родить',{pastShift:true}),
	new PerfectiveVerb('родиться',{pastShift:true}),
	new PerfectiveVerb('съездить',{stress:1}),
	new PerfectiveVerb('поехать',{stress:2,stem:'поед',irregCommand:'поезжай',commandStress:3}),
	new ImperfectVerb('видеть',{stress:1}),
	new PerfectiveVerb('увидеть',{stress:2}),
	new ImperfectVerb('находить',{stressShift:true}),
	new PerfectiveVerb('найти',{stem:'найд',verbClass:4,irregPast:'нашл'}),
	new ImperfectVerb('бояться',{stem:'бо',verbClass:1,commandStress:1}),
	new PerfectiveVerb('побояться',{stem:'побо',verbClass:1,commandStress:2}),
	new ImperfectVerb('шептать',{stem:'шепч',stressShift:true}),
	new PerfectiveVerb('прошептать',{stem:'прошепч',stressShift:true}),
]

russianVerbs = russianVerbs.sort();

const newVerbs = [
	...russianVerbs
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
	
	new VerbPair('слышать','услышать','hear',['звук','шум'],['a sound','a noise'],{noGerund:true}),
	new VerbPair('жить',null,'live',['в России','в США','в Японии','в Италии','в Индии','в Мэриленде'],['in Russia', 'in the USA', 'in Japan','in Italy','in India','in Maryland'],{noGerund:true}),
	new VerbPair('ходить','пойти','walk',['в библиоте́ку и наза́д','на у́лице'],['to the library and back','on the street']),
	new VerbPair('идти','пойти','walk',['в кабине́т','в библиоте́ку'],['to the office','to the library']),
	new VerbPair('ездить','съездить','go',['в о́тпуск в Италию'],['on vacation to Italy']),
	new VerbPair('ехать','поехать','go',['в школу'],['to school']),
	new VerbPair('водить','повести','drive',['маши́ну','в го́роде'],['a car','in the city']),
	new VerbPair('вести','повести','drive',['в шко́лу','(а) в шко́лу'],['to school','(o) to school']),
	new VerbPair('носить','понести','wear',['очки́','ку́ртку','кра́сная футбо́лка'],['glasses','a jacket','a red t-shirt']),
	new VerbPair('нести','понести','carry',['чемода́н','рюкза́к'],['a briefcase','a backpack']),
	new VerbPair('летать',null,'fly',['по Европе'],['around Europe']),
	new VerbPair('лететь','полететь','fly',['в Италии','в Калифорнии','домой'],['to Italy','to California','home']),
	new VerbPair('спать','поспать','sleep'),
	new VerbPair('хватать','схватить',['grab','catch'],['ма́ленкии лиси́ци','грипп'],['the little foxes','a cold']),
	new VerbPair('случаться','случиться','happen',['','со (п)'],['','to (o)'],{impersonal:true}),
	new VerbPair(null,'стать','become',['бананом'],['a banana']),
	new VerbPair('приходиться','прийтись','have to',['изуча́ть Стати́стика','обе́дать'],['study Statistics','eat lunch']),
	new VerbPair('уметь',null,'know how',['води́ть','гото́вить лапшу́'],['to drive','to make noodles'],{noGerund:true}),
	new VerbPair(null,'суметь','manage',['пригото́вить лапшу','поспать'],['to make some noodles','to sleep']),
	new VerbPair('завтракать','позавтракать','eat breakfast'),
	new VerbPair('ужинать','поужинать','have dinner'),
	new VerbPair(null,'родить','give birth',['своего́ пе́рвого ребёнка'],['to (rp) first child']),
	new VerbPair('видеть','увидеть',['see','spy'],['кого́-то',', со свои́м глазко́м, что-то красно'],['someone',' with (rp) little eye, something red'],{noGerund:true}),
	new VerbPair('находить','найти','find',['волос во своей еде́','хорошую кни́гу','бродя́чий кот'],['a hair in (rp) food','a good book','a stray cat']),
	new VerbPair('бояться','побояться','fear',['орлов','смреть','тьму','(а)'],['eagles','death','the dark','(o)'],{noGerund:true}),
	new VerbPair('шептать','прошептать','whisper',['','(д)'],['','to (o)']),
	
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
	new Noun('девушка','girl',{animate:true,stress:1}),
	new Noun('идиотка','idiot (♀)',{animate:true,stress:3}),
	new Noun('эсэмэска','text message',{stress:3}),
	new Noun('лисица','fox',{animate:true,stress:2}),
	new Noun('поле','field',{stress:1,pluralStress:2}),
	new Noun('библиотека','library',{stress:4}),
	new Noun('кабинет','office'),
	new Noun('ряд',['series','-'],{pluralStress:2}),
	new Noun('женщина',['woman','women'],{stress:1,animate:true}),
	new Noun('мужчина',['man','men'],{stress:2,animate:true,fakeFemenine:true}),
	new Noun('спина','back',{pluralStress:1,stressChanges:{1:1}}),
	new Noun('живот','stomach',{stress:3}),
	new Noun('кузен','cousin (♂)',{animate:true}),
	new Noun('кузина','cousin (♀)',{stress:2,animate:true}),
	new Noun('тётя','aunt',{stress:1,animate:true}),
	new Noun('дочка','daughter',{stress:1,animate:true}),
	new Noun('бабушка','grandmother',{stress:1,animate:true}),
	new Noun('дед','grandfather',{animate:true}),
	new Noun('внук','grandson',{animate:true}),
	new Noun('внучка','granddaughter',{stress:1,animate:true}),
	new Noun('родитель','parent',{stress:2,animate:true}),
	new Noun('семья','family',{pluralStress:1,stressChanges:{8:2}}),
	new Noun('племянник','nephew',{stress:2,animate:true}),
	new Noun('племянница','niece',{stress:2,animate:true}),
	new Noun('дядя','uncle',{stress:1,animate:true,fakeFemenine:true}),
	new Noun("игра",'game',{pluralStress:1}),
	new Noun('час','hour',{pluralStress:2}),
	new Noun('утро','morning',{stress:1}),
	new Noun('ночь','night',{declension:3,pluralStress:2,stressChanges:{6:1}}),
]


let singularNouns = [
	new DefectiveSingularNoun('еда',['food']),
	new Noun('математика',['math'],{stress:3}),
	new Noun('физика',['physics'],{stress:1}),
	new Noun('образование','education',{stress:4}),
	new Noun('чай',['tea'],{pluralStress:-1,genPl:"чаёв"}),
	new Noun('работа',['work'],{stress:2}),
	new Noun('завтрак',['breakfast'],{stress:1}),
	new Noun('обед',['lunch']),
	new Noun('ужин',['dinner'],{stress:1}),
	new Noun('боль',['pain'],{declension:3}),
	new Noun('лапша',['noodles'],{genPl:'лапшей'}),
	new Noun('кожа',['skin'],{stress:1}),
	new Noun('волос',['hair'],{stress:1,pluralStress:3,stressChanges:{6:1},genPl:'волос'}),
	
]

let pluralNouns = [
	new DefectivePluralNoun('деньга',['money'],{stress:1,stressChanges:{9:-1,10:-1}}),
	
]



let irregularNouns = [
	new Noun('парнь','guy',{stress:1,animate:true,stressChanges:{8:2,9:2,10:2}}),
	new Noun('друг','friend (♂)',{animate:true,pluralStem:"друзьй",pluralDeclension:0,pluralStress:-1}),
	new Noun('глаз','eye',{pluralDeclension:0,pluralStress:-1}),
	new Noun('днь','day'),
	new Noun('дом','house',{paradigmChanges:{6:'дома'},pluralStress:-1}),
	new Noun('отц','father',{animate:true,stress:2}),
	new Noun('орл','eagle',{animate:true,stress:2}),
	new Noun('дерево','tree',{stress:1,pluralStem:'деревьй',genPl:'деревьев',pluralStress:2}),
	new Noun('цвет','color',{paradigmChanges:{6:'цвета'},pluralStress:2}),
	new Noun('брат','brother',{animate:true,pluralStem:'братьй',paradigmChanges:{6:'братья',8:'братьев'}}),
	new Noun('сёстра','sister',{animate:true,pluralStress:1,stressChanges:{8:2}}),
	new Noun('сын','son',{animate:true,pluralStem:'сыновьй',pluralDeclension:0,pluralStress:3}),
	new Noun('ребёнк',['child','children'],{stress:2,paradigmChanges:{11:'детьми'},pluralStem:'деть',pluralStress:1,stressChanges:{8:2,11:2},animate:true}),
	new Noun('человек',['person','people'],{animate:true,pluralStem:'людь',pluralStress:1,paradigmChanges:{11:'людьми'},stressChanges:{8:2,11:2}}),
	new Noun('вечер','evening',{stress:1,pluralStress:3,paradigmChanges:{6:'вечера'}}),
	new Noun('время','time',{stress:1,declension:4,pluralStress:3}),
	new Noun('яйцо','egg',{pluralStress:1,stressChanges:{8:2},genPl:'яиц'}),
]

let newNouns = [
	...irregularNouns
]


let nouns = regularNouns.concat(irregularNouns);






































let adjectives = [
	new Adjective('новый','new'),
	new Adjective('старый','old'),
	new Adjective('большой','big',{noComparative:true,irregShortForm:"велик",shortFormStress:3}),
	new Adjective('маленький','small',{stress:1,irregShortForm:"мал",shortFormStress:2,noComparative:true}),
	new Adjective('хороший','good',{shortFormStress:3,irregComparative:"лучше",irregSuperlative:"лучший"}),
	new Adjective('плохой','bad',{irregComparative:"хуже",irregSuperlative:"худший"}),
	new Adjective('первый','first',{noShortForm:true,noComparative:true}),
	new Adjective('второй','second',{noShortForm:true,noComparative:true}),
	new Adjective('последний','last',{noShortForm:true,noComparative:true}),
	new Adjective('похожий','similar',{noComparative:true}),
	new Adjective('простой','easy'),
	new Adjective('настоящий','true',{noShortForm:true,noComparative:true}),
	new Adjective('длинный','long'),
	new Adjective('страшный','scary'),
	new Adjective('готовый','finished',{noComparative:true}),
	new Adjective('высокий','tall',{shortFormStress:3,irregComparative:'выше',irregSuperlative:'высший'}),
	new Adjective('скорый','quick'),
	new Adjective('яркий','bright'),
	new Adjective('прямой','straight'),
	new Adjective('красный','red'),
	new Adjective('оранжевый','orange',{stress:2,noComparative:true}),
	new Adjective('жёлтый','yellow'),
	new Adjective('зелёный','green',{shortFormStress:[1,1,3,1]}),
	new Adjective('голубой','cyan',{noShortForm:true}),
	new Adjective('синий','blue'),
	new Adjective('фиолетовый','purple',{stress:3,noShortForm:true,noComparative:true}),
	new Adjective('чёрный','black',{shortFormStress:[2,1,2,2]}),
	new Adjective('белый','white'),
	new Adjective('коричневый','brown',{stress:2,shortFormStress:2,noComparative:true}),
	new Adjective('серый','gray',{noComparative:true}),
	new Adjective('розовый','pink',{stress:1,shortFormStress:1}),
	new Adjective('светлый','light',{shortFormStress:[2,1,2,2],noComparative:true}),
	new Adjective('тёмный','dark',{shortFormStress:[2,1,2,2]}),
	new Adjective('нужный','necessary',{noComparative:true,shortFormStress:[1,1,2,2]}),
	new Adjective('русский','Russian',{noShortForm:true,noComparative:true}),
	new Adjective('американский','American',{noShortForm:true,noComparative:true}),
	new Adjective('английский','English',{noShortForm:true,noComparative:true}),

]

let newAdjectives = [...adjectives
]