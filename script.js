if(Function.prototype.bind == undefined) {
	document.getElementsByTagName("body")[1].innerHTML =
		"Your browser does not meet the minimum requirements to run this webpage. Try accessing this site on a web browser from 2016 or later."
}

const $ = document.getElementById.bind(document);
// bind is necessary to prevent "illegal invocation" error.


function sentenceCase(string) {
	return string[0].toUpperCase() + string.substr(1);
}





let currentExercise;
let testDeclensions = new Set([6]);
let allowIrregulars = false;

function wordlist(number) {
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

nounNumber = 0;

function nextNoun(){
	nounNumber++;
	updateTable();
}

function updateTable(){
	const noun = wordlist(2)[nounNumber];
	tableItems = noun.allDeclensions();
	/*
	//code to make the order of the table match openrussian.org
	for(i in tableItems){
		const column = tableItems[i];
		tableItems[i] = [column[0],column[2],column[3],column[1],column[5],column[4]];
	}//*/
	
	for (i=0; i<6; i++){
		document.getElementById("tbody").children[i+1].children[1].innerHTML = tableItems[0][i] ?? "-";
		document.getElementById("tbody").children[i+1].children[2].innerHTML = tableItems[1][i] ?? "-";
	}
	document.getElementById("tbody").children[7].children[1].innerHTML = noun.translation.num(0);
	document.getElementById("tbody").children[7].children[2].innerHTML = noun.translation.num(1);
}

updateTable();













// set up settings

for(let i=0; i<4; i++){
	
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

const irregButton = document.createElement("button");
irregButton.innerHTML = "Allow Irregular Nouns";
irregButton.style.position = "relative";
irregButton.style.top = "40px";
irregButton.onclick = function(){
	allowIrregulars = !allowIrregulars;
	this.classList.toggle("pressed");
}
settings.appendChild(irregButton);

settings.children[1].classList.toggle("pressed");
//settings.children[12].classList.toggle("pressed");



function click_settings_button() {
	if(settings.hidden){
		settings.hidden = false;
		settings_button.innerHTML = "Close Settings";
	} else if (testDeclensions.size > 0){
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


function submitExercise() {
	if (answer_box.value.toLowerCase() == currentExercise.russianWord) {
		$("correct").hidden = false;
		answer_box.replaceWith(currentExercise.russianWord);
		setTimeout(() => {
			$("correct").hidden = true;
			nextExercise();
		},1000);
	} else {
		$("incorrect").hidden = false;
		correct_answer = document.createElement("b");
		correct_answer.textContent = currentExercise.russianWord;
		answer_box.replaceWith(correct_answer);
		setTimeout(() => {
			$("incorrect").hidden = true;
			nextExercise();
		},3000);
		
	}
}



function nextExercise() {
	
	const exDeclension = [...testDeclensions][Math.floor(Math.random()*testDeclensions.size)];
	const number = Math.floor(exDeclension / 6);
	
	const exWordlist = wordlist(number);
	
	const templateList = nounExercises[exDeclension % 6];
	const template = templateList[Math.floor(Math.random() * templateList.length)];
	
	
	let c = Math.floor(Math.random() * exWordlist.length);
	let noun = exWordlist[c];
	
	currentExercise = new template(noun,number);
	
	prepareExercise(currentExercise);
	
}
