import { NewsRepository } from '../../repositories/news-repository';

export class AddNewsUseCase {
  private newsRepository: NewsRepository;

  constructor() {
    this.newsRepository = new NewsRepository();
  }

  async execute(newsData: any) {
    return await this.newsRepository.create(newsData);
  }
}