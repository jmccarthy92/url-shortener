import { CosmosPartitionKey } from '@nestjs/azure-database';

@CosmosPartitionKey('id')
export class ShortenedUrl {
  id?: string;
  url: string;
}
