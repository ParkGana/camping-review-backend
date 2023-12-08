import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CharacteristicRepository } from './characteristic.repository';
import { UserRepository } from '../user/user.repository';
import { CharacteristicModel } from 'src/model/characteristic.model';
import { UserModel } from 'src/model/user.model';

@Injectable()
export class CharacteristicService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(CharacteristicRepository)
    private characteristicRepository: CharacteristicRepository,
  ) {}

  /* 특징 목록 조회 */
  async GetCharacteristicList(email: string): Promise<CharacteristicModel[]> {
    const profile = await this.userRepository.GetProfile(email);

    return this.characteristicRepository.GetCharacteristicList(
      email,
      new UserModel(profile).connectionEmail,
    );
  }
}
