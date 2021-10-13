import { Injectable } from '@angular/core';
import { CacheManagementService } from '@panjoh/nx-cache-management';
import { Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserEntity } from '../../+state/user/user.models';

export interface UserFetchedResult {
  type: 'fetched',
  user: UserEntity,
}

export interface UserNotFetchedResult {
  type: 'not-fetched',
}

export type UserResult = UserFetchedResult | UserNotFetchedResult;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private cacheManagement: CacheManagementService,
  ) {
    this.cacheManagement.createNamespace('user', 10000);
  }

  getUserForId(userId: string): Observable<UserResult> {
    return this.cacheManagement.get<UserResult>('user', userId, (stale) => {
      if (stale) {
        return timer(1000).pipe(
          map(() => ({
            type: 'fetched',
            user: {
              id: userId,
              firstName: 'John',
              lastName: 'Doe',
            },
          })),
        )
      }

      return of({type: 'not-fetched'});
    });
  }
}
