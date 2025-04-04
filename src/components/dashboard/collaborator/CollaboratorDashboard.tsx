
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardCard from "../cards/DashboardCard";
import { Package, Star, Calendar, User } from "lucide-react";
import { getTasksByCollaboratorId, collaborators, shops } from "@/data/mockData";

interface CollaboratorDashboardProps {
  userId: string;
}

const CollaboratorDashboard: React.FC<CollaboratorDashboardProps> = ({ userId }) => {
  const collaborator = collaborators.find(collab => collab.userId === userId);
  
  if (!collaborator) {
    return <div>Profilo collaboratore non trovato</div>;
  }
  
  const tasks = getTasksByCollaboratorId(collaborator.id);
  
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <DashboardCard
          title="Incarichi Completati"
          description="Il tuo storico di lavori"
          value={collaborator.completedTasks.toString()}
          icon={<Package className="h-8 w-8 text-green-600" />}
          linkTo="/dashboard/tasks"
        />
        
        <DashboardCard
          title="Valutazione"
          description="La tua reputazione"
          value={collaborator.rating.toString()}
          icon={<Star className="h-8 w-8 text-amber-500" />}
          linkTo="/dashboard/reviews"
        />
        
        <DashboardCard
          title="Incarichi Disponibili"
          description="Nuove opportunità di lavoro"
          value={(Math.floor(Math.random() * 8) + 2).toString()}
          icon={<Calendar className="h-8 w-8 text-blue-600" />}
          linkTo="/dashboard/available-tasks"
        />
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle>Il tuo profilo</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Nome:</dt>
                <dd className="text-sm text-gray-900">{collaborator.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Email:</dt>
                <dd className="text-sm text-gray-900">{collaborator.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Telefono:</dt>
                <dd className="text-sm text-gray-900">{collaborator.phone}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Area di copertura:</dt>
                <dd className="text-sm text-gray-900">{collaborator.coverageArea}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Disponibilità:</dt>
                <dd className="text-sm text-gray-900">{collaborator.availability}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Data registrazione:</dt>
                <dd className="text-sm text-gray-900">
                  {new Date(collaborator.createdAt).toLocaleDateString()}
                </dd>
              </div>
            </dl>
            <Button variant="outline" className="w-full mt-4">
              <User className="mr-2 h-4 w-4" />
              Modifica profilo
            </Button>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle>Incarichi recenti</CardTitle>
          </CardHeader>
          <CardContent>
            {tasks.length > 0 ? (
              <ul className="space-y-4">
                {tasks.map((task) => {
                  const shop = shops.find(s => s.id === task.shopId);
                  return (
                    <li key={task.id} className="p-3 bg-gray-50 rounded-md">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium text-sm">{task.title}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
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
                            : "Aperto"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                        {task.description}
                      </p>
                      <div className="flex justify-between text-xs">
                        <span>
                          Negozio: {shop?.name || "N/A"}
                        </span>
                        <span className="font-medium">
                          €{task.reward.toFixed(2)}
                        </span>
                      </div>
                    </li>
                  );
                })}
                <Button variant="ghost" size="sm" className="w-full">
                  Vedi tutti gli incarichi
                </Button>
              </ul>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Nessun incarico recente</p>
                <Button variant="outline" className="mt-4">
                  Cerca incarichi
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollaboratorDashboard;
