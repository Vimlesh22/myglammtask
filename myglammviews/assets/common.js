window.onload = function(){
	// fetching all records
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var userRecords = JSON.parse(this.responseText);
			console.log(userRecords);
			document.getElementById("userRecordsTable").deleteRow(1);
			userRecords.user.forEach(function(record) {
				var table = document.getElementById("userRecordsTable");
				var row = table.insertRow(1);

				var name = row.insertCell(0);
				var mobile = row.insertCell(1);
				var email = row.insertCell(2);
				var action = row.insertCell(3);

				name.innerHTML = record.name;
				mobile.innerHTML = record.mobile;
				email.innerHTML = record.email;
				action.innerHTML = '<input class="btn btn-primary" type="button" onclick="editRecord(this)"; data-id="'+record._id+'" value="edit"><input class="btn btn-danger" type="button" onclick="deleteRecord(this)"; data-id="'+record._id+'" value="delete">';
			})
		}
	};
	xhttp.open("GET", "http://localhost:3000/api/getUser", true);
	xhttp.send();

	//	validating and submitting user recrds
	document.getElementById("submitForm").onclick = function() {
		var name = document.forms["recordForm"]["name"].value;
		var mobile = document.forms["recordForm"]["mobile"].value;
		var email = document.forms["recordForm"]["email"].value;
		var userId = document.forms["recordForm"]["userId"].value;
		var regexMobile = /^[789]([0-9]{9})$/;
		var regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		var formValid = true;
		if (name == "") {
			alert("Enter valid Name");
			formValid = false;
			return false;
		}
		if (mobile == "") {
			alert("Enter valid Mobile Number");
			formValid = false;
			return false;
		}
		if(!regexMobile.test(mobile)) {
			alert("Enter valid Mobile Number");
			formValid = false;
			return false;	
		}
		if (email == "") {
			alert("Enter valid Email");
			formValid = false;
			return false;
		}
		if(!regexEmail.test(email)) {
			alert("Enter valid Email");
			formValid = false;
			return false;
		}

		if(formValid == true && userId == '') {
			//	request post api
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					document.getElementById("successMsg").innerHTML = "record successfully added";
					setTimeout(function(){ 	window.location.reload(); }, 1000);
				}
				if(this.status == 400) {
					document.getElementById("errorMsg").innerHTML = this.responseText.message;
				}
			};
			xhttp.open("POST", "http://localhost:3000/api/addUser", true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	  		xhttp.send("name="+name+"&mobile="+mobile+"&email="+email);
		} else if(formValid == true && userId != '') {
			//	request put api
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				console.log(this.status);
				if (this.readyState == 4 && this.status == 200) {
					document.getElementById("successMsg").innerHTML = "record successfully updated";
					setTimeout(function(){ 	window.location.reload(); }, 2000);
				}
				if(this.status == 400) {
					document.getElementById("errorMsg").innerHTML = this.responseText.message;
				}
			};
			xhttp.open("PUT", "http://localhost:3000/api/updateUser/"+userId, true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	  		xhttp.send("name="+name+"&mobile="+mobile+"&email="+email);
		}
	}
}


//	delete user record function
function deleteRecord(ele) {
	var id = ele.getAttribute('data-id');
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			window.location.reload();
		}
	};
	xhttp.open("DELETE", "http://localhost:3000/api/deleteUser/"+id, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send();
}

//	edit user record function
function editRecord(ele) {
	var id = ele.getAttribute('data-id');
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("addRecordBtn").click();
			var userRecords = JSON.parse(this.responseText);
			console.log(userRecords);
			document.getElementById("name").value = userRecords.user.name;
			document.getElementById("mobile").value = userRecords.user.mobile;
			document.getElementById("email").value = userRecords.user.email;
			document.getElementById("userId").value = userRecords.user._id;
		}
	};
	xhttp.open("GET", "http://localhost:3000/api/getUser/"+id, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send();
}