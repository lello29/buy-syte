import { Task } from '@/types';

// Sample task data
export const tasks: Task[] = [
  {
    id: 'task1',
    shopId: 'shop1',
    collaboratorId: 'collab1', // Adding the required collaboratorId
    title: 'Consegna prodotti',
    description: 'Consegnare i prodotti all\'indirizzo specificato',
    status: 'open',
    reward: 15,
    dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'task2',
    shopId: 'shop2',
    collaboratorId: 'collab2', // Adding the required collaboratorId
    title: 'Aggiornamento inventario',
    description: 'Aggiornare l\'inventario del negozio con i nuovi arrivi',
    status: 'assigned',
    reward: 20,
    dueDate: new Date(Date.now() + 172800000).toISOString(), // In 2 days
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'task3',
    shopId: 'shop1',
    collaboratorId: 'collab3', // Adding the required collaboratorId
    title: 'Promozione social media',
    description: 'Creare e pubblicare una promozione sui social media',
    status: 'completed',
    reward: 25,
    dueDate: new Date(Date.now() + 259200000).toISOString(), // In 3 days
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
];
