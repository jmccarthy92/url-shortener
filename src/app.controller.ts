import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('shorten')
  shorten(@Body('url') url: string): Observable<{ hash: string }> {
    return this.appService.shorten(url).pipe(map((hash) => ({ hash })));
  }

  @Get(':hash')
  @Redirect()
  retrieve(@Param('hash') hash: string) {
    return this.appService.retrieve(hash).pipe(map((url) => ({ url })));
  }
}
