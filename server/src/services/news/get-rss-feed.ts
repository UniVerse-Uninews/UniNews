import { parse } from 'rss-to-json';

export class GetRSSFeedUseCase {
  async execute(url: string) {
    return await parse(url);
  }
}