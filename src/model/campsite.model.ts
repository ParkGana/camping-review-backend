import { ApiProperty, PickType } from '@nestjs/swagger';
import { CampsiteEntity } from 'src/entity/campsite.entity';
import { UserModel } from './user.model';

export class CampsiteModel extends PickType(CampsiteEntity, [
  'id',
  'name',
  'address',
  'inTime',
  'outTime',
  'type',
  'feeling',
] as const) {
  constructor(properties: CampsiteModel) {
    super();
    this.id = properties.id;
    this.name = properties.name;
    this.address = properties.address;
    this.inTime = properties.inTime;
    this.outTime = properties.outTime;
    this.type = properties.type;
    this.feeling = properties.feeling;
    this.user = new UserModel(properties.user);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  inTime: string;

  @ApiProperty()
  outTime: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  feeling: string;

  @ApiProperty()
  user: UserModel;
}
