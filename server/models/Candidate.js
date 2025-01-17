const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  
  // Email validation (basic regex for email format)
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    validate: {
      validator: function(value) {
        // Simple email regex for validation
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(value);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  
  // Phone number validation (allow only numbers and a specific length, e.g., 10 digits)
  phone: { 
    type: String, 
    required: true,
    validate: {
      validator: function(value) {
        const regex = /^[0-9]{10}$/; // Adjust length based on your country
        return regex.test(value);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  
  jobTitle: { type: String, required: true },
  status: { type: String, default: "Pending" },
  resumeUrl: { type: String },
});

module.exports = mongoose.model("Candidate", candidateSchema);
