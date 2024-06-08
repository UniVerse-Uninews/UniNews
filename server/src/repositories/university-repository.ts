import { Prisma, University } from "@prisma/client";

export interface UniversityRepository {
  findById(id: string): Promise<University | null>;
  findByUrl(url: string): Promise<University | null>;
  create(data: Prisma.UniversityCreateInput): Promise<University>;
  findAll(): Promise<University[]>; 
  deleteUniversity(id: string): Promise<University>;
  updateUniversity(id: string, data: Prisma.UniversityUpdateInput): Promise<University>;
}