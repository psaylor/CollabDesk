function fillTemplate() {
	var template = $("#selectTemplate option:selected").text();

	var missingPackage = "Missing Package";
	var lostKey = "Lost Key";
	var reOrder = "Re-Order Supplies";
	var foundPackage = "Found Package";

	switch(template) {
		case missingPackage:
			$("#textinput").val("Missing Package");
			$("#textarea").val("There is a missing package for a resident.\n\nMissing Package for: \nRecipient E-mail: \nPackage Shipped By: \nPackage Description: ");
			$("#prependedtext").val("missingPackage");
			break;
		case lostKey:
			$("#textinput").val("Lost Key");
			$("#textarea").val("The key to a room was lost. The information is below.\n\nResident Name: \nRoom Number: ");
			$("#prependedtext").val("lostKey");
			break;
		case reOrder:
			$("#textinput").val("Re-Order Supplies");
			$("#textarea").val("There are supplies that we need to re-order.\n1) \n2) \n3) ");
			$("#prependedtext").val("ReOrderSupplies");
			break;
		case foundPackage:
			$("#textinput").val("Found Package");
			$("#textarea").val("I found the missing package! It was found at ...");
			$("#prependedtext").val("#foundPackage");
			break;
		default:
			$("#textinput").val("");
			$("#textarea").val("");
			$("#prependedtext").val("");
			break;
	}

}