import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CampsiteCharacteristicService } from './campsite-characteristic.service';
import { CampsiteCharacteristicModel } from 'src/model/campsite-characteristic.model';

@ApiTags('CAMPSITE-CHARACTERISTIC')
@Controller('campsite-characteristic')
export class CampsiteCharacteristicController {
  constructor(
    private campsiteCharacteristicService: CampsiteCharacteristicService,
  ) {}

  /* 캠핑장 연결 특징 조회 */
  @ApiOperation({ summary: '캠핑장 연결 특징 조회' })
  @Get('/connect/:id')
  GetCampsiteCharacteristic(
    @Param('id') id: string,
  ): Promise<CampsiteCharacteristicModel[]> {
    return this.campsiteCharacteristicService.GetCampsiteCharacteristic(id);
  }
}
