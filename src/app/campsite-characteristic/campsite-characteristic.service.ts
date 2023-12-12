import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampsiteCharacteristicRepository } from './campsite-characteristic.repository';
import { CampsiteCharacteristicModel } from 'src/model/campsite-characteristic.model';

@Injectable()
export class CampsiteCharacteristicService {
  constructor(
    @InjectRepository(CampsiteCharacteristicRepository)
    private campsiteCharacteristicRepository: CampsiteCharacteristicRepository,
  ) {}

  /* 캠핑장 특징 조회 */
  async GetCampsiteCharacteristic(
    campsiteId: string,
  ): Promise<CampsiteCharacteristicModel[]> {
    return this.campsiteCharacteristicRepository.GetCampsiteCharacteristic(
      campsiteId,
    );
  }
}
