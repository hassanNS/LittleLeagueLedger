$(".form-signin").submit( function(e) {
	// Prevent the default behavior of the form refreshing and shit
	e.preventDefault();
	$(location).attr('href', 'Templates/TeamManagerDashBoard.html')
});
