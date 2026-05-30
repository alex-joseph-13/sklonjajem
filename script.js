if(Function.prototype.bind == undefined) {
	document.getElementsByTagName("body")[1].innerHTML =
		"Your browser does not meet the minimum requirements to run this webpage. Try accessing this site on a web browser from 2016 or later."
}

const $ = document.getElementById.bind(document);
// bind is necessary to prevent "illegal invocation" error.


function sentenceCase(string) {
	return string[0].toUpperCase() + string.substr(1);
}




partOfSpeech = "";
let favoriteWords = irregularNouns.reverse();

posNumbers = {"noun":0,"verb":1,"adjective":2,"":0}

function switch_pos(newPos) {
	if(newPos == partOfSpeech) return;
	
	pos_buttons.children[posNumbers[partOfSpeech]].classList.add("secondary");
	partOfSpeech = newPos;
	pos_buttons.children[posNumbers[partOfSpeech]].classList.remove("secondary");
	
	if (newPos == "verb") {
		construct_table(8,7);
		favoriteWords = newVerbs;
		posNumber = 0;
	} else if (newPos == "noun") {
		construct_table(8,3);
		favoriteWords = newNouns;
		posNumber = 1;
	} else {
		construct_table(9,5);
		favoriteWords = newAdjectives;
		posNumber = 2;
	}
	exampleNumber = 0;
	updateTable();
	makeSettings();
	
	quiz.hidden = true;
	settings.hidden = false;
	settings_button.innerHTML = "Start Practicing";
}

function construct_table(rows, columns) {
	tbody.innerHTML = "";
	for(let i=0; i<rows; i++) {
		row = tbody.appendChild(document.createElement('tr'));
		for(let j=0; j<columns; j++){
			row.appendChild(document.createElement('th'));
		}
	}
}






let currentExercise;
let testDeclensions = new Set([0,1,2,3,4,5,6,7,8,9,10,11]);
let verbTemplates = new Set([presentVerbExercise,futurePerfectiveVerbExercise]);
let allowIrregulars = true;
let allowRegulars = true;
let showBothVerbs = false;

function nounlist(number,reg,irreg) {
	let ret = [];
	if(reg) {
		switch(number){
			case 0:
				ret = regularNouns.concat(singularNouns);
				break;
			case 1:
				ret = regularNouns.concat(pluralNouns);
				break;
			case 2:
				ret = regularNouns.concat(singularNouns,pluralNouns);
				break;
		}
	}
	if (irreg) {
		ret = ret.concat(irregularNouns);
	}
	return ret;
}











// dev tab (conjugation tables)

let exampleNumber = 0;

function nextWord(){
	exampleNumber++;
	updateTable();
}

function updateTable(){
	if (partOfSpeech == "noun"){
		updateNounTable();
	} else if (partOfSpeech == "verb"){
		updateVerbTable();
	} else if (partOfSpeech == "adjective"){
		updateAdjectiveTable();
	}
}

function updateNounTable(){
	const noun = favoriteWords[exampleNumber];
	let tableItems = [nounCases].concat(noun.allDeclensions());
	//*
	//code to make the order of the table match openrussian.org
	for(i in tableItems){
		const column = tableItems[i];
		tableItems[i] = [column[0],column[2],column[3],column[1],column[5],column[4]];
	}//*/
	
	for (i=0; i<6; i++){
		for (j=0; j<3; j++){
			document.getElementById("tbody").children[i+1].children[j].innerHTML = tableItems[j][i] ?? "-";
		}
	}
	document.getElementById("tbody").children[7].children[1].innerHTML = noun.translation.num(0);
	document.getElementById("tbody").children[7].children[2].innerHTML = noun.translation.num(1);
}

function updateVerbTable(){
	const verb = favoriteWords[exampleNumber];
	const tableItems = verb.allConjugations();
	for(let i in tableItems){
		for (let j in tableItems[i]){
			document.getElementById("tbody").children[i].children[j].innerHTML = tableItems[i][j];
		}
	}
}

function updateAdjectiveTable(){
	const adjective = favoriteWords[exampleNumber];
	let tableItems = adjective.allDeclensions();
	
	for(i in tableItems){
		const row  = tableItems[i];
		tableItems[i] = [row[0],row[2],row[3],row[1],row[4]];
	}
	tableItems = [tableItems[0],tableItems[1],tableItems[3],tableItems[4],tableItems[2],tableItems[6],tableItems[5],tableItems[7],tableItems[8]];
	
	for(let i in tableItems){
		for(let j in tableItems[i]){
			document.getElementById("tbody").children[i].children[j].innerHTML = tableItems[i][j];
		}
	}
	
	
}














// set up settings
function makeSettingsNoun() {
	
	for(let i=0; i<6; i++){
		
		for(let n=0; n<2; n++){
			const caseButton = document.createElement("button");
			caseButton.classList.toggle('settings-button');
			caseButton.innerHTML = nounCases[i] + [" singular"," plural"][n];
			caseButton.declension = n*6 + i;
			caseButton.onclick = function(){
				testDeclensions = testDeclensions.symmetricDifference(new Set([this.declension]));
				this.classList.toggle("secondary");
			}
			if (!testDeclensions.has(n*6+i)) {
				caseButton.classList.toggle("secondary");
			}
			settings.appendChild(caseButton);
		}
	}
	
	const regButton = document.createElement("button");
	regButton.classList.toggle('settings-button');
	regButton.innerHTML = "Regular Nouns";
	regButton.style.marginTop = "20px";
	regButton.onclick = function(){
		allowRegulars = !allowRegulars;
		this.classList.toggle("secondary");
	}
	if(!allowRegulars) regButton.classList.toggle("secondary");
	settings.appendChild(regButton);
	
	const irregButton = document.createElement("button");
	irregButton.classList.toggle('settings-button');
	irregButton.innerHTML = "Irregular Nouns";
	irregButton.style.marginTop = "20px";
	irregButton.onclick = function(){
		allowIrregulars = !allowIrregulars;
		this.classList.toggle("secondary");
	}
	if (!allowIrregulars) irregButton.classList.toggle("secondary");
	settings.appendChild(irregButton);
	
}

function makeVerbButton(NAME, EXERCISE) {
	let tButton = document.createElement("button");
	tButton.classList.toggle('settings-button');
	tButton.innerHTML = NAME;
	tButton.onclick = function(){
		verbTemplates = verbTemplates.symmetricDifference(new Set([EXERCISE]));
		this.classList.toggle("secondary");
	}
	if(!verbTemplates.has(EXERCISE)) tButton.classList.toggle("secondary");
	settings.appendChild(tButton);
}

function makeSettingsVerb() {
	
	makeVerbButton("Present", presentVerbExercise);
	settings.appendChild(document.createElement("div"));
	
	makeVerbButton("Future Imperfect", futureImperfectVerbExercise);
	makeVerbButton("Future Perfective", futurePerfectiveVerbExercise);
	
	makeVerbButton("Past Imperfect", pastImperfectVerbExercise);
	makeVerbButton("Past Perfective", pastPerfectiveVerbExercise);
	
	const tButton = document.createElement("button");
	tButton.classList.toggle('settings-button');
	tButton.style.marginTop = '20px';
	tButton.style.gridColumnStart = '1';
	tButton.style.gridColumnEnd = '3';
	tButton.innerHTML = "Test me on imperfect vs perfective";
	tButton.onclick = function() {
		showBothVerbs = !showBothVerbs;
		this.classList.toggle("secondary");
	}
	if (!showBothVerbs) tButton.classList.toggle("secondary");
	settings.appendChild(tButton);
	
	const regButton = document.createElement("button");
	regButton.classList.toggle('settings-button');
	regButton.innerHTML = "Regular Verbs";
	regButton.style.marginTop = "20px";
	regButton.onclick = function(){
		allowRegulars = !allowRegulars;
		this.classList.toggle("secondary");
	}
	if(!allowRegulars) regButton.classList.toggle("secondary");
	settings.appendChild(regButton);
	
	const irregButton = document.createElement("button");
	irregButton.classList.toggle('settings-button');
	irregButton.innerHTML = "Irregular Verbs";
	irregButton.style.marginTop = "20px";
	irregButton.onclick = function(){
		allowIrregulars = !allowIrregulars;
		this.classList.toggle("secondary");
	}
	if (!allowIrregulars) irregButton.classList.toggle("secondary");
	settings.appendChild(irregButton);
}

function makeSettingsAdjective() {
	const regButton = document.createElement("button");
	regButton.classList.toggle('settings-button');
	regButton.innerHTML = "No options for now!";
	regButton.style.marginTop = "20px";
	/*regButton.onclick = function(){
		allowRegulars = !allowRegulars;
		this.classList.toggle("secondary");
	}
	if(!allowRegulars) regButton.classList.toggle("secondary");*/
	settings.appendChild(regButton);
	
	/*const irregButton = document.createElement("button");
	irregButton.classList.toggle('settings-button');
	irregButton.innerHTML = "Irregular Adjectives";
	irregButton.style.marginTop = "20px";
	irregButton.onclick = function(){
		allowIrregulars = !allowIrregulars;
		this.classList.toggle("secondary");
	}
	if (!allowIrregulars) irregButton.classList.toggle("secondary");
	settings.appendChild(irregButton);*/
}

function makeSettings() {
	settings.innerHTML = "";
	if(partOfSpeech == "noun"){
		makeSettingsNoun();
	} else if (partOfSpeech == "verb"){
		makeSettingsVerb();
	} else if (partOfSpeech == "adjective"){
		makeSettingsAdjective();
	}
}






function click_settings_button() {
	if(settings.hidden){
		quiz.hidden = true;
		settings.hidden = false;
		settings_button.innerHTML = "Close Settings";
	} else if ( (allowIrregulars || allowRegulars) && ((partOfSpeech == "noun" && testDeclensions.size>0) ||
			  (partOfSpeech == "verb" && verbTemplates.size>0) || partOfSpeech == "adjective") ){
		quiz.hidden = false;
		settings.hidden = true;
		settings_button.innerHTML = "Settings";
		nextExercise();
	} else {
		window.alert("You must make at least one selection to practice.");
	}
}
























// exercises

function prepareExercise(exercise) {
	$("english_sentence").innerHTML = sentenceCase(
		exercise.englishSentence.replace("_",
		"<b>" + exercise.englishWord + "</b>"
	));
	if(partOfSpeech == "verb" && showBothVerbs){
		$("russian_lemma").innerHTML = "<b>" + exercise.vPair.toString() + "</b>";
	} else {
		$("russian_lemma").innerHTML = "<b>" + exercise.russianLemma.dictionaryForm() + "</b>";
	}
	
	
	const helpButton = document.createElement('button');
	helpButton.onclick = function(){
		helpText = document.createElement('p');
		helpText.id = "help";
		helpText.innerHTML = currentExercise.details;
		this.replaceWith(helpText);
	};
	helpButton.innerHTML = "?";
	helpButton.id = "help";
	helpButton.classList.toggle("outline");
	$("help").replaceWith(helpButton);
	
	$("russian_sentence").innerHTML = sentenceCase(exercise.russianSentence)
		.replace("_",'<input type="text" id="answer_box">');
	
	$("answer_box").addEventListener("keydown", function(event){
		if (event.key == "Enter") {
			submitExercise();
		}
	})
}

function match(s1,s2) {
	return s1.toLowerCase().replace(/['\u0301]/g,'') == s2.toLowerCase().replace(/['\u0301]/g,'');
}

function submitExercise() {
	if (match(answer_box.value, currentExercise.russianWord)) {
		$("correct").hidden = false;
		answer_box.replaceWith(currentExercise.russianWord);
		setTimeout(() => {
			$("correct").hidden = true;
			nextExercise();
		},1000);
	} else {
		$("incorrect").hidden = false;
		correct_answer = document.createElement("b");
		correct_answer.style.color = "red";
		correct_answer.textContent = currentExercise.russianWord;
		answer_box.replaceWith(correct_answer);
		setTimeout(() => {
			$("incorrect").hidden = true;
			nextExercise();
		},3000);
		
	}
}



function nextExercise() {
	
	if (partOfSpeech == "noun") {
		const exDeclension = [...testDeclensions][Math.floor(Math.random()*testDeclensions.size)];
		const number = Math.floor(exDeclension / 6);
		
		const exWordlist = nounlist(number,allowRegulars,allowIrregulars);
		
		const templateList = nounExercises[exDeclension % 6];
		const template = templateList[Math.floor(Math.random() * templateList.length)];
		
		
		const c = Math.floor(Math.random() * exWordlist.length);
		let noun = exWordlist[c];
		
		currentExercise = new template(noun,number);
	} else if (partOfSpeech == "verb") {
		const template = [...verbTemplates][Math.floor(Math.random()*verbTemplates.size)];
		const isPerfective = template.isPerfective;
		
		let vPair;
		while(true) {
			let c = Math.floor(Math.random() * verbPairs.length);
			vPair = verbPairs[c];
			if(!!vPair.getVerb(isPerfective) && ((allowRegulars && vPair.getVerb(isPerfective).regular) || (allowIrregulars && !vPair.getVerb(isPerfective).regular)) ){
				break;
			}
		}
		
		let person;
		if (vPair.properties.impersonal) {
			person = 2 + 3 * +(Math.random() > 0.7);
		} else {
			person = Math.floor(Math.random()*8);
		}
		
		currentExercise = new template(vPair, person);
	} else if (partOfSpeech == "adjective") {
		const number = +(Math.random() > 0.75);
		const nounCase = Math.floor(Math.random() *6);
		const noun = (L = nounlist(number,true,true))[Math.floor(Math.random()*L.length)];
		const c = Math.floor(Math.random() * adjectives.length);
		currentExercise = new AdjectiveExercise(adjectives[c],noun,nounCase,number);
	}
	
	prepareExercise(currentExercise);
	answer_box.select();
	
}


switch_pos("verb");
//dev_mode_button.onclick();
