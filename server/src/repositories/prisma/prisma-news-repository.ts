import { PrismaClient } from '@prisma/client';

interface MongoDBResult {
  cursor: {
    firstBatch: any[];
  };
}

export class PrismaNewsRepository {
  private prisma = new PrismaClient();

  async findByUniversity(regex: RegExp) {
    const result = await this.prisma.$runCommandRaw({
      aggregate: 'News',
      pipeline: [
        {
          $match: {
            university: {
              $regex: regex.source,
              $options: 'i',
            },
          },
        },
      ],
      cursor: {},
    }) as unknown as MongoDBResult;

    return result.cursor.firstBatch;
  }

  async create(newsData: any) {
    return await this.prisma.news.create({ data: newsData });
  }
}
