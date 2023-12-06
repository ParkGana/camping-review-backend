import { ApiProperty, PickType } from '@nestjs/swagger';
import { CampsiteEntity } from 'src/entity/campsite.entity';
import { UserModel } from './user.model';

export class CampsiteModel extends PickType(CampsiteEntity, [
  'id',
  'name',
  'address',
  'feeling',
  'inTime',
  'outTime',
] as const) {
  constructor(properties: CampsiteModel) {
    super();
    this.id = properties.id;
    this.name = properties.name;
    this.address = properties.address;
    this.feeling = properties.feeling;
    this.inTime = properties.inTime;
    this.outTime = properties.outTime;
    this.user = new UserModel(properties.user);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  feeling: string;

  @ApiProperty()
  inTime: string;

  @ApiProperty()
  outTime: string;

  @ApiProperty()
  user: UserModel;
}
