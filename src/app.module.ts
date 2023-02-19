import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppRepositoryTag } from './app.repository';
import { AppService } from './app.service';
import { AppRepositoryRedis } from './app.repository.redis';
import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { ShortenedUrl } from './shortenedurl.entity';

@Module({
  imports: [
    AzureCosmosDbModule.forRoot({
      dbName: process.env.AZURE_COSMOS_DB_NAME || 'shortenedurl',
      endpoint: process.env.AZURE_COSMOS_DB_ENDPOINT || '',
      key: process.env.AZURE_COSMOS_DB_KEY || '',
    }),
    AzureCosmosDbModule.forFeature([{ dto: ShortenedUrl }]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: AppRepositoryTag, useClass: AppRepositoryRedis },
  ],
})
export class AppModule {}
