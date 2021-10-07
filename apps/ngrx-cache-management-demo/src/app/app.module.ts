import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUser from './+state/user/user.reducer';
import { UserEffects } from './+state/user/user.effects';
import { reducer as cacheManagementReducer, CACHE_TAG_FEATURE_KEY, CacheManagementModule } from '@PanJoh/nx-cache-management';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CacheManagementModule,
    StoreModule.forRoot({
      [CACHE_TAG_FEATURE_KEY]: cacheManagementReducer,
      [fromUser.USER_FEATURE_KEY]: fromUser.reducer,
    }),
    StoreModule.forFeature(fromUser.USER_FEATURE_KEY, fromUser.reducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
