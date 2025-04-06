
import { useDialogState } from './useDialogState';
import { useShopState } from './useShopState';
import { useFormHandlers } from './useFormHandlers';

export const useShopDialogs = () => {
  // Get dialog state management
  const dialogState = useDialogState();
  
  // Get shop state from useShopState
  const {
    newShop,
    setNewShop,
    setShopsList
  } = useShopState();

  // Get form handlers
  const formHandlers = useFormHandlers(
    dialogState.selectedShop,
    dialogState.setSelectedShop,
    newShop,
    setNewShop,
    setShopsList,
    dialogState.setIsAddShopOpen,
    dialogState.setIsEditShopOpen
  );

  return {
    ...dialogState,
    newShop,
    ...formHandlers
  };
};
