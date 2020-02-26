if(window.sessionStorage.accessToken!=='undefined'){
var button=document.getElementById('book-room');


button.onclick = function() {
var patient = document.getElementById('patient-down');
var patient_id = patient.options[patient.selectedIndex].value;
console.log(patient_id);
var room=document.getElementById('room-type');
	var roomType=room.options[room.selectedIndex].text;
	console.log(roomType);

	var date=document.getElementById('room-date').value;
	console.log(date);


	var time=document.getElementById('room-time').value;
	console.log(time)
	
	var roomRetreivalURL="http://localhost:8080/rooms?availibility=Yes&roomType="+roomType;
	var reqForRoom=new XMLHttpRequest();
	reqForRoom.open("GET",roomRetreivalURL,true);
	reqForRoom.setRequestHeader('Authorization','Bearer '+window.sessionStorage.accessToken);
	reqForRoom.send(null);
	
	reqForRoom.onreadystatechange = processRequest;
 
	function processRequest(e) {
 		if (reqForRoom.readyState == 4) {
        // time to partay!!!
        var data=JSON.parse(reqForRoom.response);
        console.log(data);
        var firstRoom=data[0];
        console.log(firstRoom);
        var roomMenu=firstRoom.roomMenu;
        var roomId=roomMenu.roomId;
        var bedId=roomMenu.bedId;
        console.log("roomId " +roomId)
        console.log(bedId);
        	
        	var finUrl='http://localhost:8080/rooms/update';
        	
        	var jsonData={};
        	jsonData["roomId"]=roomId;
        	jsonData["bedId"]=bedId;
        	jsonData["roomType"]=roomType;
        	jsonData["patientId"]=patient_id;
        	jsonData["availability"]="No";
        	console.log(jsonData);
        	var xhr = new XMLHttpRequest();
			xhr.open("PUT",finUrl,true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader('Authorization','Bearer '+window.sessionStorage.accessToken);
			xhr.send(JSON.stringify(jsonData));
			
			xhr.onreadystatechange = processRequest2;
			function processRequest2(e) {
				if (xhr.readyState == 4) {
					console.log("Appointment Made");
					alert("Room "+roomId+" is booked for selected patient" );
				}
			}
			

		
    	}
	}

}
}
