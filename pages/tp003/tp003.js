/*JS*/
var latitud;
var longitud;

var x=document.getElementById("demo");
var maRequete;
var response;
var codepostal;
var adresse;
var departement;
var codeP;

function activeLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation);
  } else {
    x.innerHTML = "Le navigateur ne supporte pas la géolocalisation.";
  }
}

function showLocation(position) {
  latitud=position.coords.latitude;
  longitud=position.coords.longitude;
  x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
  ajaxOpenSM();
}
function ajaxOpenSM(){
	maRequete= new XMLHttpRequest();
	maRequete.open('GET','https://nominatim.openstreetmap.org/reverse?format=json&lat='+latitud+'&lon='+longitud, true);
	maRequete.onreadystatechange = callB;
	maRequete.send();
}
function callB(){
	if (maRequete.readyState === XMLHttpRequest.DONE) {
		 if (maRequete.status === 200) {
			console.log(maRequete.responseText);
		 } else {
			alert(maRequete.status);
		 }
		}
	codeP=getCP(maRequete.responseText);
	colorDPT(codeP);

}
function getCP (response){
	codepostal=JSON.parse(response);
	adresse=codepostal.address.postcode;
	departement=adresse[0]+adresse[1]
	return departement;
}
function colorDPT (dpt){
	document.querySelector("#map path[data-num='"+dpt+"']").style.fill="red";
}