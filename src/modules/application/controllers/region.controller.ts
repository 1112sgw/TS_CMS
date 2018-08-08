import { Controller, Get, Post, Patch, Delete, Param, Req, Res, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegionService } from '../services/region.service';

@UseGuards(AuthGuard('jwt', {session: true}))
@Controller('api/regions')
export class RegionController {
  constructor(private readonly RegionService: RegionService) {}

  @Get()
  async getRegions(@Req() req, @Res() res) {
    const regionList = await this.RegionService.getRegions();
    return await res.json({
      code: 200,
      timestamp: new Date().toISOString(),
      data: regionList,
    });
  }
}
