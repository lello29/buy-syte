
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  ArrowRight, 
  ArrowLeft, 
  Save,
  ImagePlus,
  Check,
  Package,
  Settings,
  Tag,
  Info
} from "lucide-react";
import { toast } from "sonner";
import ProductBasicInfo from "./product-form/ProductBasicInfo";
import ProductDetails from "./product-form/ProductDetails";
import ProductImages from "./product-form/ProductImages";
import ProductOptions from "./product-form/ProductOptions";
import ProductPublish from "./product-form/ProductPublish";
import { useIsMobile } from "@/hooks/use-mobile";
import { Product } from "@/types";

type ProductFormData = Partial<Product> & {
  variants?: {
    name: string;
    options: { value: string; price?: number; stock?: number }[];
  }[];
  sellingOptions?: {
    isOnlinePurchase: boolean;
    isReservationOnly: boolean;
    isInStoreOnly: boolean;
  };
  seo?: {
    keywords: string[];
    optimizedTitle: string;
  };
  images: (string | File)[];
}

const STEPS = [
  { id: "basic-info", label: "Info base", icon: Info },
  { id: "details", label: "Dettagli", icon: Package },
  { id: "images", label: "Immagini", icon: ImagePlus },
  { id: "options", label: "Opzioni", icon: Settings },
  { id: "publish", label: "Pubblica", icon: Check }
];

const AddProductForm: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const isMobile = useIsMobile();
  const [currentStep, setCurrentStep] = useState(0);
  const [productData, setProductData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    category: "",
    inventory: 0,
    images: [],
    variants: [],
    sellingOptions: {
      isOnlinePurchase: true,
      isReservationOnly: false,
      isInStoreOnly: false
    },
    isActive: true
  });

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateProductData = (data: Partial<ProductFormData>) => {
    setProductData(prev => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    // Here would be the API call to save the product
    toast.success("Prodotto salvato con successo!");
    console.log("Product data:", productData);
    
    // Close the modal or redirect
    if (onClose) onClose();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs 
        value={STEPS[currentStep].id} 
        className="w-full"
        onValueChange={(value) => {
          const index = STEPS.findIndex(step => step.id === value);
          if (index !== -1) setCurrentStep(index);
        }}
      >
        <TabsList className={`w-full grid grid-cols-${STEPS.length} mb-6`}>
          {STEPS.map((step, index) => (
            <TabsTrigger 
              key={step.id} 
              value={step.id}
              className={`flex flex-col items-center py-2 ${isMobile ? 'text-xs' : ''}`}
              disabled={index > currentStep}
            >
              {!isMobile && <span className="mb-1">{step.label}</span>}
              <step.icon className={`h-5 w-5 ${isMobile ? 'mb-0' : 'mb-1'}`} />
              {isMobile && <span className="text-[10px] mt-1">{step.label}</span>}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="p-4 border rounded-lg mb-4">
          <TabsContent value="basic-info">
            <ProductBasicInfo 
              data={productData} 
              updateData={updateProductData} 
            />
          </TabsContent>
          
          <TabsContent value="details">
            <ProductDetails 
              data={productData} 
              updateData={updateProductData} 
            />
          </TabsContent>
          
          <TabsContent value="images">
            <ProductImages 
              data={productData} 
              updateData={updateProductData} 
            />
          </TabsContent>
          
          <TabsContent value="options">
            <ProductOptions 
              data={productData} 
              updateData={updateProductData} 
            />
          </TabsContent>
          
          <TabsContent value="publish">
            <ProductPublish 
              data={productData}
              updateData={updateProductData}
              onSubmit={handleSubmit}
            />
          </TabsContent>
        </div>

        <div className="flex justify-between mt-4">
          <Button
            onClick={handlePrevious}
            variant="outline"
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Precedente
          </Button>
          
          {currentStep < STEPS.length - 1 ? (
            <Button onClick={handleNext}>
              Successivo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              <Save className="mr-2 h-4 w-4" />
              Salva Prodotto
            </Button>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default AddProductForm;
