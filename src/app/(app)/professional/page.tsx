"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, Search, PlusCircle, Filter, Download, Edit } from "lucide-react";
import type { ProfessionalCompanyTemplate, BlockTemplate } from "@/lib/types"; // Assuming types are defined

const dummyTemplates: ProfessionalCompanyTemplate[] = [
  { 
    id_empresa_plantilla: "pt1", 
    nombre_empresa: "City General Hospital", 
    sector: "Salud", 
    tipo_turno: "Rotativo",
    descripcion: "Standard nurse shift templates.",
    plantillas_horario: [
      { id_plantilla: "nurse_morning", nombre_plantilla: "Nurse Morning Shift", creada_por: "pt1", tipo: "profesional", estructura_bloques: [{nombre_bloque: "Handover", duracion_minutos: 30, tier: 1}, {nombre_bloque: "Patient Rounds", duracion_minutos: 120, tier: 1}], visible: "compartida", createdAt: new Date(), updatedAt: new Date() },
      { id_plantilla: "nurse_night", nombre_plantilla: "Nurse Night Shift", creada_por: "pt1", tipo: "profesional", estructura_bloques: [], visible: "compartida", createdAt: new Date(), updatedAt: new Date() },
    ],
    visible_para_empresa: true,
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
  { 
    id_empresa_plantilla: "pt2", 
    nombre_empresa: "Tech Solutions Inc.", 
    sector: "Tecnología", 
    tipo_turno: "9-to-5",
    descripcion: "Developer and project manager templates.",
    plantillas_horario: [
       { id_plantilla: "dev_sprint", nombre_plantilla: "Developer Sprint Week", creada_por: "pt2", tipo: "profesional", estructura_bloques: [], visible: "compartida", createdAt: new Date(), updatedAt: new Date() },
    ],
    visible_para_empresa: true,
    createdAt: new Date(), 
    updatedAt: new Date() 
  },
];

// This would be determined by user role
const isManager = true; 

export default function ProfessionalPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");

  const filteredTemplates = dummyTemplates.filter(template => 
    (template.nombre_empresa.toLowerCase().includes(searchTerm.toLowerCase()) || 
     template.sector.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (sectorFilter ? template.sector === sectorFilter : true)
  );
  
  const sectors = Array.from(new Set(dummyTemplates.map(t => t.sector)));

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold font-headline flex items-center">
          <Briefcase className="mr-3 h-8 w-8 text-primary" /> Professional Templates
        </h1>
        {isManager && (
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Company Template
          </Button>
        )}
      </div>

      <Card className="shadow-lg mb-8">
        <CardHeader>
          <CardTitle>Find Templates</CardTitle>
          <CardDescription>Search for templates by company, sector, or keywords.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search by company, sector, keyword..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={sectorFilter} onValueChange={setSectorFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="All Sectors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Sectors</SelectItem>
              {sectors.map(sector => (
                <SelectItem key={sector} value={sector}>{sector}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {filteredTemplates.length === 0 ? (
         <Card className="shadow-md">
            <CardContent className="py-12 text-center">
                <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Templates Found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                {isManager && <Button className="mt-4" onClick={() => {/* Open create modal */}}>Create a Template</Button>}
            </CardContent>
         </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(companyTemplate => (
            <Card key={companyTemplate.id_empresa_plantilla} className="shadow-md flex flex-col">
              <CardHeader>
                <CardTitle>{companyTemplate.nombre_empresa}</CardTitle>
                <CardDescription>
                  Sector: {companyTemplate.sector} | Type: {companyTemplate.tipo_turno || "General"} <br />
                  {companyTemplate.descripcion}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <h4 className="font-semibold mb-2 text-sm">Available Shift Templates:</h4>
                {companyTemplate.plantillas_horario.length > 0 ? (
                  <ul className="space-y-1 text-sm list-disc list-inside text-muted-foreground">
                    {companyTemplate.plantillas_horario.map(shift => <li key={shift.id_plantilla}>{shift.nombre_plantilla}</li>)}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No specific shift templates defined.</p>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                {isManager && (
                   <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                )}
                <Button size="sm">
                  <Download className="mr-2 h-4 w-4" /> Use Template
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
