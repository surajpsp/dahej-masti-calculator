
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DahejFormData } from "@/types";
import { calculateDahej, formatAmount, getFunMessage, getDahejItems } from "@/utils/calculationUtils";
import { Copy, Facebook, MessageCircle, Share2, Camera } from "lucide-react";
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
import html2canvas from "html2canvas";

const DahejResult: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<DahejFormData | null>(null);
  const [dahejAmount, setDahejAmount] = useState<number>(0);
  const [dahejItems, setDahejItems] = useState<string[]>([]);
  const resultCardRef = useRef<HTMLDivElement>(null);
  
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
      
      const items = getDahejItems(parsedData);
      setDahejItems(items);
    } catch (error) {
      console.error("Error parsing form data:", error);
      navigate("/");
    }
  }, [navigate]);
  
  const handleCopyResult = () => {
    if (!formData) return;
    
    const text = `${formData.name} का दहेज स्कोर: ${formatAmount(dahejAmount)}\n\nदहेज में शामिल: ${dahejItems.join(", ")}\n\nयह जानकारी मनोरंजन के लिए है। दहेज माँगना और देना कानूनी अपराध है।`;
    
    navigator.clipboard.writeText(text)
      .then(() => toast.success("रिजल्ट कॉपी हो गया!"))
      .catch(() => toast.error("कॉपी नहीं हो सका, दुबारा कोशिश करें।"));
  };
  
  const generateShareImage = async () => {
    if (!resultCardRef.current) return null;
    
    try {
      const canvas = await html2canvas(resultCardRef.current, {
        backgroundColor: '#FFF9E5', // Slight cream background
        scale: 2, // Higher resolution
        logging: false,
        useCORS: true
      });
      
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error("Error generating share image:", error);
      toast.error("इमेज बनाने में समस्या हुई");
      return null;
    }
  };
  
  const handleShare = async (platform: "whatsapp" | "facebook") => {
    if (!formData) return;
    
    const shareImage = await generateShareImage();
    if (!shareImage) {
      toast.error("इमेज बनाने में समस्या हुई");
      return;
    }
    
    const text = `${formData.name} का दहेज स्कोर: ${formatAmount(dahejAmount)} - आपका दहेज स्कोर जानिए!`;
    const url = encodeURIComponent(window.location.href);
    
    let shareUrl = "";
    
    if (platform === "whatsapp") {
      // On mobile, try to share the image directly if Web Share API is available
      if (navigator.share && navigator.canShare) {
        try {
          const blob = await (await fetch(shareImage)).blob();
          const file = new File([blob], "dahej-result.png", { type: "image/png" });
          
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: "दहेज रिजल्ट",
              text: text,
              files: [file],
              url: window.location.href
            });
            return;
          }
        } catch (error) {
          console.error("Error sharing:", error);
        }
      }
      
      // Fallback to regular WhatsApp share
      shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + window.location.href)}`;
    } else if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(text)}`;
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };
  
  const handleShareImage = async () => {
    if (!formData) return;
    
    const shareImage = await generateShareImage();
    if (!shareImage) {
      toast.error("इमेज बनाने में समस्या हुई");
      return;
    }
    
    // Create download link
    const link = document.createElement('a');
    link.href = shareImage;
    link.download = `${formData.name}-dahej-result.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("इमेज डाउनलोड हो गयी!");
  };
  
  if (!formData) {
    return <div className="text-center p-8">लोड हो रहा है...</div>;
  }
  
  return (
    <div className="w-full max-w-md mx-auto">
      <Card 
        ref={resultCardRef} 
        className="w-full border-dahej-gold border-2 shadow-lg mb-4 bg-gradient-to-br from-white to-amber-50"
      >
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
          
          <Separator className="my-4" />
          
          <div className="mt-4">
            <h3 className="text-sm font-bold mb-2">दहेज में शामिल सामान:</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {dahejItems.map((item, index) => (
                <li key={index} className="bg-amber-50 p-2 rounded-md border border-dahej-gold/30">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="w-full border-dahej-gold border-2 shadow-lg">
        <CardContent className="pt-6 text-center">
          <div className="flex flex-col space-y-3">
            <p className="text-sm font-medium mb-2">अपने दोस्तों के साथ शेयर करें:</p>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="flex items-center justify-center space-x-2 border-dahej-green" 
                onClick={() => handleShare("whatsapp")}
              >
                <MessageCircle size={16} className="text-green-600" />
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
              
              <Button 
                variant="outline" 
                className="flex items-center justify-center space-x-2" 
                onClick={handleShareImage}
              >
                <Camera size={16} />
                <span>इमेज सेव</span>
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
            👉 यह सिर्फ मनोरंजन के लिए है। दहेज माँगना और देना कानूनी अपराध है।
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DahejResult;
