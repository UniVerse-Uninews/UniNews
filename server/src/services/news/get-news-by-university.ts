import { NewsRepository } from '../../repositories/news-repository';

export class GetNewsByUniversityUseCase {
  private newsRepository: NewsRepository;

  constructor() {
    this.newsRepository = new NewsRepository();
  }

  async execute(regex: RegExp) {
    return await this.newsRepository.findByUniversity(regex);
  }
}
