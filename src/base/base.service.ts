import { BaseRepository } from './base.repository';

export abstract class BaseService<TModel, TCreateDto> {
  constructor(
    private readonly baseRepository: BaseRepository<TModel, TCreateDto>,
  ) {}

  async create(baseDto: TCreateDto) {
    return await this.baseRepository.create(baseDto);
  }

  async findAll() {
    return await this.baseRepository.findAll();
  }

  async findOne(id: string) {
    return await this.baseRepository.findOne(id);
  }

  async update(id: string, createDto: TCreateDto) {
    return await this.baseRepository.update(id, createDto);
  }

  async remove(id: string) {
    await this.baseRepository.remove(id);
    return `You removed a #${id} post`;
  }

  async find(filter: any) {
    return await this.baseRepository.find(filter);
  }
}
