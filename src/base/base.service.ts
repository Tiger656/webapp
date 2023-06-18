import { Model } from 'mongoose';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto copy';

export abstract class BaseService<T> {
  constructor(private model: Model<T>) {}

  async create(createBaseDto: CreateBaseDto) {
    const createdDcoument = new this.model(createBaseDto);
    return await createdDcoument.save();
  }

  async findAll() {
    return await this.model.find();
  }

  async findOne(id: string) {
    return await this.model.findById(id);
  }

  async update(id: string, updateBaseDto: CreateBaseDto) {
    return await this.model.findByIdAndUpdate(id, updateBaseDto);
  }

  async remove(id: string) {
    await this.model.findByIdAndRemove(id);
    return `You removed a #${id} post`;
  }

  async find(filter: any) {
    return await this.model.find(filter);
  }
}
