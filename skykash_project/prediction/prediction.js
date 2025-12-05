// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('departureDate').setAttribute('min', today);
document.getElementById('returnDate').setAttribute('min', today);

// Update return date minimum when departure date changes
document.getElementById('departureDate').addEventListener('change', function() {
  document.getElementById('returnDate').setAttribute('min', this.value);
});

// Form submission
document.getElementById('predictionForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const departure = document.getElementById('departure').value;
  const arrival = document.getElementById('arrival').value;
  const departureDate = document.getElementById('departureDate').value;
  const airline = document.getElementById('airline').value;
  const travelClass = document.getElementById('class').value;
  const passengers = document.getElementById('passengers').value;
  const stops = document.getElementById('stops').value;
  
  // Validate departure and arrival are different
  if (departure === arrival) {
    alert('Departure and arrival cities must be different!');
    return;
  }
  
  // Show loading state
  const btn = e.target.querySelector('.btn-predict');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<span class="btn-text">Predicting...</span> <span class="btn-icon">⏳</span>';
  btn.disabled = true;
  
  // Simulate API call with setTimeout
  setTimeout(function() {
    // Calculate predicted price (this is a simulation)
    const basePrices = {
      'Economy': 3000,
      'Premium Economy': 6000,
      'Business': 12000,
      'First Class': 25000
    };
    
    const basePrice = basePrices[travelClass] || 3000;
    const randomFactor = 0.8 + (Math.random() * 0.4); // 0.8 to 1.2
    const stopsDiscount = stops === 'Non-stop' ? 1.2 : stops === '1 Stop' ? 1.0 : 0.85;
    
    const predictedPrice = Math.round(basePrice * randomFactor * stopsDiscount * passengers);
    const minPrice = Math.round(predictedPrice * 0.85);
    const maxPrice = Math.round(predictedPrice * 1.15);
    
    // Display results
    document.getElementById('predictedPrice').textContent = `₹${predictedPrice.toLocaleString('en-IN')}`;
    document.getElementById('minPrice').textContent = `₹${minPrice.toLocaleString('en-IN')}`;
    document.getElementById('maxPrice').textContent = `₹${maxPrice.toLocaleString('en-IN')}`;
    
    // Update recommendations
    const daysUntilFlight = Math.ceil((new Date(departureDate) - new Date()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilFlight > 60) {
      document.getElementById('bestTime').textContent = 'Excellent! Booking 60+ days in advance typically offers the best prices.';
      document.getElementById('priceTrend').textContent = 'Prices are expected to remain stable over the next few weeks.';
      document.getElementById('bookingTip').textContent = 'Consider booking soon to lock in this price.';
    } else if (daysUntilFlight > 21) {
      document.getElementById('bestTime').textContent = 'Good timing! Booking 3-8 weeks ahead often provides competitive rates.';
      document.getElementById('priceTrend').textContent = 'Prices may fluctuate slightly. Monitor for the next few days.';
      document.getElementById('bookingTip').textContent = 'Set a price alert to track any significant changes.';
    } else if (daysUntilFlight > 7) {
      document.getElementById('bestTime').textContent = 'Moderate timing. Prices may be higher than advance bookings.';
      document.getElementById('priceTrend').textContent = 'Prices are likely to increase as the date approaches.';
      document.getElementById('bookingTip').textContent = 'Book soon to avoid last-minute price surges.';
    } else {
      document.getElementById('bestTime').textContent = 'Last-minute booking! Prices are typically highest now.';
      document.getElementById('priceTrend').textContent = 'Limited seats available. Prices are at peak levels.';
      document.getElementById('bookingTip').textContent = 'Book immediately if this flight is essential.';
    }
    
    // Create chart
    createPriceChart(predictedPrice);
    
    // Show results
    document.getElementById('resultsCard').style.display = 'block';
    document.getElementById('resultsCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Reset button
    btn.innerHTML = originalText;
    btn.disabled = false;
  }, 2000);
});

// Close results
document.getElementById('closeResults').addEventListener('click', function() {
  document.getElementById('resultsCard').style.display = 'none';
});

// Create price trend chart
function createPriceChart(basePrice) {
  const canvas = document.getElementById('priceChart');
  const ctx = canvas.getContext('2d');
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Set canvas size
  canvas.width = canvas.offsetWidth;
  canvas.height = 250;
  
  // Generate 30 days of price data
  const days = 30;
  const prices = [];
  for (let i = 0; i < days; i++) {
    const variation = 0.85 + (Math.random() * 0.3);
    prices.push(basePrice * variation);
  }
  
  // Find min and max for scaling
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;
  
  // Chart dimensions
  const padding = 40;
  const chartWidth = canvas.width - padding * 2;
  const chartHeight = canvas.height - padding * 2;
  
  // Draw axes
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, canvas.height - padding);
  ctx.lineTo(canvas.width - padding, canvas.height - padding);
  ctx.stroke();
  
  // Draw grid lines
  ctx.strokeStyle = '#f5f5f5';
  ctx.lineWidth = 1;
  for (let i = 1; i <= 5; i++) {
    const y = padding + (chartHeight / 5) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(canvas.width - padding, y);
    ctx.stroke();
  }
  
  // Draw price line
  ctx.strokeStyle = '#667eea';
  ctx.lineWidth = 3;
  ctx.beginPath();
  
  prices.forEach((price, index) => {
    const x = padding + (chartWidth / (days - 1)) * index;
    const y = canvas.height - padding - ((price - minPrice) / priceRange) * chartHeight;
    
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  
  ctx.stroke();
  
  // Draw points
  ctx.fillStyle = '#667eea';
  prices.forEach((price, index) => {
    const x = padding + (chartWidth / (days - 1)) * index;
    const y = canvas.height - padding - ((price - minPrice) / priceRange) * chartHeight;
    
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
  
  // Draw labels
  ctx.fillStyle = '#666';
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  
  // X-axis labels
  [0, 10, 20, 30].forEach(day => {
    const x = padding + (chartWidth / (days - 1)) * day;
    ctx.fillText(`Day ${day}`, x, canvas.height - 10);
  });
  
  // Y-axis labels
  ctx.textAlign = 'right';
  for (let i = 0; i <= 5; i++) {
    const price = minPrice + (priceRange / 5) * i;
    const y = canvas.height - padding - (chartHeight / 5) * i;
    ctx.fillText(`₹${Math.round(price / 1000)}k`, padding - 10, y + 4);
  }
}

// Book button
document.querySelector('.btn-book').addEventListener('click', function() {
  alert('Redirecting to booking page...');
  // window.location.href = './booking.html';
});

// Alert button
document.querySelector('.btn-alert').addEventListener('click', function() {
  alert('Price alert has been set! We will notify you when the price drops.');
});