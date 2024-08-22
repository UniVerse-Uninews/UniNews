import { randomUUID } from "crypto";
import { UniversityRepository } from "../university-repository";
import { University, Prisma } from "@prisma/client";

export class InMemoryUniversityRepository implements UniversityRepository {
  findByName(prefix: string): Promise<University[]> {
    throw new Error("Method not implemented.");
  }
  private items: University[] = [];

  async findById(id: string): Promise<University | null> {
    const university = this.items.find((item) => item.id === id);
    return university || null;
  }

  async findByUrl(url: string): Promise<University | null> {
    const university = this.items.find((item) => item.url === url);
    return university || null;
  }

  async create(data: Prisma.UniversityCreateInput): Promise<University> {
    const university: University = {
      id: randomUUID(),
      name: data.name,
      location: data.location,
      url: data.url,
      description: data.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: data.image
    };

    this.items.push(university);

    return university;
  }

  async updateUniversity(id: string, data: Prisma.UniversityUpdateInput): Promise<University> {
    const university = await this.findById(id);
    if (!university) {
      throw new Error("University not found.");
    }

    university.name = data.name?.toString() ?? university.name;
    university.location = data.location?.toString() ?? university.location;
    university.url = data.url?.toString() ?? university.url;
    university.description = data.description?.toString() ?? university.description;
    university.updatedAt = new Date();

    return university;
  }

  async deleteUniversity(id: string): Promise<University> {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error("University not found.");
    }
    const [deletedUniversity] = this.items.splice(index, 1);
    return deletedUniversity;
  }

  async findAll(): Promise<University[]> {
    return this.items.map(university => ({
      ...university,
      createdAt: university.createdAt instanceof Date ? university.createdAt : new Date(university.createdAt),
      updatedAt: university.updatedAt instanceof Date ? university.updatedAt : new Date(university.updatedAt)
    }));
  }
}
