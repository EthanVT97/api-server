// src/app.module.ts
import { Module } from '@nestjs/common';
import { BotsController } from './bots/bots.controller';

@Module({
  imports: [],
  controllers: [BotsController],
  providers: [],
})
export class AppModule {}
