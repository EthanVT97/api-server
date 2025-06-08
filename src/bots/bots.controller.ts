import { Controller, Post, Body } from '@nestjs/common';

@Controller('pa/v1')
export class BotsController {
  @Post('botProfile')
  getBotProfile(@Body() body: any) {
    const { chatUri } = body;

    if (chatUri === '555mix') {
      return {
        status: 0,
        chat: {
          id: 'pa:555666777',
          name: '555MixBot',
          icon: 'https://imgur.com/a/valid-icon-url-0XhF0C3#wjgNuci',
          background: '#101010',
          category: 'Security',
          members: 1337,
        },
      };
    }

    return { status: 1 }; // Bot not found
  }
}
