
/**
 * Utility functions for handling product images
 */

/**
 * Adds new images to the current images array, with validation
 * @param currentImages Current array of images
 * @param newImages New images to add
 * @param maxImages Maximum allowed images
 * @returns Updated array of images
 */
export const addNewImages = (
  currentImages: (string | File)[], 
  newImages: (string | File)[],
  maxImages: number = 10
): (string | File)[] => {
  const totalImages = currentImages.length + newImages.length;
  
  if (totalImages > maxImages) {
    // Only add images up to the limit
    const remainingSlots = maxImages - currentImages.length;
    if (remainingSlots > 0) {
      return [...currentImages, ...newImages.slice(0, remainingSlots)];
    }
    return currentImages;
  } else {
    // Add all images
    return [...currentImages, ...newImages];
  }
};

/**
 * Checks if adding new images would exceed the maximum allowed
 * @param currentCount Current image count
 * @param newCount Number of new images to add
 * @param maxImages Maximum allowed images
 * @returns Warning message if exceeding limit, empty string otherwise
 */
export const getImageLimitWarning = (
  currentCount: number, 
  newCount: number, 
  maxImages: number = 10
): string => {
  if (currentCount >= maxImages) {
    return `Hai raggiunto il limite massimo di ${maxImages} immagini`;
  }
  
  if (currentCount + newCount > maxImages) {
    return `Puoi caricare un massimo di ${maxImages} immagini`;
  }
  
  return "";
};
