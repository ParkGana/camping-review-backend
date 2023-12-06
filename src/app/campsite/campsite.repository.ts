import { generateError } from 'error.config';
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
}
