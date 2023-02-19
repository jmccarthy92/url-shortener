import { Container } from '@azure/cosmos';
import { InjectModel } from '@nestjs/azure-database';
import { from, map } from 'rxjs';
import { ShortenedUrl } from './shortenedurl.entity';
import { AppRepository } from './app.repository';
import { Logger } from '@nestjs/common';

export class AppRepositoryCosmosDB implements AppRepository {
  private logger = new Logger(this.constructor.name);

  constructor(
    @InjectModel(ShortenedUrl)
    private readonly container: Container,
  ) {}

  public get(hash: string) {
    return from(
      this.container.items
        .query<ShortenedUrl>({
          query: 'SELECT * FROM root r WHERE r.id=@id',
          parameters: [
            {
              name: '@id',
              value: hash,
            },
          ],
        })
        .fetchAll(),
    ).pipe(
      map(({ resources, requestCharge }) => {
        this.logger.verbose(`Find By Id RUs: ${requestCharge}`);
        return resources.shift().url;
      }),
    );
  }

  public put(hash: string, url: string) {
    return from(this.container.items.create({ hash, url })).pipe(
      map(({ resource, requestCharge }) => {
        this.logger.verbose(`Create RUs: ${requestCharge}`);
        return resource.url;
      }),
    );
  }
}
