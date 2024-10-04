import { prisma } from "@/lib/prisma ";
import { Prisma, University } from "@prisma/client";
import { UniversityRepository } from "../university-repository";

export class PrismaUniversityRepository implements UniversityRepository {
    async findById(id: string): Promise<University | null> {
        try {
            const university = await prisma.university.findUnique({
                where: { id },
            });
            return university;
        } catch (error) {
            
            console.error("Error occurred while finding university by id:", error);
            return null;
        }
    }

    async findByUrl(url: string): Promise<University | null> {
        try {
            const university = await prisma.university.findUnique({
                where: { url }, 
            });
            return university;
        } catch (error) {
            console.error("Error occurred while finding university by url:", error);
            return null;
        }
    }

    async create(data: Prisma.UniversityCreateInput): Promise<University> {
        try {
            const university = await prisma.university.create({
                data,
            });
            return university;
        } catch (error) {
            console.error("Error occurred while creating university:", error);
            throw error;
        }
    }

    async findAll(): Promise<University[]> {
        try {
            const allUniversities = await prisma.university.findMany();
            return allUniversities;
        } catch (error) {
            console.error("Error occurred while finding all universities:", error);
            return [];
        }
    }

    async deleteUniversity(id: string): Promise<University> {
        try {
            const university = await prisma.university.delete({
                where: { id },
            });
            return university;
        } catch (error) {
            console.error("Error occurred while deleting university:", error);
            throw error;
        }
    }

    async updateUniversity(id: string, data: Prisma.UniversityUpdateInput): Promise<University> {
        try {
            const university = await prisma.university.update({
                where: { id },
                data: {
                    ...data,
                    updatedAt: new Date(),
                },
            });
            return university;
        } catch (error) {
            console.error("Error occurred while updating university:", error);
            throw error;
        }
    }

    async findByName(prefix: string): Promise<University[]> {
        try {
            const universities = await prisma.university.findMany({
                where: {
                    name: {
                        contains: prefix,
                        mode: 'insensitive',
                    },
                },
                orderBy: {
                    name: 'asc',
                },
            });
            return universities;
        } catch (error) {
            console.error("Error occurred while finding universities by name:", error);
            return [];
        }
    }
    async findAllPaginated(offset: number, limit: number): Promise<University[]> {
        try {
            console.log(`Fetching universities with offset: ${offset}, limit: ${limit}`);
            const universities = await prisma.university.findMany({
                skip: offset,
                take: limit,
                orderBy: {
                    name: 'asc',
                },
            });
            
            if (universities.length === 0) {
                console.log("No universities found");
            }
    
            return universities;
        } catch (error) {
            console.error("Error occurred while paginating universities:", error);
            return [];
        }
    }

    }
    
    export const getUniversitiesByLocation = async (location: string) => {
        try {
            return await prisma.university.findMany({
                where: { location: location },
            });
        } catch (error) {
            console.error(`Error fetching universities for location ${location} from database:`, error);
            throw new Error('Error fetching universities');
        }
    };

    export async function getAllLocations() {
        const locations = await prisma.university.findMany({
          select: {
            location: true,
          },
          distinct: ['location'],
        });
      
        const countries = [...new Set(locations.map((loc) => loc.location))];
        
        return { countries };
      }

      export async function getStatesByCountry(country: string) {
        try {
          const states = await prisma.university.findMany({
            where: { location: country },
            select: { location: true },
            distinct: ['location'], // Retorna estados únicos
          });
          return states.map(state => state.location); // Retorna apenas os estados
        } catch (error) {
          console.error(`Erro ao buscar estados para o país ${country}:`, error);
          throw new Error('Erro ao buscar estados');
        }
      }
      
      // Função para obter universidades com base no estado
      export async function getUniversitiesByState(state: string) {
        try {
          return await prisma.university.findMany({
            where: { location: state },
          });
        } catch (error) {
          console.error(`Erro ao buscar universidades para o estado ${state}:`, error);
          throw new Error('Erro ao buscar universidades');
        }
      }