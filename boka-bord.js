var currentMonth = new Date().getMonth();
var currentYear = new Date().getFullYear();
var clickedDays = 0;
var bookingSteps = 0;
var monthNames = ["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"];
var dayNames = ["Sön","Mån","Tis","Ons","Tors","Fre","Lör"];
var bookedDates = [];
var selectedDates = [];

function formatDates(dates) {
	if (dates != null) {
		var newDateArray = [];
		for (var i = 0; i < dates.length; i++) {
			var date = "";
			date += dayNames[dates[i].getDay()] + "-";
			date += dates[i].getDate() + "-";
			date += monthNames[dates[i].getMonth()] + "-";
			date += dates[i].getFullYear();
			newDateArray.push(date);
		}
		return newDateArray;
	}
	return null;
}

function validateForm() {
	var formValidated = true;
	var fields = ["#form-name","#form-number","#form-email","#form-guests","#form-time"];
	fields.forEach(function(sel) {
		if (!$(sel).val()) {
			$(sel).addClass("formError");
			formValidated = false;
		} else {
			$(sel).removeClass("formError");
		}
	});
	return formValidated;
}

function clearCalender() {
	clickedDays = 0;
	$(".month div").removeClass("clicked");
	$("#startdate").html("");
	startDate = "";
	endDate = "";
	selectedDates = [];
	bookingSteps = 0;
}

function clearBooking() {
	$("#booking-form input").val("");
	$("#booking-form textarea").val("");
	$("#booking-wrapper").removeClass("opened");
	$("#make-booking").html("Fortsätt Bokning");
}

function daysInMonth(month) {
	return new Date(currentYear, month, 0).getDate();
}

function displayCalender() {
	var days = daysInMonth(currentMonth + 1);
	$("#calender-title p").html(monthNames[currentMonth].toUpperCase());
	$("#calender-content").html("");
	for (var i = 1; i < firstDayOffset(new Date()); i++) {
		$("#calender-content").append("<div class='month flex center-vh'></div>");
	}
	for (var i = 1; i <= days; i++) {
		var day = new Date(currentYear, currentMonth, i).getDay();
		var string = "<div class='month'><div id='" + dayNames[day] + "-" + i + "-" + monthNames[currentMonth] + "-" + currentYear + "' class='month-selector flex center-vh clickable' onclick='monthClick(this)'><p>" + i + "</p></div></div>";
		$("#calender-content").append(string);
	}
	checkSelected();
	checkBookings();
}

function monthClick(e) {
	if ($(e).hasClass("clickable")) {

		$(".month-selector").removeClass("clicked");
		$(e).addClass("clicked");

		var dayIndex = parseInt($(e).attr('id').split('-')[1]);
		startDate = new Date(currentYear, currentMonth, dayIndex);
		endDate = startDate;
		clickedDays = 1;
		selectedDates = formatDates([startDate]);
		var formattedDate =
			dayNames[startDate.getDay()] + " " +
			startDate.getDate() + " " +
			monthNames[startDate.getMonth()] + " " +
			startDate.getFullYear();

		$("#startdate").html(formattedDate);
	}
}

function firstDayOffset(date) {
return new Date(currentYear, currentMonth, 1).getDay();

}

function checkBookings() {
	if (bookedDates != null) {
		for (var i = 0; i < bookedDates.length; i++) {
			var inner = bookedDates[i];
			for (var j = 0; j < inner.length; j++) {
				$("#" + inner[j]).removeClass("clickable").delay(400).addClass("booked");
			}
		}
	}
}

function checkSelected() {
	if (selectedDates != null) {
		for (var i = 0; i < selectedDates.length; i++) {
			$("#" + selectedDates[i]).addClass("clicked");
		}
	}
}

function addBooking() {
	bookedDates.push(selectedDates);
	clearCalender();
	displayCalender();
}

$(function() {
	displayCalender(currentMonth);
	$("#date").append(new Date);
});

$("#left").on("click", function() {
	if (currentMonth > 0) currentMonth -= 1;
	else { currentMonth = 11; currentYear -= 1; }
	displayCalender();
});

$("#right").on("click", function() {
	if (currentMonth < 11) currentMonth += 1;
	else { currentMonth = 0; currentYear += 1; }
	displayCalender();
});

$("#clear").on("click", function()  {
	clearCalender();
	clearBooking();
});

$("#make-booking").on("click", function() {
	if (selectedDates != null && selectedDates.length > 0) {
		bookingSteps += 1;

		if (bookingSteps == 1) {
			$("#booking-wrapper").addClass("opened");
			$("#make-booking").html("Bekräfta Bokning");
		}
		if (bookingSteps == 2) {
			if (validateForm()) {
				clearBooking();
				addBooking();
			} else {
				bookingSteps = 1;
			}
		}
	}
});





