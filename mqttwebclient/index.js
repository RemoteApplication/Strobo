client = new Paho.MQTT.Client("mqtt.sj.ifsc.edu.br", Number("443"), "clientId");

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({ onSuccess: onConnect, useSSL: true });

function onConnect() {
  console.log("onConnect");
  client.subscribe("arduino/remote_app");
  
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}


function onMessageArrived(message) {
  
  console.log("onMessageArrived:" + message.payloadString);
  let node = document.createElement("LI");
  let textnode = document.createTextNode("Tópico: " + message.destinationName + ", mensagem " + message.payloadString);
  node.appendChild(textnode);
  if (message.payloadString == "1") {
	document.getElementById("exibirstatus").src = "aberto.jpg";
  } else if (message.payloadString == "3") {

	document.getElementById("exibirstatus").src = "fechado.jpg";
  } else if (message.payloadString == "2") {
	 document.getElementById("exibirstatus").src = "abrindofechando.jpg";
}

}

function sendMessage(valor) {
  topic = "arduino/remote_app";
  //client.subscribe(topic);
  message = new Paho.MQTT.Message(valor);
  message.destinationName = topic;
  client.send(message);
}