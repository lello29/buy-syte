
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import { Task, Collaborator } from "@/types";

// Mock data helper functions
const getTasksByCollaboratorId = (collaboratorId: string): Task[] => {
  return []; // Return empty array as placeholder
};

const collaborators: Collaborator[] = []; // Empty placeholder array

const TasksPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [collaborator, setCollaborator] = useState<Collaborator | null>(null);

  useEffect(() => {
    if (currentUser) {
      // Find collaborator by userId
      const foundCollaborator = collaborators.find(c => c.userId === currentUser.id);
      
      if (foundCollaborator) {
        setCollaborator(foundCollaborator);
        // Get tasks for this collaborator
        const collaboratorTasks = getTasksByCollaboratorId(foundCollaborator.id);
        setTasks(collaboratorTasks);
      }
    }
  }, [currentUser]);

  if (!currentUser || !collaborator) {
    return <div>Caricamento informazioni collaboratore...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">I miei incarichi</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map(task => (
          <div key={task.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <span 
                className={`px-2 py-1 text-xs rounded-full ${
                  task.status === 'completed' ? 'bg-green-100 text-green-800' :
                  task.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                  'bg-amber-100 text-amber-800'
                }`}
              >
                {task.status === 'completed' ? 'Completato' : 
                 task.status === 'assigned' ? 'Assegnato' : 'Aperto'}
              </span>
            </div>
            
            <p className="mt-2 text-sm text-gray-500">{task.description}</p>
            
            <div className="mt-4 pt-3 border-t flex justify-between items-center">
              <span className="text-sm font-medium text-primary">
                Ricompensa: €{task.reward.toFixed(2)}
              </span>
              <span className="text-xs text-gray-500">
                Scadenza: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
        
        {tasks.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">Nessun incarico trovato</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksPage;
