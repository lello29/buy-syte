
import React from "react";
import ProductFormWithProvider from "./product-form/ProductFormLayout";

const AddProductForm: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  return <ProductFormWithProvider onClose={onClose} />;
};

export default AddProductForm;
