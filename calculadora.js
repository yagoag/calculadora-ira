num = 2;
sem = 2;

set_num_sem = function(n, s) {
	num = n;
	sem = s;
}

adicionar_disciplina = function(semestre) {
	var conteudo = $('<p><input id="disciplina-'+num+'" type="textbox" /></p>').hide();
	$("#semestre-"+semestre+" .disciplina").append(conteudo);
	conteudo.show('normal');

	conteudo = $('<p><input id="nota-'+num+'" type="textbox" /></p>').hide();
	$("#semestre-"+semestre+" .nota").append(conteudo);
	conteudo.show('normal');

	conteudo = $('<p><input id="creditos-'+num+'" type="textbox" /></p>').hide();
	$("#semestre-"+semestre+" .creditos").append(conteudo);
	conteudo.show('normal');

	conteudo = $('<p><input type="radio" name="situacao-'+num+'" value="cursados" checked /> C <input type="radio" name="situacao-'+num+'" value="suspensos" /> S <input type="radio" name="situacao-'+num+'" value="desistentes" /> D</p>').hide();
	$("#semestre-"+semestre+" .situacao").append(conteudo);
	conteudo.show('normal');

	num++;
}

adicionar_semestre = function() {
	var cor;
	if (sem % 2 === 1)
		cor = 'a';
	else
		cor = 'b';

	var conteudo = $('<div id="semestre-'+sem+'" class="semestre sem-'+cor+'"><div class="nome-semestre">20<input type="textbox" class="ano sem-'+cor+'" />/<input type="textbox" class="sem sem-'+cor+'" /></div><div class="disciplina '+cor+'"></div><div class="nota '+cor+'"></div><div class="creditos '+cor+'"></div><div class="situacao '+cor+'"></div><br class="clear" /><p class="alinhamento-direita"><input value="Adicionar Disciplina" class="botao-nova-disciplina" type="button" onclick="adicionar_disciplina('+sem+')" /></p></div>').hide();
	$("#calculadora").append(conteudo);
	conteudo.show('normal');

	adicionar_disciplina(sem);

	sem++;
}

calcula_ira = function() {
	// Determina o número de créditos inscritos (Ci)
	var ci = 0;
	var temp;
	for (var i = 1; i < num; i++) {
		temp = parseInt($("#creditos-"+i).val());
		if (isNaN(temp)) {
			alert("Um ou mais campos de créditos foram deixados em branco ou completados de forma imprópria.\nPor favor verifique o preenchimento dos campos e tente novamente.");
			break;
		}
		ci += temp;
	}

	// Determina o valor dos somatórios:
	// ncc: Nota * Cc (Créditos Cursados)
	// cs: Cs (Créditos Suspensos)
	// cd: Cd (Créditos Desistentes)
	if (!isNaN(temp)) {
		var ncc = 0;
		var cs = 0;
		var cd = 0;
		for (i = 1; i < num; i++)
			if ($("input[name=situacao-"+i+"]:checked").val() == "cursados") {
				temp = $("#nota-"+i).val();
				// Caso a pessoa utilize vírgula como separador de decimal, troca a mesma por ponto
				temp = temp.replace(",", ".");
				temp = parseFloat(temp);
				if (isNaN(temp)) {
					alert("Um ou mais campos de nota foram deixados em branco ou completados de forma imprópria.\nPor favor verifique o preenchimento dos campos e tente novamente.");
					break;
				}
				ncc += parseInt($("#creditos-"+i).val()) * temp;
			} else
				if ($("input[name=situacao-"+i+"]:checked").val() == "suspensos")
					cs += parseInt($("#creditos-"+i).val());
				else
					cd += parseInt($("#creditos-"+i).val());

		if (!isNaN(temp)) {
			// Determina o valor final do IRA
			var ira = (ncc / ci) * (2 - (2 * cd / ci + cs / ci)) * 1000;
			ira = Math.round(ira);

			// Mostra o IRA na input
			$("#ira").val(ira);
		}
	}
}