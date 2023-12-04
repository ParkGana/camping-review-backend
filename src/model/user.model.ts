import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/entity/user.entity';

export class UserModel extends PickType(UserEntity, [
  'email',
  'name',
  'profileImage',
] as const) {
  constructor(properties: UserModel) {
    super();
    this.email = properties.email;
    this.name = properties.name;
    this.profileImage = properties.profileImage;
  }

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  profileImage: string | null;
}
