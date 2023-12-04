import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'camping-review.c9xrbbirblkk.ap-northeast-2.rds.amazonaws.com',
  port: 5432,
  username: 'postgres',
  password: '123456a!',
  database: 'camping_review',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true, // 데이터 손실이 발생할 수 있기 때문에, 실서버일 경우 false로 설정
};
