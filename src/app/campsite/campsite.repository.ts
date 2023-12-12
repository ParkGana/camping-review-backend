import { generateError } from 'error.config';
import { CampsiteCreateDTO } from 'src/dto/campsite-create.dto';
import { CampsiteUpdateDTO } from 'src/dto/campsite-update.dto';
import { CampsiteEntity } from 'src/entity/campsite.entity';
import { CampsiteModel } from 'src/model/campsite.model';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CampsiteEntity)
export class CampsiteRepository extends Repository<CampsiteEntity> {
  /* 캠핑장 목록 조회 */
  async GetCampsiteList(
    email: string,
    connectionEmail: string,
  ): Promise<CampsiteModel[]> {
    const query = this.createQueryBuilder('campsite');

    try {
      const campsiteList = await query
        .innerJoinAndSelect('campsite.user', 'user')
        .where('user.email IN (:userEmail, :connectionEmail)', {
          userEmail: email,
          connectionEmail: connectionEmail,
        })
        .orderBy('campsite.name', 'ASC')
        .getMany();

      return campsiteList.map((v) => new CampsiteModel(v));
    } catch (error) {
      generateError(error.message);
    }
  }

  /* 캠핑장 정보 조회 */
  async GetCampsiteDetail(id: string): Promise<CampsiteModel> {
    const query = this.createQueryBuilder('campsite');

    try {
      const campsite = await query
        .innerJoinAndSelect('campsite.user', 'user')
        .where('campsite.id = :campsiteId', { campsiteId: id })
        .getOne();

      return new CampsiteModel(campsite);
    } catch (error) {
      generateError(error.message);
    }
  }

  /* 캠핑장 등록 */
  async CreateCampsite(dto: CampsiteCreateDTO): Promise<string> {
    const query = this.createQueryBuilder('campsite');

    try {
      const campsite = await (
        await query
          .insert()
          .values({
            name: dto.name,
            address: dto.address,
            inTime: dto.inTime,
            outTime: dto.outTime,
            type: dto.type,
            feeling: dto.feeling,
            user: { email: dto.userEmail },
          })
          .returning('*')
          .execute()
      ).raw[0];

      return campsite.id;
    } catch (error) {
      generateError(error.message);
    }
  }

  /* 캠핑장 수정 */
  async UpdateCampsite(dto: CampsiteUpdateDTO): Promise<string> {
    const query = this.createQueryBuilder('campsite');

    try {
      await query
        .update()
        .set({
          name: dto.name,
          address: dto.address,
          inTime: dto.inTime,
          outTime: dto.outTime,
          type: dto.type,
          feeling: dto.feeling,
        })
        .where('id = :campsiteId', { campsiteId: dto.campsiteId })
        .execute();

      return '캠핑장 수정 완료';
    } catch (error) {
      generateError(error.message);
    }
  }

  /* 캠핑장 삭제 */
  async DeleteCampsite(campsiteId: string): Promise<string> {
    const query = this.createQueryBuilder('campsite');

    try {
      await query
        .softDelete()
        .where('id = :campsiteId', { campsiteId })
        .execute();

      return '캠핑장 삭제 완료';
    } catch (error) {
      generateError(error.message);
    }
  }
}
