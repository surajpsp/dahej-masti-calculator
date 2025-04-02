
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DahejFormData } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Car, Bike, Home, Palmtree } from "lucide-react";

// Generate array of numbers from start to end (inclusive)
const range = (start: number, end: number) => 
  Array.from({ length: end - start + 1 }, (_, i) => i + start);

const DahejForm: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<DahejFormData>({
    name: "",
    age: 25,
    profession: "अन्य",
    jobType: "प्राइवेट",
    monthlyIncome: 10000,
    houseCount: 1,
    landCount: 0,
    carCount: 0,
    bikeCount: 0,
    hasAC: false,
    hasFurniture: false,
  });
  
  const handleChange = (field: keyof DahejFormData, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("कृपया अपना नाम दर्ज करें!");
      return;
    }
    
    // Store form data in sessionStorage to pass to the results page
    sessionStorage.setItem("dahejFormData", JSON.stringify(formData));
    
    // Navigate to results page
    navigate("/results");
  };

  // Income options in rupees (monthly)
  const incomeOptions = [
    { value: "5000", label: "₹5,000" },
    { value: "10000", label: "₹10,000" },
    { value: "20000", label: "₹20,000" },
    { value: "50000", label: "₹50,000" },
    { value: "100000", label: "₹1 लाख" },
    { value: "200000", label: "₹2 लाख" },
    { value: "300000", label: "₹3 लाख" },
    { value: "400000", label: "₹4 लाख" },
    { value: "500000", label: "₹5 लाख" },
  ];

  return (
    <Card className="w-full max-w-md mx-auto border-dahej-gold border-2 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-dahej-orange/30 to-dahej-gold/30">
        <CardTitle className="text-center text-2xl">दहेज गणना फॉर्म</CardTitle>
        <CardDescription className="text-center">अपनी जानकारी भरें और अपना दहेज स्कोर देखें</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">नाम</Label>
            <Input 
              id="name" 
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="अपना नाम लिखें"
              className="border-dahej-orange/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age">आयु</Label>
            <Select 
              value={formData.age.toString()} 
              onValueChange={(value) => handleChange("age", parseInt(value))}
            >
              <SelectTrigger className="border-dahej-orange/50">
                <SelectValue placeholder="अपनी आयु चुनें" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {range(18, 50).map((age) => (
                    <SelectItem key={age} value={age.toString()}>
                      {age} वर्ष
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="profession">पेशा</Label>
            <Select 
              value={formData.profession} 
              onValueChange={(value) => handleChange("profession", value)}
            >
              <SelectTrigger className="border-dahej-orange/50">
                <SelectValue placeholder="अपना पेशा चुनें" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="डॉक्टर">डॉक्टर</SelectItem>
                  <SelectItem value="इंजीनियर">इंजीनियर</SelectItem>
                  <SelectItem value="वकील">वकील</SelectItem>
                  <SelectItem value="बिज़नेसमैन">बिज़नेसमैन</SelectItem>
                  <SelectItem value="शिक्षक">शिक्षक</SelectItem>
                  <SelectItem value="सरकारी अधिकारी">सरकारी अधिकारी</SelectItem>
                  <SelectItem value="अन्य">अन्य</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="jobType">नौकरी का प्रकार</Label>
            <Select 
              value={formData.jobType} 
              onValueChange={(value) => handleChange("jobType", value)}
            >
              <SelectTrigger className="border-dahej-orange/50">
                <SelectValue placeholder="नौकरी का प्रकार चुनें" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="सरकारी">सरकारी</SelectItem>
                  <SelectItem value="प्राइवेट">प्राइवेट</SelectItem>
                  <SelectItem value="व्यवसायी">व्यवसायी</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="monthlyIncome">मासिक आय</Label>
            <Select 
              value={formData.monthlyIncome.toString()} 
              onValueChange={(value) => handleChange("monthlyIncome", parseInt(value))}
            >
              <SelectTrigger className="border-dahej-orange/50">
                <SelectValue placeholder="अपनी आय चुनें" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {incomeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="houseCount" className="flex items-center gap-1">
                <Home size={16} className="text-dahej-red" />
                घर
              </Label>
              <Select 
                value={formData.houseCount.toString()} 
                onValueChange={(value) => handleChange("houseCount", parseInt(value))}
              >
                <SelectTrigger className="border-dahej-orange/50">
                  <SelectValue placeholder="संख्या चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {range(0, 12).map((count) => (
                      <SelectItem key={count} value={count.toString()}>
                        {count}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="landCount" className="flex items-center gap-1">
                <Palmtree size={16} className="text-dahej-green" />
                जमीन (एकड़)
              </Label>
              <Select 
                value={formData.landCount.toString()} 
                onValueChange={(value) => handleChange("landCount", parseInt(value))}
              >
                <SelectTrigger className="border-dahej-orange/50">
                  <SelectValue placeholder="संख्या चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {range(0, 12).map((count) => (
                      <SelectItem key={count} value={count.toString()}>
                        {count}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="carCount" className="flex items-center gap-1">
                <Car size={16} className="text-dahej-blue" />
                कार
              </Label>
              <Select 
                value={formData.carCount.toString()} 
                onValueChange={(value) => handleChange("carCount", parseInt(value))}
              >
                <SelectTrigger className="border-dahej-orange/50">
                  <SelectValue placeholder="संख्या चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {range(0, 5).map((count) => (
                      <SelectItem key={count} value={count.toString()}>
                        {count}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bikeCount" className="flex items-center gap-1">
                <Bike size={16} className="text-dahej-orange" />
                बाइक
              </Label>
              <Select 
                value={formData.bikeCount.toString()} 
                onValueChange={(value) => handleChange("bikeCount", parseInt(value))}
              >
                <SelectTrigger className="border-dahej-orange/50">
                  <SelectValue placeholder="संख्या चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {range(0, 5).map((count) => (
                      <SelectItem key={count} value={count.toString()}>
                        {count}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="hasAC">एयर कंडीशनर</Label>
              <Select 
                value={formData.hasAC ? "true" : "false"} 
                onValueChange={(value) => handleChange("hasAC", value === "true")}
              >
                <SelectTrigger className="border-dahej-orange/50">
                  <SelectValue placeholder="चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="true">हां</SelectItem>
                    <SelectItem value="false">नहीं</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hasFurniture">फर्नीचर</Label>
              <Select 
                value={formData.hasFurniture ? "true" : "false"} 
                onValueChange={(value) => handleChange("hasFurniture", value === "true")}
              >
                <SelectTrigger className="border-dahej-orange/50">
                  <SelectValue placeholder="चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="true">हां</SelectItem>
                    <SelectItem value="false">नहीं</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-dahej-red hover:bg-dahej-red/90 text-white"
          >
            दहेज गणना करें
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-center text-gray-500 w-full">
          👉 यह सिर्फ मनोरंजन के लिए है। दहेज माँगना और देना कानूनी अपराध है।
        </p>
      </CardFooter>
    </Card>
  );
};

export default DahejForm;
