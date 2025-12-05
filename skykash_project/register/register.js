// Indian States and Cities Data
const statesAndCities = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati", "Rajahmundry"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tezpur"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Purnia"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Raigarh"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar"],
  "Haryana": ["Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Karnal"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan", "Mandi", "Kullu", "Manali"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi", "Davanagere", "Ballari"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Kannur", "Palakkad"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Ratlam"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur"],
  "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur"],
  "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongstoin"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Udaipur", "Ajmer", "Bikaner", "Alwar"],
  "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Vellore"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Mahbubnagar"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Prayagraj", "Noida"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Nainital"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Darjeeling"],
  "Delhi": ["New Delhi", "Central Delhi", "South Delhi", "North Delhi", "East Delhi", "West Delhi"],
  "Chandigarh": ["Chandigarh"],
  "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur"],
  "Ladakh": ["Leh", "Kargil"]
};

// Populate states dropdown
const stateSelect = document.getElementById('state');
const citySelect = document.getElementById('city');

// Sort states alphabetically and populate
Object.keys(statesAndCities).sort().forEach(state => {
  const option = document.createElement('option');
  option.value = state;
  option.textContent = state;
  stateSelect.appendChild(option);
});

// Handle state change
stateSelect.addEventListener('change', function() {
  const selectedState = this.value;
  citySelect.innerHTML = '<option value="">Select City</option>';
  
  if (selectedState) {
    citySelect.disabled = false;
    const cities = statesAndCities[selectedState];
    cities.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
  } else {
    citySelect.disabled = true;
  }
  
  // Hide error when state is selected
  document.getElementById('stateError').style.display = 'none';
});

// Handle city change
citySelect.addEventListener('change', function() {
  if (this.value) {
    document.getElementById('cityError').style.display = 'none';
  }
});

// Form submission
const registerForm = document.getElementById('registerForm');
const successMessage = document.getElementById('successMessage');

registerForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const gender = document.getElementById('gender').value;
  const state = document.getElementById('state').value;
  const city = document.getElementById('city').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  // Reset error messages
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(msg => msg.style.display = 'none');
  
  let isValid = true;
  
  // Validate first name
  if (firstName.length < 2) {
    document.getElementById('firstNameError').style.display = 'block';
    isValid = false;
  }
  
  // Validate last name
  if (lastName.length < 2) {
    document.getElementById('lastNameError').style.display = 'block';
    isValid = false;
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('emailError').style.display = 'block';
    isValid = false;
  }
  
  // Validate phone
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone.replace(/[-\s]/g, ''))) {
    document.getElementById('phoneError').style.display = 'block';
    isValid = false;
  }
  
  // Validate gender
  if (!gender) {
    document.getElementById('genderError').style.display = 'block';
    isValid = false;
  }
  
  // Validate state
  if (!state) {
    document.getElementById('stateError').style.display = 'block';
    isValid = false;
  }
  
  // Validate city
  if (!city) {
    document.getElementById('cityError').style.display = 'block';
    isValid = false;
  }
  
  // Validate password
  if (password.length < 8) {
    document.getElementById('passwordError').style.display = 'block';
    isValid = false;
  }
  
  // Validate password match
  if (password !== confirmPassword) {
    document.getElementById('confirmPasswordError').style.display = 'block';
    isValid = false;
  }
  
  if (isValid) {
    // Store user data (in a real app, this would be sent to a server)
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      gender: gender,
      state: state,
      city: city,
      password: password
    };
    
    console.log('User registered:', userData);
    
    // Show success message
    successMessage.style.display = 'block';
    registerForm.reset();
    citySelect.disabled = true;
    
    // Redirect to login page after 2 seconds
    setTimeout(() => {
      window.location.href = './login.html';
    }, 2000);
  }
});

// Real-time validation for password match
document.getElementById('confirmPassword').addEventListener('input', function() {
  const password = document.getElementById('password').value;
  const confirmPassword = this.value;
  const errorMsg = document.getElementById('confirmPasswordError');
  
  if (confirmPassword && password !== confirmPassword) {
    errorMsg.style.display = 'block';
  } else {
    errorMsg.style.display = 'none';
  }
});

// Hide error on gender selection
document.getElementById('gender').addEventListener('change', function() {
  if (this.value) {
    document.getElementById('genderError').style.display = 'none';
  }
});