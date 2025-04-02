
import { Collaborator } from "@/types";

export const collaborators: Collaborator[] = [
  {
    id: "collab1",
    userId: "user4",
    name: "Elisa Neri",
    email: "elisa.neri@example.com",
    phone: "+39 333 4455667",
    coverageArea: "Milano",
    availability: "Lun-Ven, 9:00-18:00",
    rating: 4.5,
    completedTasks: 25,
    isActive: true,
    createdAt: "2022-04-10T08:00:00.000Z",
  },
  {
    id: "collab2",
    userId: "user6",
    name: "Francesca Russo",
    email: "francesca.russo@example.com",
    phone: "+39 345 6677889",
    coverageArea: "Roma",
    availability: "Mar-Sab, 10:00-19:00",
    rating: 4.8,
    completedTasks: 30,
    isActive: true,
    createdAt: "2022-06-12T14:00:00.000Z",
  },
  {
    id: "collab3",
    userId: "user10",
    name: "Chiara Rosa",
    email: "chiara.rosa@example.com",
    phone: "+39 320 1122334",
    coverageArea: "Napoli",
    availability: "Mer-Dom, 11:00-20:00",
    rating: 4.2,
    completedTasks: 18,
    isActive: false,
    createdAt: "2022-10-20T07:00:00.000Z",
  },
];
