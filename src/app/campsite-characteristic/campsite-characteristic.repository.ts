import { generateError } from 'error.config';
import { CampsiteCharacteristicConnectDTO } from 'src/dto/campsite-characteristic-connect.dto';
import { CampsiteCharacteristicEntity } from 'src/entity/campsite-characteristic.entity';
import { CampsiteCharacteristicModel } from 'src/model/campsite-characteristic.model';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CampsiteCharacteristicEntity)
export class CampsiteCharacteristicRepository extends Repository<CampsiteCharacteristicEntity> {
  /* 캠핑장 특징 조회 */
  async GetCampsiteCharacteristic(
    campsiteId: string,
  ): Promise<CampsiteCharacteristicModel[]> {
    const query = this.createQueryBuilder('campsite-characteristic');

    try {
      const connectCharacteristicList = await query
        .innerJoinAndSelect('campsite-characteristic.campsite', 'campsite')
        .where('campsite.id = :campsiteId', { campsiteId })
        .innerJoinAndSelect(
          'campsite-characteristic.characteristic',
          'characteristic',
        )
        .andWhere(
          'characteristic.id = campsite-characteristic.characteristicId',
        )
        .orderBy('characteristic.contents', 'ASC')
        .getMany();

      return connectCharacteristicList.map(
        (v) => new CampsiteCharacteristicModel(v),
      );
    } catch (error) {
      generateError(error.message);
    }
  }

  /* 캠핑장 특징 연결 해제 */
  async UnconnectCampsiteCharacteristic(campsiteId: string): Promise<string> {
    const query = this.createQueryBuilder('campsite-characteristic');

    try {
      await query
        .innerJoinAndSelect('campsite-characteristic.campsite', 'campsite')
        .softDelete()
        .where('campsite.id = :campsiteId', { campsiteId })
        .execute();

      return '캠핑장 특징 연결 해제 완료';
    } catch (error) {
      generateError(error.message);
    }
  }

  /* 캠핑장 특징 연결 */
  async ConnectCampsiteCharacteristic(
    dto: CampsiteCharacteristicConnectDTO,
  ): Promise<string> {
    const query = this.createQueryBuilder('campsite-characteristic');

    try {
      dto.characteristicIds.map(async (characteristicId) => {
        await query
          .insert()
          .values({
            campsite: { id: dto.campsiteId },
            characteristic: { id: characteristicId },
          })
          .execute();
      });

      return '캠핑장 특징 연결 완료';
    } catch (error) {
      generateError(error.message);
    }
  }
}
