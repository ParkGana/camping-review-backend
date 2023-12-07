import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CampsiteService } from './campsite.service';
import { CampsiteModel } from 'src/model/campsite.model';
import { CampsiteCreateDTO } from 'src/dto/campsite-create.dto';
import { CampsiteUpdateDTO } from 'src/dto/campsite-update.dto';

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

  /* 캠핑장 정보 조회 */
  @ApiOperation({ summary: '캠핑장 정보 조회' })
  @Get('/:id')
  GetCampsiteDetail(@Param('id') id: string): Promise<CampsiteModel> {
    return this.campsiteService.GetCampsiteDetail(id);
  }

  /* 캠핑장 등록 */
  @ApiOperation({ summary: '캠핑장 등록' })
  @Post('/create')
  CreateCampsite(@Body() dto: CampsiteCreateDTO): Promise<string> {
    return this.campsiteService.CreateCampsite(dto);
  }

  /* 캠핑장 수정 */
  @ApiOperation({ summary: '캠핑장 수정' })
  @Post('/update')
  UpdateCampsite(@Body() dto: CampsiteUpdateDTO): Promise<string> {
    return this.campsiteService.UpdateCampsite(dto);
  }
}
