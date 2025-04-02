
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DahejFormData } from "@/types";
import { calculateDahej, formatAmount, getFunMessage } from "@/utils/calculationUtils";
import { Copy, Facebook, Share2, WhatsApp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const DahejResult: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<DahejFormData | null>(null);
  const [dahejAmount, setDahejAmount] = useState<number>(0);
  
  useEffect(() => {
    const storedData = sessionStorage.getItem("dahejFormData");
    
    if (!storedData) {
      navigate("/");
      return;
    }
    
    try {
      const parsedData = JSON.parse(storedData) as DahejFormData;
      setFormData(parsedData);
      
      const amount = calculateDahej(parsedData);
      setDahejAmount(amount);
    } catch (error) {
      console.error("Error parsing form data:", error);
      navigate("/");
    }
  }, [navigate]);
  
  const handleCopyResult = () => {
    if (!formData) return;
    
    const text = `${formData.name} का दहेज स्कोर: ${formatAmount(dahejAmount)}\n\nयह जानकारी मनोरंजन के लिए है। दहेज लेना और देना कानूनी अपराध है।`;
    
    navigator.clipboard.writeText(text)
      .then(() => toast.success("रिजल्ट कॉपी हो गया!"))
      .catch(() => toast.error("कॉपी नहीं हो सका, दुबारा कोशिश करें।"));
  };
  
  const handleShare = (platform: "whatsapp" | "facebook") => {
    if (!formData) return;
    
    const text = `${formData.name} का दहेज स्कोर: ${formatAmount(dahejAmount)} - आपका दहेज स्कोर जानिए!`;
    const url = encodeURIComponent(window.location.href);
    
    let shareUrl = "";
    
    if (platform === "whatsapp") {
      shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    } else if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(text)}`;
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };
  
  if (!formData) {
    return <div className="text-center p-8">लोड हो रहा है...</div>;
  }
  
  return (
    <Card className="w-full max-w-md mx-auto border-dahej-gold border-2 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-dahej-orange/30 to-dahej-gold/30">
        <CardTitle className="text-center text-xl">बधाई हो! 🎉</CardTitle>
        <CardDescription className="text-center">{formData.name} का दहेज रिज़ल्ट</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 text-center">
        <h2 className="text-4xl font-bold text-dahej-red mb-2 animate-celebrate">
          {formatAmount(dahejAmount)}
        </h2>
        
        <p className="text-lg mt-4 text-dahej-blue">
          {getFunMessage(dahejAmount)}
        </p>
        
        <Separator className="my-6" />
        
        <div className="flex flex-col space-y-3">
          <p className="text-sm font-medium mb-2">अपने दोस्तों के साथ शेयर करें:</p>
          
          <div className="grid grid-cols-3 gap-3">
            <Button 
              variant="outline" 
              className="flex items-center justify-center space-x-2 border-dahej-green" 
              onClick={() => handleShare("whatsapp")}
            >
              <WhatsApp size={16} className="text-green-600" />
              <span>WhatsApp</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center justify-center space-x-2 border-dahej-blue" 
              onClick={() => handleShare("facebook")}
            >
              <Facebook size={16} className="text-blue-600" />
              <span>Facebook</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center justify-center space-x-2" 
              onClick={handleCopyResult}
            >
              <Copy size={16} />
              <span>कॉपी</span>
            </Button>
          </div>
          
          <Button 
            variant="default" 
            className="mt-4 bg-dahej-orange hover:bg-dahej-orange/90 text-white flex items-center justify-center space-x-2" 
            onClick={() => navigate("/")}
          >
            <Share2 size={16} />
            <span>नई गणना</span>
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-center text-gray-500 w-full">
          👉 यह सिर्फ मनोरंजन के लिए है। दहेज लेना और देना कानूनी अपराध है।
        </p>
      </CardFooter>
    </Card>
  );
};

export default DahejResult;
