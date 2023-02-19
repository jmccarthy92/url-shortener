import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { AppRepositoryTag } from './app.repository';
import { AppRepositoryHashMap } from './app.repository.hashmap';
import { mergeMap, tap } from 'rxjs';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        { provide: AppRepositoryTag, useClass: AppRepositoryHashMap },
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('retrieve', () => {
    it('should retrieve the saved URL', (done) => {
      const url = 'docker.com';
      appService
        .shorten(url)
        .pipe(mergeMap((hash) => appService.retrieve(hash)))
        .pipe(tap((retrieved) => expect(retrieved).toEqual(url)))
        .subscribe({ complete: done });
    });
  });
});
