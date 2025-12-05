document.querySelector("form").addEventListener("submit", function(event){
  event.preventDefault(); // Prevent form from submitting by default

  // Get values
  const journeyType = document.querySelector('input[name="journeyType"]:checked').value;
  const from = document.getElementById("from").value.trim();
  const to = document.getElementById("to").value.trim();
  const departure = document.getElementById("departureDate").value;
  const returnDate = document.getElementById("returnDate").value;
  const passengers = document.getElementById("passengers").value;
  const seatClass = document.getElementById("class").value;

  // Basic validation
  if (!from) {
    alert("Please enter departure location.");
    return;
  }
  if (!to) {
    alert("Please enter destination.");
    return;
  }
  if (!departure) {
    alert("Please select a departure date.");
    return;
  }
  if (journeyType === "roundtrip" && !returnDate) {
    alert("Please select a return date for round trip.");
    return;
  }
  if (!passengers) {
    alert("Please select number of passengers.");
    return;
  }
  if (!seatClass) {
    alert("Please select travel class.");
    return;
  }

  // (Optional) Additional date validation can be added here

  // Show booking summary
  let message = `Booking Summary:\n---\nJourney Type: ${journeyType === "oneway" ? "One Way" : "Round Trip"}\nFrom: ${from}\nTo: ${to}\nDeparture: ${departure}`;
  if (journeyType === "roundtrip") {
    message += `\nReturn: ${returnDate}`;
  }
  message += `\nPassengers: ${passengers}\nClass: ${seatClass}`;
  
  alert(message);

  // You can replace the alert with logic to send data to backend here
  // For example: send form data using fetch API

  // Reset form if needed
  this.reset();
  toggleReturn(false); // Disable return date by default after reset
});

function toggleReturn(isRoundTrip) {
  const returnDateField = document.getElementById('returnDate');
  returnDateField.disabled = !isRoundTrip;
  if (!isRoundTrip) returnDateField.value = '';
}
