import React from "react";
import {MoreVertical} from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead,  } from "./table";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./dropdown-menu";

// Mock Project tracking data matching my dashboard image exactly

const projectsData = [
 {id: 1, name: "Victoria Island Residence", client: "John Adewale", size: "8.4 KW", type: "Hybrid", status: "In Progress", updated: "2h ago"},
 {id: 2, name: "Lekki Office Complex", client: "Grandfield Ltd.", size: "24.6 KW", type: "Grid-Tied", status: "Proposal", updated: "5h ago"},
 {id: 3, name: "Ibadan Factory", client: "Ibadan Foods", size: "48.0 KW", type: "Hybrid", status: "In Progress", updated: "1d ago" },
 {id: 4, name: "Abuja Hospital", client: "City Hospital", size: "36.2 KW", type: "Hybrid", status: "Completed", updated: "2d ago"},
 {id: 5, name: "Enugu Shopping Mall", client: "Enugu Mall Ltd", size: "28.5 KW", type: "Grid-Tied", status: "On Hold", updated: "3d ago"},
]

// Mapping statuses to their exact background and text colors variants from your design

const getStatusStyles = (status) => {
 switch(status) {
 case "In Progress":
  return "bg-blue-50/80 text-blue-600 !border-none hover:bg-blue-50"
  case "Proposal": 
  return "bg-amber-50/80 text-amber-600 !border-none hover:bg-amber-50"
  case "Completed":
    return "bg-emerald-50/80 text-emerald-600 !border-none hover:bg-emerald-50"
    case "On Hold":
      return "bg-purple-50/80 text-purple-600 !border-none hover:bg-purple-50"
   default:
    return "bg-gray-50 text-gray-600 !border-none"

 }

}

export default function RecentProjectsTable(){
 return (
 <Card className="w-full  p-6 bg-white mt-4 rounded-2xl shadow-sm">
  
 <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 px-2 pt-2">
  <CardTitle className="text-xs sm:text-sm md:text-xl font-bold text-gray-900">Recent Project</CardTitle>
  <Button variant="outline" className="text-sm font-medium border-gray-200 text-gray-700 rounded-xl px-4 py-2 hover:bg-gray-50 h-auto">
    View All Projects
  </Button>
 </CardHeader>

 {/* CORE DATA TABLE CONTAINER */}

 <CardContent className="px-4 pb-4 overflow-x-auto">
  <Table>
 <TableHeader>
  <TableRow className="border-none hover:bg-transparent">
    <TableHead className="text-gray-400 font-medium h-11">Project Name</TableHead>
    <TableHead className="text-gray-400 font-medium h-11">Client</TableHead>
    <TableHead className="text-gray-400 font-medium h-11">System</TableHead>
    <TableHead className="text-gray-400 font-medium h-11">Type</TableHead>
    <TableHead className="text-gray-400 font-medium h-11">Status</TableHead>
    <TableHead className="text-gray-400 font-medium h-11">Updated</TableHead>
  </TableRow>
 </TableHeader>

 <TableBody>
  {projectsData.map((project) =>(
  <TableRow key={project.id} className="border-none hover:bg-gray-50/40 transition-colors">
    {/* 1. Project Name */}
    <TableCell className="font-semibold text-gray-800  max-w-55 truncate whitespace-nowrap ">
      {project.name}
    </TableCell>
    
    {/* 2.Client */}

    <TableCell className="text-gray-500 py-4 whitespace-nowrap">
      {project.client}
    </TableCell>

    {/* 3. System Size */}
    <TableCell className="font-medium text-gray-800 py-4 whitespace-nowrap">
     {project.size}
    </TableCell>

    {/* 4. Type */}

    <TableCell className="text-gray-600 py-4 whitespace-nowrap">
      {project.type}
    </TableCell>

    {/*  5. Colored Status Badge */}

    <TableCell className="py-4">
      <Badge className={`px-3 py-1 text-xs font-semibold rounded-md tracking-wide ${getStatusStyles(project.status)}`}>
       {project.status}
      </Badge>
    </TableCell>

    <TableCell className="text-gray-600 py-4 whitespace-nowrap">
      {project.updated}
    </TableCell>

    {/* 7. Action Context Trigger (...) */}
    <TableCell className=" text-right p-0">
     <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-700 hover:bg-transparent">
            <MoreVertical className="h-5 w-5" strokeWidth={2.5}/>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="rounded-xl border-gray-100">
          <DropdownMenuItem  className="cursor-pointer font-medium text-sm py-2">View Details</DropdownMenuItem>
          <DropdownMenuItem  className="cursor-pointer font-medium text-sm py-2">Edit Project</DropdownMenuItem>
          <DropdownMenuItem  className="cursor-pointer font-medium text-sm text-destructive py-2">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </TableCell>

  </TableRow>


  ))}
 </TableBody>
  </Table>
 </CardContent>
 </Card>


 )

}