
import { DahejFormData } from "@/types";

export const calculateDahej = (formData: DahejFormData): number => {
  let baseAmount = 50000; // Base amount
  
  // Age factor - younger gets higher dahej
  const ageFactor = formData.age <= 25 ? 1.5 : 
                    formData.age <= 30 ? 1.2 :
                    formData.age <= 40 ? 1.0 : 0.7;
  
  // Job type factor
  const jobTypeFactor = formData.jobType === "सरकारी" ? 2.0 : 
                       formData.jobType === "प्राइवेट" ? 1.5 : 1.2;
  
  // Monthly income factor (converts to annual and factors in)
  const incomeFactor = formData.monthlyIncome / 5000; // normalized by 5000
  
  // Property factors
  const houseFactor = formData.houseCount * 30000;
  const landFactor = formData.landCount * 50000;
  
  // Profession bonus
  let professionBonus = 0;
  if (formData.profession === "डॉक्टर") professionBonus = 200000;
  else if (formData.profession === "इंजीनियर") professionBonus = 150000;
  else if (formData.profession === "वकील") professionBonus = 120000;
  else if (formData.profession === "बिज़नेसमैन") professionBonus = 100000;
  else if (formData.profession === "शिक्षक") professionBonus = 50000;
  else professionBonus = 20000;
  
  // Calculate total
  const totalAmount = Math.round((baseAmount * ageFactor * jobTypeFactor * incomeFactor) + houseFactor + landFactor + professionBonus);
  
  // Add some randomness for fun (±10%)
  const randomFactor = 0.9 + (Math.random() * 0.2);
  
  // Return final amount with some randomness
  return Math.round(totalAmount * randomFactor);
};

// Get a fun message based on the amount
export const getFunMessage = (amount: number): string => {
  if (amount > 1000000) {
    return "आप तो करोड़पति जामाई हैं! आपके सास-ससुर बहुत खुश होंगे!";
  } else if (amount > 500000) {
    return "वाह! आपका दहेज़ तो बहुत ज़्यादा है! अपनी शादी जल्दी कर लीजिए!";
  } else if (amount > 250000) {
    return "आपका दहेज़ अच्छा है! लड़की वाले खुश होंगे!";
  } else if (amount > 100000) {
    return "चलेगा! लेकिन थोड़ी और मेहनत की ज़रूरत है!";
  } else {
    return "थोड़ा कम है, पर चिंता मत कीजिए, प्यार सबसे बड़ा दहेज़ है!";
  }
};

// Format the amount as currency
export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('hi-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
