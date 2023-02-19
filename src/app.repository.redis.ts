import { RedisClientType } from '@redis/client';
import { createClient } from 'redis';
import { from, mergeMap, Observable } from 'rxjs';
import { AppRepository } from './app.repository';

export class AppRepositoryRedis implements AppRepository {
  private readonly client: RedisClientType;

  public constructor() {
    const host = process.env.REDIS_HOST || 'redis';
    const port = +process.env.REDIS_PORT || 6379;
    this.client = createClient({
      url: `redis://${host}:${port}`,
    });
    from(this.client.connect()).subscribe({ error: console.error });
    this.client.on('connect', this.onConnect);
    this.client.on('error', console.error);
  }

  private onConnect() {
    console.log('Redis connected.');
  }

  public get(hash: string): Observable<string> {
    return from(this.client.get(hash));
  }

  public put(hash: string, url: string): Observable<string> {
    return from(this.client.set(hash, url)).pipe(
      mergeMap(() => from(this.client.get(hash))),
    );
  }
}
