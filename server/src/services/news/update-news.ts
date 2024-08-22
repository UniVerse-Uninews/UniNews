import { PrismaClient } from '@prisma/client';
import RSSParser from 'rss-parser';

const prisma = new PrismaClient();
const parser = new RSSParser();

async function updateNewsForUniversity(universityId: string, rssUrl: string) {
  try {
    const feed = await parser.parseURL(rssUrl);
    const newsItems = feed.items.map(item => ({
      title: item.title || '',
      description: item.contentSnippet || '',
      url: item.link || '',
      image: item.enclosure?.url || '',
      content: item.content || '',
      author: item.creator || '',
      universityId,
    }));

    await Promise.all(
      newsItems.map(async newsItem => {
        await prisma.news.upsert({
          where: { url: newsItem.url },
          update: newsItem,
          create: newsItem,
        });
      })
    );

    console.log(`Updated news for university ${universityId}`);
  } catch (error) {
    console.error(`Failed to update news for university ${universityId}:`, error);
  }
}

export async function updateAllUniversities() {
  const universities = await prisma.university.findMany();

  await Promise.all(
    universities.map(async university => {
      await updateNewsForUniversity(university.id, university.url);
    })
  );

  console.log('News update completed for all universities.');
}

updateAllUniversities()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
