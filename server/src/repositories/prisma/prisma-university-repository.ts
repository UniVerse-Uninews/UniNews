import { prisma } from "@/lib/prisma ";
import { Prisma, University } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { UniversityRepository } from "../university-repository";

export class PrismaUniversityRepository implements UniversityRepository {
    async findById(id: string): Promise<University | null> {
        const university = await prisma.university.findUnique({
        where: {
            id,
        },
        });
        return university;
    }
    
    async findByUrl(url: string): Promise<University | null> {
        const university = await prisma.university.findUnique({
        where: {
            url: url,
        },
        });
        return university;
    }
    
    async create(data: Prisma.UniversityCreateInput) {
        const university = await prisma.university.create({
        data,
        });
        return university;
    }
    
    async findAll() {
        const allUniversities = await prisma.university.findMany();
        return allUniversities;
    }
    
    async deleteUniversity(id: string) : Promise<University>{
        const university = await prisma.university.delete({
        where: {
            id,
        },
        });
        return university;
    }
    
    async updateUniversity(id: string, data: Prisma.UniversityUpdateInput): Promise<University> {
        const university = await prisma.university.update({
        where: { id },
        data: {
            ...data,
            updatedAt: new Date(),
        },
        });
        return university;
    }
    }