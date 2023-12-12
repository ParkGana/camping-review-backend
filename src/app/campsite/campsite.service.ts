import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampsiteRepository } from './campsite.repository';
import { CampsiteModel } from 'src/model/campsite.model';
import { CampsiteCreateDTO } from 'src/dto/campsite-create.dto';
import { UserRepository } from '../user/user.repository';
import { UserModel } from 'src/model/user.model';
import { CampsiteUpdateDTO } from 'src/dto/campsite-update.dto';
import { CampsiteCharacteristicRepository } from '../campsite-characteristic/campsite-characteristic.repository';

@Injectable()
export class CampsiteService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(CampsiteCharacteristicRepository)
    private campsiteCharacteristicRepository: CampsiteCharacteristicRepository,
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

  /* 캠핑장 정보 조회 */
  async GetCampsiteDetail(id: string): Promise<CampsiteModel> {
    return this.campsiteRepository.GetCampsiteDetail(id);
  }

  /* 캠핑장 등록 */
  async CreateCampsite(dto: CampsiteCreateDTO): Promise<string> {
    let campsiteId: string;

    await this.campsiteRepository.CreateCampsite(dto).then((id) => {
      campsiteId = id;
    });

    return this.campsiteCharacteristicRepository.ConnectCampsiteCharacteristic({
      campsiteId,
      characteristicIds: dto.characteristicIds,
    });
  }

  /* 캠핑장 수정 */
  async UpdateCampsite(dto: CampsiteUpdateDTO): Promise<string> {
    await this.campsiteRepository.UpdateCampsite(dto);

    await this.campsiteCharacteristicRepository.UnconnectCampsiteCharacteristic(
      dto.campsiteId,
    );

    return this.campsiteCharacteristicRepository.ConnectCampsiteCharacteristic({
      campsiteId: dto.campsiteId,
      characteristicIds: dto.characteristicIds,
    });
  }

  /* 캠핑장 삭제 */
  async DeleteCampsite(campsiteId: string): Promise<string> {
    return this.campsiteRepository.DeleteCampsite(campsiteId);
  }
}
