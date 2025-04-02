
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { collaborators, getTasksByCollaboratorId, shops } from "@/data/mockData";
import { Briefcase, Calendar, CheckCircle, ClipboardList, Clock, MapPin } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";

const TasksPage = () => {
  const { currentUser } = useAuth();
  const [filter, setFilter] = useState<"all" | "open" | "assigned" | "completed">("all");
  
  if (!currentUser || currentUser.role !== "collaborator") {
    return <div>Accesso non autorizzato</div>;
  }
  
  const collaborator = collaborators.find(collab => collab.userId === currentUser.id);
  
  if (!collaborator) {
    return <div>Profilo collaboratore non trovato</div>;
  }
  
  const tasks = getTasksByCollaboratorId(collaborator.id);
  
  // Filter tasks based on selected filter
  const filteredTasks = filter === "all" ? tasks : tasks.filter(task => task.status === filter);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">I Miei Incarichi</h1>
      <p className="text-gray-600">
        Visualizza e gestisci i tuoi incarichi come collaboratore.
      </p>
      
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          Tutti
        </Button>
        <Button
          variant={filter === "open" ? "default" : "outline"}
          onClick={() => setFilter("open")}
        >
          Disponibili
        </Button>
        <Button
          variant={filter === "assigned" ? "default" : "outline"}
          onClick={() => setFilter("assigned")}
        >
          Assegnati
        </Button>
        <Button
          variant={filter === "completed" ? "default" : "outline"}
          onClick={() => setFilter("completed")}
        >
          Completati
        </Button>
      </div>
      
      {filteredTasks.length > 0 ? (
        <div className="space-y-6">
          {filteredTasks.map(task => {
            const shop = shops.find(s => s.id === task.shopId);
            
            return (
              <Card key={task.id} className="overflow-hidden">
                <CardHeader className={`${
                  task.status === "completed" 
                    ? "bg-green-50" 
                    : task.status === "assigned" 
                    ? "bg-blue-50"
                    : "bg-yellow-50"
                }`}>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {task.status === "completed" ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : task.status === "assigned" ? (
                        <Clock className="h-5 w-5 text-blue-600" />
                      ) : (
                        <ClipboardList className="h-5 w-5 text-amber-600" />
                      )}
                      {task.title}
                    </CardTitle>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                      task.status === "completed" 
                        ? "bg-green-100 text-green-800" 
                        : task.status === "assigned" 
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {task.status === "completed" 
                        ? "Completato" 
                        : task.status === "assigned" 
                        ? "Assegnato"
                        : "Disponibile"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="text-gray-700">{task.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Scadenza: {format(new Date(task.dueDate), "d MMMM yyyy", { locale: it })}</span>
                      </div>
                      
                      {shop && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>Negozio: {shop.name}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-1 text-gray-600">
                        <Briefcase className="h-4 w-4" />
                        <span>Ricompensa: €{task.reward.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end pt-2">
                      {task.status === "open" ? (
                        <Button>Accetta Incarico</Button>
                      ) : task.status === "assigned" ? (
                        <Button>Segna come Completato</Button>
                      ) : (
                        <Button variant="outline">Dettagli</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="py-10 text-center">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">Nessun incarico trovato</p>
            <p className="text-gray-500 mb-6">
              {filter === "all"
                ? "Non hai ancora ricevuto incarichi."
                : filter === "open"
                ? "Non ci sono incarichi disponibili al momento."
                : filter === "assigned"
                ? "Non hai incarichi assegnati in corso."
                : "Non hai ancora completato nessun incarico."}
            </p>
            <Button onClick={() => setFilter("all")}>Visualizza tutti gli incarichi</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TasksPage;
