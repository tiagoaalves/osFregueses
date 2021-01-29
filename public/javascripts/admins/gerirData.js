function onLoad(){
    setChartPresentes();
    setChartInscritos();
    setChartAssistencia();
}

function setChartPresentes(){
    var chart = new CanvasJS.Chart(document.getElementById("chartContainer"), {
	animationEnabled: true,
	
	title:{
		text:"Eventos com mais presenças"
	},
	axisX:{
		interval: 1
	},
	axisY2:{
		interlacedColor: "rgba(1,77,101,.2)",
		gridColor: "rgba(1,77,101,.1)",
		title: "Número de presentes"
	},
	data: [{
		type: "bar",
		name: "eventos",
		axisYType: "secondary",
		color: "#014D65",
		dataPoints: [
		]
	}]
});
getEventosPresentes(chart.options.data[0].dataPoints, chart);
}

async function getEventosInscritos(dataPoints, chart){
	fetch(`/api/admins/eventos`).then(function(resp){
      return resp.json();
    }).then(function(data){
    	for(var i = 0; i<data.response.length; i++){
    		if (comparaDatas(data.response[i].data_evento) == true){
    			console.log(data.response[i].nome);
    			getInscritos(data.response[i].id_evento, data.response[i].nome, dataPoints);
    		}
    	}
    });
    console.log('chart.render');
    chart.render();
}

function getInscritos(evento, nome, dataPoints){
	var siga;
    fetch(`/api/admins/inscritos/inscritos/${evento}`).then(function(resp){
      return resp.json();
    }).then(function(data){
    	console.log(data.response.length);
    	dataPoints.push({y:data.response.length, label:`${nome}`});
    });
}

function setChartInscritos(){
    var chart = new CanvasJS.Chart(document.getElementById("chartContainerInscritos"), {
	animationEnabled: true,
	
	title:{
		text:"Eventos com mais inscritos"
	},
	axisX:{
		interval: 1
	},
	axisY2:{
		interlacedColor: "rgba(1,77,101,.2)",
		gridColor: "rgba(1,77,101,.1)",
		title: "Número de inscritos"
	},
	data: [{
		type: "bar",
		name: "eventos",
		axisYType: "secondary",
		color: "#014D65",
		dataPoints: [
		]
	}]
});
console.log('começa aqui');
getEventosInscritos(chart.options.data[0].dataPoints, chart);
}

function getEventosPresentes(dataPoints, chart){
	fetch(`/api/admins/eventos`).then(function(resp){
      return resp.json();
    }).then(function(data){
    	console.log({primeiraData: data});
    	for(var i = 0; i<data.response.length; i++){
    		if (comparaDatas(data.response[i].data_evento) == false){
    			getPresentes(data.response[i].id_evento, data.response[i].nome, dataPoints);
    		}
    	}
    });
    chart.render();
}

function getPresentes(evento, nome, dataPoints){
	var siga;
    fetch(`/api/admins/presencas/${evento}`).then(function(resp){
      return resp.json();
    }).then(function(data){
    	dataPoints.push({y:data.response.length, label:`${nome}`});
    });
}

function comparaDatas(time){
  var currentdate = new Date();
  var actual = new Date(time.substring(0,4), time.substring(5,7), time.substring(8,10));
  var gof = new Date(currentdate.getFullYear(),currentdate.getMonth(),currentdate.getDay());
  gof = new Date();
  if(actual.getTime() > gof.getTime()){
    return true;
  }else{
    return false;
  }
}

function setChartAssistencia(){
	 var chart = new CanvasJS.Chart(document.getElementById("chartContainerAssistencia"), {
	animationEnabled: true,
	
	title:{
		text:"Eventos com mais Assistencia"
	},
	axisX:{
		interval: 1
	},
	axisY2:{
		interlacedColor: "rgba(1,77,101,.2)",
		gridColor: "rgba(1,77,101,.1)",
		title: "Número de presentes"
	},
	data: [{
		type: "bar",
		name: "eventos",
		axisYType: "secondary",
		color: "#014D65",
		dataPoints: [
		]
	}]
});
getEventosAssistencia(chart.options.data[0].dataPoints, chart);
}

function getEventosAssistencia(dataPoints, chart){
	console.log('assistencia');
	fetch(`/api/admins/eventos`).then(function(resp){
      return resp.json();
    }).then(function(data){
    	console.log(data);
    	for(var i = 0; i<data.response.length; i++){
    		if (comparaDatas(data.response[i].data_evento) == false){
    			console.log('false');
    			dataPoints.push({y:parseInt(data.response[i].assistencia), label:`${data.response[i].nome}`});
    		}
    	}
    });
    chart.render();
}