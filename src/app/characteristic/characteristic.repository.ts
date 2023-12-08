import { generateError } from 'error.config';
import { CharacteristicCreateDTO } from 'src/dto/characteristic-create.dto';
import { CharacteristicEntity } from 'src/entity/characteristic.entity';
import { CharacteristicModel } from 'src/model/characteristic.model';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CharacteristicEntity)
export class CharacteristicRepository extends Repository<CharacteristicEntity> {
  /* 특징 목록 조회 */
  async GetCharacteristicList(
    email: string,
    connectionEmail: string,
  ): Promise<CharacteristicModel[]> {
    const query = this.createQueryBuilder('characteristic');

    try {
      const characteristicList = await query
        .innerJoinAndSelect('characteristic.user', 'user')
        .where('user.email IN (:userEmail, :connectionEmail)', {
          userEmail: email,
          connectionEmail: connectionEmail,
        })
        .orderBy('characteristic.contents', 'ASC')
        .getMany();

      return characteristicList.map((v) => new CharacteristicModel(v));
    } catch (error) {
      generateError(error.message);
    }
  }

  /* 특징 등록 */
  async CreateCharacteristic(dto: CharacteristicCreateDTO): Promise<string> {
    const query = this.createQueryBuilder('characteristic');

    try {
      await query
        .insert()
        .values({
          type: dto.type,
          contents: dto.contents,
          user: { email: dto.userEmail },
        })
        .execute();

      return '특징 등록 완료';
    } catch (error) {
      generateError(error.message);
    }
  }

  /* 특징 삭제 */
  async DeleteCharacteristic(characteristicId: string): Promise<string> {
    const query = this.createQueryBuilder('characteristic');

    try {
      await query
        .softDelete()
        .where('id = :characteristicId', { characteristicId })
        .execute();

      return '특징 삭제 완료';
    } catch (error) {
      generateError(error.message);
    }
  }
}
