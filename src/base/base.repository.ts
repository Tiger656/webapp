import { Model } from 'mongoose';
import { BaseModel } from './base.model';

@Injectable()
export class BaseRepository<TModel, TCreateDto> {
  constructor(
    @InjectModel(BaseModel.name) private readonly baseModel: Model<TModel>,
  ) {}

  async find(filter: any) {
    return await this.baseModel.find(filter);
  }
  async create(createDto: TCreateDto) {
    const createdModel = new this.baseModel(createDto);
    return await createdModel.save();
  }

  async findAll() {
    return await this.baseModel.find();
  }

  async findOne(id: string) {
    return await this.baseModel.findById(id);
  }

  async update(id: string, createDto: TCreateDto) {
    return await this.baseModel.findByIdAndUpdate(id, createDto);
  }

  async remove(id: string) {
    await this.baseModel.findByIdAndRemove(id);
  }
}

function Injectable(): (
  target: typeof BaseRepository,
) => void | typeof BaseRepository {
  throw new Error('Function not implemented.');
}

function InjectModel(
  name: any,
): (
  target: typeof BaseRepository,
  propertyKey: undefined,
  parameterIndex: 0,
) => void {
  throw new Error('Function not implemented.');
}
