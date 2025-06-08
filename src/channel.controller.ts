import { Controller, Get, Post, Query, Body } from '@nestjs/common';

@Controller('pa/v1')
export class ChannelController {
  @Get('channelInfo')
  getInfo(@Query('token') token: string) {
    if (token === 'EXPECTED_TOKEN') {
      return {
        status: 0,
        channel: {
          id: 'co.m9asiamyanmar2',
          title: 'M9 Asia Myanmar',
          icon: 'https://imgur.com/a/valid-icon-url-0XhF0C3#wjgNuci',
          members: 2000,
          description: 'Red‑Team Test Channel',
        }
      };
    }
    return { status: 1 };
  }

  @Post('joinChannel')
  join(@Body() body: any) {
    const { channelId } = body;
    if (channelId === 'co.m9asiamyanmar2') {
      return { status: 0 };
    }
    return { status: 2 }; // failed
  }
}
