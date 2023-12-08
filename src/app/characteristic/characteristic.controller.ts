import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CharacteristicService } from './characteristic.service';
import { CharacteristicModel } from 'src/model/characteristic.model';
import { CharacteristicCreateDTO } from 'src/dto/characteristic-create.dto';

@ApiTags('CHARACTERISTIC')
@Controller('characteristic')
export class CharacteristicController {
  constructor(private characteristicService: CharacteristicService) {}

  /* 특징 목록 조회 */
  @ApiOperation({ summary: '특징 목록 조회' })
  @Get('/list/:email')
  GetCharacteristicList(
    @Param('email') email: string,
  ): Promise<CharacteristicModel[]> {
    return this.characteristicService.GetCharacteristicList(email);
  }

  /* 특징 등록 */
  @ApiOperation({ summary: '특징 등록' })
  @Post('/create')
  CreateCampsite(@Body() dto: CharacteristicCreateDTO): Promise<string> {
    return this.characteristicService.CreateCharacteristic(dto);
  }
}
