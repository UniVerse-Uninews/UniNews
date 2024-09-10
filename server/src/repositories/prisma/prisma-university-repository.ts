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