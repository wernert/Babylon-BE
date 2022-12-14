import { Controller, Get, Param } from '@nestjs/common';

// 'npmwt' is path segement 
@Controller('npmwt')
export class NpmwtController {

  @Get('package')
  package(): string {
    // get file 
    // return file 
    return 'This  returns package json';
  }
  @Get('dependencies')
  dependencies(): string {
    // exec npm list or package lock
    // return file 
    return 'This dependencies action returns all dependencies';
  }

  // GET /npmwt/findAll
  @Get('findAll')
  findAll(): string {
    return 'This findAll action returns all cats';
  }
  // how to more / sub param ?
  @Get('list')
  findsecond(@Param() params: string[]) {
    return `This findsecond action returns all param #${params} cat`;
  }
  //  GET /npmwt/1 parameters at that position in the request URL !?
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This findOne action returns a #${id} cat`;
  }


}
