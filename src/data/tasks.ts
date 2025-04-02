
import { Task } from "@/types";

export const tasks: Task[] = [
  {
    id: "task1",
    shopId: "shop1",
    collaboratorId: "collab1",
    title: "Installazione Impianto Audio",
    description: "Installazione di un nuovo impianto audio nel negozio",
    status: "completed",
    reward: 150.00,
    dueDate: "2023-02-28T23:59:59.000Z",
    createdAt: "2023-01-20T10:00:00.000Z",
    updatedAt: "2023-02-28T23:59:59.000Z",
  },
  {
    id: "task2",
    shopId: "shop2",
    collaboratorId: "collab2",
    title: "Organizzazione Evento Moda",
    description: "Organizzazione di un evento per la presentazione della nuova collezione",
    status: "assigned",
    reward: 200.00,
    dueDate: "2023-04-05T23:59:59.000Z",
    createdAt: "2023-03-01T09:00:00.000Z",
    updatedAt: "2023-03-15T12:00:00.000Z",
  },
  {
    id: "task3",
    shopId: "shop3",
    title: "Promozione sui Social Media",
    description: "Creazione di una campagna pubblicitaria sui social media",
    status: "open",
    reward: 100.00,
    dueDate: "2023-05-31T23:59:59.000Z",
    createdAt: "2023-05-01T12:00:00.000Z",
    updatedAt: "2023-05-15T14:00:00.000Z",
  },
];

export const getTasksByCollaboratorId = (collaboratorId: string): Task[] => {
  return tasks.filter(task => task.collaboratorId === collaboratorId);
};
