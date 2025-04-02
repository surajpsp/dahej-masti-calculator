
import { DahejFormData } from "@/types";

export const calculateDahej = (formData: DahejFormData): number => {
  let baseAmount = 100000; // Increased base amount
  
  // Age factor - younger gets higher dahej
  const ageFactor = formData.age <= 25 ? 1.8 : 
                    formData.age <= 30 ? 1.4 :
                    formData.age <= 40 ? 1.2 : 0.8;
  
  // Job type factor
  const jobTypeFactor = formData.jobType === "सरकारी" ? 2.5 : 
                       formData.jobType === "प्राइवेट" ? 1.8 : 1.5;
  
  // Monthly income factor (converts to annual and factors in)
  const incomeFactor = (formData.monthlyIncome / 10000) * 1.2; // normalized and increased
  
  // Property factors
  const houseFactor = formData.houseCount * 50000;
  const landFactor = formData.landCount * 100000;
  
  // New vehicle factors
  const carFactor = formData.carCount * 200000;
  const bikeFactor = formData.bikeCount * 50000;
  
  // Amenities factors
  const acFactor = formData.hasAC ? 50000 : 0;
  const furnitureFactor = formData.hasFurniture ? 75000 : 0;
  
  // Profession bonus
  let professionBonus = 0;
  if (formData.profession === "डॉक्टर") professionBonus = 300000;
  else if (formData.profession === "इंजीनियर") professionBonus = 250000;
  else if (formData.profession === "वकील") professionBonus = 200000;
  else if (formData.profession === "बिज़नेसमैन") professionBonus = 180000;
  else if (formData.profession === "सरकारी अधिकारी") professionBonus = 300000;
  else if (formData.profession === "शिक्षक") professionBonus = 80000;
  else professionBonus = 40000;
  
  // Calculate total including new factors
  const totalAmount = Math.round(
    (baseAmount * ageFactor * jobTypeFactor * incomeFactor) + 
    houseFactor + landFactor + professionBonus +
    carFactor + bikeFactor + acFactor + furnitureFactor
  );
  
  // Add some randomness for fun (±10%)
  const randomFactor = 0.95 + (Math.random() * 0.2);
  
  // Return final amount with some randomness
  return Math.round(totalAmount * randomFactor);
};

// Get a fun message based on the amount
export const getFunMessage = (amount: number): string => {
  if (amount > 5000000) {
    return "आप तो महाराजा हैं! आपका दहेज़ तो लखपति बना देगा लड़की वालों को!";
  } else if (amount > 2000000) {
    return "वाह! रॉयल दहेज़! आपकी शादी में तो बैंड-बाजा और हाथी भी होगा!";
  } else if (amount > 1000000) {
    return "बहुत बढ़िया! आपके सास-ससुर बहुत खुश होंगे! जल्दी शादी कर लीजिए!";
  } else if (amount > 500000) {
    return "अच्छा दहेज़! लड़की वाले आनंदित होंगे!";
  } else if (amount > 250000) {
    return "चलेगा! रिश्ता पक्का होने की संभावना है!";
  } else {
    return "थोड़ा कम है, पर चिंता मत कीजिए, प्यार सबसे बड़ा दहेज़ है!";
  }
};

// Get items included in dahej based on the amount
export const getDahejItems = (formData: DahejFormData): string[] => {
  const items: string[] = [];
  
  if (formData.carCount > 0) {
    items.push(`${formData.carCount} कार`);
  }
  
  if (formData.bikeCount > 0) {
    items.push(`${formData.bikeCount} बाइक`);
  }
  
  if (formData.hasAC) {
    items.push("एयर कंडीशनर");
  }
  
  if (formData.hasFurniture) {
    items.push("फर्नीचर सेट");
  }
  
  // Add default items based on dahej amount
  const amount = calculateDahej(formData);
  
  if (amount > 2000000) {
    items.push("सोने के गहने");
  }
  
  if (amount > 1000000) {
    items.push("टीवी");
    items.push("फ्रिज");
  }
  
  if (amount > 500000) {
    items.push("गैस स्टोव");
    items.push("मिक्सी");
  }
  
  if (items.length === 0) {
    items.push("चाय का सेट");
  }
  
  return items;
};

// Format the amount as currency
export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('hi-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
