import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CampsiteService } from './campsite.service';
import { CampsiteModel } from 'src/model/campsite.model';

@ApiTags('CAMPSITE')
@Controller('campsite')
export class CampsiteController {
  constructor(private campsiteService: CampsiteService) {}

  /* 캠핑장 목록 조회 */
  @ApiOperation({ summary: '캠핑장 목록 조회' })
  @Get('/list/:email')
  GetCampsiteList(@Param('email') email: string): Promise<CampsiteModel[]> {
    return this.campsiteService.GetCampsiteList(email);
  }
}
