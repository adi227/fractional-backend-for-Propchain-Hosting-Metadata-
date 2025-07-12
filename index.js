const express = require('express');      // Web server framework
const cors = require('cors');            // Enable CORS for browser access
const cron = require('node-cron');       // Scheduling tasks like yield simulation

const app = express();                   // Create Express app
app.use(cors());                         // Allow all origins to access the API

const PORT = process.env.PORT || 3000;   // Server port

// In-memory simulated property data
const properties = {
  101: {
    propertyId: 101,
    name: "Palm Beach Villa",
    image: "https://yourcdn.com/images/palm-villa.png",
    pricePerShare: 0.05,
    yieldRate: 0.0001,
    lastUpdate: new Date().toISOString()
  },
  102: {
    propertyId: 102,
    name: "Downtown Loft",
    image: "https://yourcdn.com/images/loft.png",
    pricePerShare: 0.08,
    yieldRate: 0.00015,
    lastUpdate: new Date().toISOString()
  }
};

// Dynamic metadata endpoint
app.get('/property/:id/metadata', (req, res) => {
  const { id } = req.params;               // Get property ID from URL
  const property = properties[id];         // Look up the property

  if (!property) {
    return res.status(404).json({ error: 'Property not found' });
  }

  res.json({
    name: property.name,
    description: `Fractional ownership of ${property.name}. Earn real ETH yield.`,
    image: property.image,
    attributes: [
      { trait_type: "Property ID", value: property.propertyId },
      { trait_type: "Price Per Share (ETH)", value: property.pricePerShare },
      { trait_type: "Yield Rate (ETH/day/share)", value: property.yieldRate },
      { display_type: "date", trait_type: "Last Updated", value: new Date(property.lastUpdate).getTime() / 1000 }
    ]
  });
});

// Every 12 hours, randomly update yieldRate
cron.schedule('0 */12 * * *', () => {
  Object.values(properties).forEach(p => {
    p.yieldRate += (Math.random() - 0.5) * 0.00001;  // Small random fluctuation
    p.lastUpdate = new Date().toISOString();         // Update timestamp
    console.log(`[Yield Update] Property ${p.propertyId} → ${p.yieldRate.toFixed(5)}`);
  });
});

app.get('/', (req, res) => {
  res.send("Fractional Real Estate Metadata API is running.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Metadata API running at http://localhost:${PORT}`);
});
