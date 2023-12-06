import { generateError } from 'error.config';
import { CreateCampsiteDTO } from 'src/dto/create-campsite.dto';
import { CampsiteEntity } from 'src/entity/campsite.entity';
import { CampsiteModel } from 'src/model/campsite.model';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CampsiteEntity)
export class CampsiteRepository extends Repository<CampsiteEntity> {
  /* 캠프장 목록 조회 */
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

  /* 캠프장 등록 */
  async CreateCampsite(dto: CreateCampsiteDTO): Promise<string> {
    const query = this.createQueryBuilder('campsite');

    try {
      await query
        .insert()
        .values({
          name: dto.name,
          address: dto.address,
          feeling: dto.feeling,
          inTime: dto.inTime,
          outTime: dto.outTime,
          user: { email: dto.userEmail },
        })
        .execute();

      return '캠핑장 등록 완료';
    } catch (error) {
      generateError(error.message);
    }
  }
}
