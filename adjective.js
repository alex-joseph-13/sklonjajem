adjectiveEndings = [
	['ое','ый','ая','ые'],
	['ое','-¿','ую','-¿'],
	['ого','ого','ой','ых'],
	['ому','ому','ой','ым'],
	['ом','ом','ой','ых'],
	['ым','ым','ой','ыми']
];

shortFormEndings = ['о','','а','ы'];



class Adjective {
	translation;
	stem;
	oj;
	stress;
	noComparative;
	
	// params:
	//  stress (default is last syllable for oj adjectives and penultimate syllable for ij adjectives)
	//  noComparative
	//  irregComparative
	//  irregSuperlative
	//  comparativeStress
	//  noShortForm
	//  irregShortForm
	//  shortFormStress
	constructor(dicForm, translation, params) {
		this.translation = translation;
		params = params ?? {};
		
		this.stem = dicForm.slice(0,-2);
		if (dicForm[dicForm.length-2] == 'и' && !'гкхшщжч'.includes(dicForm[dicForm.length-3])){
			this.stem = this.stem + 'ь';
		}
		this.oj = dicForm[dicForm.length-2] == 'о';
		
		if(!!params.stress) {
			this.stress = params.stress;
		} else {
			const numVowels = countVowels(dicForm);
			this.stress = this.oj ? numVowels : (numVowels-1);
		}
		this.noComparative = !!params.noComparative;
		this.noShortForm = !!params.noShortForm;
		
		this.irregComparative = params.irregComparative;
		this.irregSuperlative = params.irregSuperlative;
		this.irregShortForm = params.irregShortForm;
		this.comparativeStress = params.comparativeStress;
		this.shortFormStress = params.shortFormStress;
		
	}
	
	toString() {
		return this.decline(0,1).replace('\u0301','');
	}
	
	dictionaryForm() {
		return this.decline(0,1);
	}
	
	decline(nounCase, gender, animate) {
		let output;
		
		if (nounCase==0 && gender==1 && this.oj){
			output = this.stem + 'ой';
		} else if (nounCase==1 && gender%2==1) {
			return animate ? this.decline(2,gender) : this.decline(0,gender);
		} else {
			output = this.stem + adjectiveEndings[nounCase][gender];
		}
		
		output = phonotactics(output);
		return stressify(output, this.stress);
	}
	
	shortForm(gender) {
		if(this.noShortForm) return "-";
		const stem = this.irregShortForm ?? this.stem;
		
		let output = stem + shortFormEndings[gender];
		output = phonotactics(output);
		if (gender == 1){
			//masculine forms sometimes need an epenthetic е
			// ст is an allowed consonant cluster
			output = epenthesize(output);
		}
		
		let stress;
		if(this.shortFormStress instanceof Array) {
			stress = this.shortFormStress[gender];
		} else {
			stress = this.shortFormStress ?? countVowels(stem);
			stress = (gender==2 && countVowels(this.stem)==1) ? stress+1 : stress;
		}
		return stressify(output,stress);
	}
	
	comparative() {
		if(this.noComparative) return "-";
		let output;
		if(this.irregComparative){
			output = this.irregComparative;
		} else {
			output = this.stem + 'ее';
			
			output = output.replace('кее','че');
			output = output.replace('гее','же');
			output = output.replace('хее','ше');
			output = output.replace('стее','ще');
			output = phonotactics(output);
		}
		const stress = this.comparativeStress ?? countVowels(output) - 1;
		return stressify(output,stress);
	}
	
	superlative() {
		if(this.noComparative) return null;
		if(this.irregSuperlative) return new Adjective(this.irregSuperlative);
		
		let superlativeStem = this.stem + 'ейш';
		superlativeStem = superlativeStem.replace('кейш','чайш');
		superlativeStem = superlativeStem.replace('гейш','жайш');
		superlativeStem = superlativeStem.replace('хейш','шайш');
		
		return new Adjective(superlativeStem + 'ий',"",{noComparative:true,noShortForm:true});
		
	}
	
	allDeclensions() {
		let ret = [["","n.","m.","f.","pl."]];
		for (let i=0; i<nounCases.length; i++) {
			ret.push([nounCases[i]]);
			for(let j=0; j<4; j++){
				ret[i+1].push(this.decline(i,j));
			}
		}
		ret.push(["short"]);
		for (let j=0; j<4; j++){
			ret[7].push(this.shortForm(j));
		}
		ret.push(["comp/sup","","",this.comparative(),this.superlative()])
		return ret;
		
	}
	
	
}