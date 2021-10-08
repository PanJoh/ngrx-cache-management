import { Component, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { loadUser, loadUsersSuccess, loadUserSuccess, notifyUserLoaded } from './+state/user/user.actions';
import { UserEntity } from './+state/user/user.models';
import { getSelectedUser } from './+state/user/user.selectors';

@Component({
  selector: 'ngrx-cache-management-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  user?: UserEntity;
  userId: string = '';
  fetchUserInfo: string = '';
  destroyed$ = new Subject<void>();
  fetchUserStart = 0;

  constructor(
    private store: Store,
    private actions$: Actions,
  ) {}

  ngOnInit() {
    this.store.pipe(
      select(getSelectedUser),
      takeUntil(this.destroyed$),
    )
    .subscribe(user => this.user = user);

    this.actions$.pipe(
      ofType(loadUser),
      takeUntil(this.destroyed$),
    ).subscribe(() =>{
      this.fetchUserStart = Date.now();
      this.fetchUserInfo = 'user if beeing fetched...';
    });

    this.actions$.pipe(
      ofType(notifyUserLoaded),
      takeUntil(this.destroyed$),
    ).subscribe(() => {
      const elapsed = Date.now() - this.fetchUserStart;
      this.fetchUserInfo = `user fetched after ${elapsed}ms`;
    })
  }



  fetchUser() {
    this.store.dispatch(loadUser({id: this.userId, selectIt: true}));
  }
}
