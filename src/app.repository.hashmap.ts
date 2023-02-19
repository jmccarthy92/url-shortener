import { AppRepository } from './app.repository';
import { Observable, of } from 'rxjs';

export class AppRepositoryHashMap implements AppRepository {
  public constructor(
    private readonly map: Map<string, string> = new Map<string, string>(),
  ) {}

  public get(hash: string): Observable<string> {
    return of(this.map.get(hash));
  }

  public put(hash: string, url: string): Observable<string> {
    return of(this.map.set(hash, url).get(hash));
  }
}
