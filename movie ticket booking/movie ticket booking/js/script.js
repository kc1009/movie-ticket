// https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_html_toggleclass

$(document).ready(function(){
	var selected = 0;
	var setSelectedSeats = [];
	var curentlySelected = [];
	var getSelectedSeats = JSON.parse(localStorage.getItem("boockedTickets"));
	
	
	var ticketType;
	function getTicketType() {
		ticketType = $("select#ticketType").val();
    }
	
    $("select#ticketType").change(getTicketType);
	
	/*Fetching data from localStorage and changing class if the id is already present in the
		localStorage ie: boockedTickets
	*/
	for(let i in getSelectedSeats){
		setSelectedSeats.push(getSelectedSeats[i]);
		$("#"+getSelectedSeats[i]).removeClass("select-seats");
		$("#"+getSelectedSeats[i]).addClass("seat-unavailable");
		//console.log(getSelectedSeats[i]);
	}
	
	
	$(".select-seats").click(function(){
		var ticketQuantity = parseInt($("#ticketQuantity").val());
		
		if(ticketQuantity>0){
			if(curentlySelected.length>=ticketQuantity){
				//alert("You can only select "+ticketQuantity+ " Tickets");
				
				/*Here while clicking second time on the seats the selected seats will be removed and 
					the new selected items wil be stored in the  "setSelectedSeats" Array
				*/

				setSelectedSeats.pop();
				for(let id in curentlySelected){
					//console.log(curentlySelected[id]);
					setSelectedSeats.pop();
					$("#"+curentlySelected[id]).removeClass("select");
				}
				
				curentlySelected = [];
				setSelectedSeats.push($(this).attr('id'));
				var getId = $(this).attr('id');
				var idName = getId.charAt(0);
				//console.log(idName);
				var idNumber = parseInt(getId.substring(1));
				var i = idNumber;
				
				if(i<=15){
					var columnEndValue = 15;
				}
				else{
					var columnEndValue = 22;
				}
				
				checkTicketType();
				
			}
			else{
				/*Here in this block the selected items will be stored in the "setSelectedSeats" Array
				*/
				setSelectedSeats.push($(this).attr('id'));
				var getId = $(this).attr('id');
				var idName = getId.charAt(0);
				var idNumber = parseInt(getId.substring(1));
				//console.log("ID = "+idName+idNumber);
				var i = idNumber;
				
				if(i<=15){
					var columnEndValue = 15;
				}
				else{
					var columnEndValue = 22;
				}
				
				checkTicketType();
				
			}
		}
		else{
			alert("Please Select The Ticket Quantity");
		}
		
		
		function checkTicketType(){
			if(ticketType==null){
				alert("Please Select Ticket Type");
			}
			else if((idName=="A"||idName=="B"||idName=="C")&&(ticketType=="premium")){
				setItem();
			}
			else if(ticketType=="standard"){
				if(idName=="A"||idName=="B"||idName=="C"){
					alert("You Can Only Select "+ticketType+" Type of Seats");
				}
				else{
					setItem();
				}
			}
			else{
				alert("You Can Only Select "+ticketType+" Type of Seats");
			}
		}
		
		function setItem(value){
					while(ticketQuantity>curentlySelected.length){
					var className = $("#"+idName+i).attr('class');
					//console.log("class name : "+className);
					if((i>columnEndValue)||(className=="seat-unavailable")){
						break;
					}
					else{
					curentlySelected.push(idName+i)
					setSelectedSeats.push(idName+i);
					$("#"+idName+i).toggleClass("select");
					i++;
				}
			}
		}


		if(curentlySelected.length==ticketQuantity){
			$("#submit").show();
		}
		else{
			$("#submit").hide();
		}
		
		$("#submit").click(function(){
			// Adding Array data to the LocalStorage and reloading the page
			localStorage.setItem("boockedTickets", JSON.stringify(setSelectedSeats));
			location.reload();
		});

  });	
});



function addSeats(a,b) {
   for (var i = a; i <= b; i++) {
      document.write(String.fromCharCode(i) + '&nbsp; </span>');
      document.write('<div class="seats">');
      for (var j = 1; j <= 22; j++) {

         //Concatinating ID with Values of I & j ; ie: D1,E1...
         document.write(' <div id="'+ String.fromCharCode(i) + j + '" class="select-seats">' + j + '</div> ');

         //Adding Space After 8 and 15 items/seats
         if (j === 15) {
            document.write('&nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;');
         }
      }
      document.write("</div>");
      document.write("</br></br>");
   }
}