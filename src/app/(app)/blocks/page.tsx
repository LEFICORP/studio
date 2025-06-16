import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit3, Trash2, ListFilter } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { IndividualBlock } from "@/lib/types"; // Assuming types are defined

const dummyBlocks: IndividualBlock[] = [
  { id_bloque: "1", id_usuario: "user1", nombre_bloque: "Morning Routine", tier: 1, hora_inicio: "2024-07-30T07:00:00Z", hora_fin: "2024-07-30T08:00:00Z", fecha: "2024-07-30", obligatorio: true, estado: "pendiente", fuente: "manual", createdAt: new Date(), updatedAt: new Date() },
  { id_bloque: "2", id_usuario: "user1", nombre_bloque: "Work Session 1", tier: 1, hora_inicio: "2024-07-30T09:00:00Z", hora_fin: "2024-07-30T12:00:00Z", fecha: "2024-07-30", obligatorio: true, estado: "pendiente", fuente: "trabajo", createdAt: new Date(), updatedAt: new Date() },
  { id_bloque: "3", id_usuario: "user1", nombre_bloque: "Gym Workout", tier: 3, hora_inicio: "2024-07-30T17:00:00Z", hora_fin: "2024-07-30T18:00:00Z", fecha: "2024-07-30", obligatorio: false, estado: "pendiente", fuente: "manual", createdAt: new Date(), updatedAt: new Date() },
  { id_bloque: "4", id_usuario: "user1", nombre_bloque: "Read a Book", tier: 4, hora_inicio: "2024-07-30T20:00:00Z", hora_fin: "2024-07-30T21:00:00Z", fecha: "2024-07-30", obligatorio: false, estado: "completado", fuente: "manual", createdAt: new Date(), updatedAt: new Date() },
];

function TierBadge({ tier }: { tier: IndividualBlock['tier'] }) {
  const tierColors = {
    1: "bg-red-500/80 hover:bg-red-500", // Innegociables
    2: "bg-orange-500/80 hover:bg-orange-500", // Responsabilidades
    3: "bg-blue-500/80 hover:bg-blue-500", // Mejora personal
    4: "bg-green-500/80 hover:bg-green-500", // Ocio
  };
  return <Badge className={`text-white ${tierColors[tier]}`}>Tier {tier}</Badge>;
}

export default function BlocksPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline">Manage Your Blocks</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <ListFilter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Block
          </Button>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Blocks</CardTitle>
          <CardDescription>View, edit, or delete your scheduled blocks.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyBlocks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    No blocks found. Start by creating one!
                  </TableCell>
                </TableRow>
              ) : (
                dummyBlocks.map((block) => (
                  <TableRow key={block.id_bloque}>
                    <TableCell className="font-medium">{block.nombre_bloque}</TableCell>
                    <TableCell>{new Date(block.fecha + 'T00:00:00Z').toLocaleDateString()}</TableCell>
                    <TableCell>
                      {new Date(block.hora_inicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                      {new Date(block.hora_fin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </TableCell>
                    <TableCell><TierBadge tier={block.tier} /></TableCell>
                    <TableCell><Badge variant={block.estado === "completado" ? "default" : "secondary"} className={block.estado === "completado" ? "bg-green-500 hover:bg-green-600 text-white" : ""}>{block.estado}</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="hover:text-primary">
                        <Edit3 className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                         <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
