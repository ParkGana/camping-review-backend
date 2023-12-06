import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampsiteRepository } from './campsite.repository';
import { CampsiteModel } from 'src/model/campsite.model';
import { CreateCampsiteDTO } from 'src/dto/create-campsite.dto';
import { UserRepository } from '../user/user.repository';
import { UserModel } from 'src/model/user.model';

@Injectable()
export class CampsiteService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(CampsiteRepository)
    private campsiteRepository: CampsiteRepository,
  ) {}

  /* 캠핑장 목록 조회 */
  async GetCampsiteList(email: string): Promise<CampsiteModel[]> {
    const profile = await this.userRepository.GetProfile(email);

    return this.campsiteRepository.GetCampsiteList(
      email,
      new UserModel(profile).connectionEmail,
    );
  }

  /* 캠핑장 등록 */
  async CreateCampsite(dto: CreateCampsiteDTO): Promise<string> {
    return this.campsiteRepository.CreateCampsite(dto);
  }
}
