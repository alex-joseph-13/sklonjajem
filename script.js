if(Function.prototype.bind == undefined) {
	document.getElementsByTagName("body")[1].innerHTML =
		"Your browser does not meet the minimum requirements to run this webpage. Try accessing this site on a web browser from 2016 or later."
}

const $ = document.getElementById.bind(document);
// bind is necessary to prevent "illegal invocation" error.


function sentenceCase(string) {
	return string[0].toUpperCase() + string.substr(1);
}




partOfSpeech = "noun";
let favoriteWords = irregularNouns;

function switch_pos() {
	$("pos_button").innerHTML = "switch to " + partOfSpeech + "s";
	if (partOfSpeech == "noun") {
		partOfSpeech = "verb";
		construct_table(8,7);
		favoriteWords = regularImperfectiveVerbs;
	} else {
		partOfSpeech = "noun";
		construct_table(8,3);
		favoriteWords = irregularNouns;
	}
	updateTable();
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
let testDeclensions = new Set([6]);
let allowIrregulars = false;

function nounlist(number) {
	let numberList;
	switch(number){
		case 0:
			numberList = singularNouns;
			break;
		case 1:
			numberList = pluralNouns;
			break;
		case 2:
			numberList = singularNouns.concat(pluralNouns);
			break;
	}
	if (allowIrregulars) {
		return regularNouns.concat(irregularNouns, numberList);
	} else {
		return regularNouns.concat(numberList);
	}
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

updateTable();













// set up settings
function makeSettings() {
	for(let i=0; i<6; i++){
		
		for(let n=0; n<2; n++){
			const caseButton = document.createElement("button");
			caseButton.innerHTML = nounCases[i] + [" singular"," plural"][n];
			caseButton.declension = n*6 + i;
			caseButton.onclick = function(){
				testDeclensions = testDeclensions.symmetricDifference(new Set([this.declension]));
				this.classList.toggle("pressed");
			}
			settings.appendChild(caseButton);
		}
		settings.appendChild(document.createElement("br"));
	}
}
makeSettings();

const irregButton = document.createElement("button");
irregButton.innerHTML = "Allow Irregular Nouns";
irregButton.style.marginTop = "20px";
irregButton.onclick = function(){
	allowIrregulars = !allowIrregulars;
	this.classList.toggle("pressed");
}
settings.appendChild(irregButton);

settings.children[1].classList.toggle("pressed");
settings.children[12].disabled = true;
settings.children[13].disabled = true;
//settings.children[12].classList.toggle("pressed");



function click_settings_button() {
	if(settings.hidden){
		quiz.hidden = true;
		settings.hidden = false;
		settings_button.innerHTML = "Close Settings";
	} else if (testDeclensions.size > 0){
		quiz.hidden = false;
		settings.hidden = true;
		settings_button.innerHTML = "Settings";
		nextExercise();
	} else {
		window.alert("You must select at least one case to practice.");
	}
}
























// exercises

function prepareExercise(exercise) {
	$("english_sentence").innerHTML = sentenceCase(
		exercise.englishSentence.replace("_",
		"<b>" + exercise.englishWord + "</b>"
	));
	$("russian_lemma").innerHTML = "<b>" + exercise.russianLemma + "</b>";
	
	
	const helpButton = document.createElement('button');
	helpButton.onclick = function(){
		helpText = document.createElement('p');
		helpText.id = "help";
		helpText.innerHTML = currentExercise.details;
		this.replaceWith(helpText);
	};
	helpButton.innerHTML = "?";
	helpButton.id = "help";
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
		
		const exWordlist = nounlist(number);
		
		const templateList = nounExercises[exDeclension % 6];
		const template = templateList[Math.floor(Math.random() * templateList.length)];
		
		
		let c = Math.floor(Math.random() * exWordlist.length);
		let noun = exWordlist[c];
		
		currentExercise = new template(noun,number);
	} else if (partOfSpeech == "verb") {
		const person = Math.floor(Math.random()*6);
		
		let c = Math.floor(Math.random() * verbPairsWithImperfect.length);
		let vPair = verbPairsWithImperfect[c];
		
		currentExercise = new presentVerbExercise(vPair, person);
	}
	
	prepareExercise(currentExercise);
	
}



switch_pos();