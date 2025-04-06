
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter } from "lucide-react";

interface SocialTabProps {
  formData: {
    socialLinks: {
      facebook: string;
      instagram: string;
      twitter: string;
    }
  };
  handleSocialInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const SocialTab: React.FC<SocialTabProps> = ({
  formData,
  handleSocialInputChange,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Facebook className="w-6 h-6 text-blue-600" />
          <div className="flex-1">
            <Input 
              placeholder="URL Facebook" 
              name="facebook"
              value={formData.socialLinks.facebook}
              onChange={handleSocialInputChange}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Instagram className="w-6 h-6 text-pink-600" />
          <div className="flex-1">
            <Input 
              placeholder="URL Instagram" 
              name="instagram"
              value={formData.socialLinks.instagram}
              onChange={handleSocialInputChange}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Twitter className="w-6 h-6 text-blue-400" />
          <div className="flex-1">
            <Input 
              placeholder="URL Twitter/X" 
              name="twitter"
              value={formData.socialLinks.twitter}
              onChange={handleSocialInputChange}
            />
          </div>
        </div>
      </div>
      
      <Button type="submit">Salva Social Media</Button>
    </form>
  );
};

export default SocialTab;
