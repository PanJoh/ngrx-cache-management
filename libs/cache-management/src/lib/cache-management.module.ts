import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCacheTag from './+state/cache-tag.reducer';
import { CacheTagEffects } from './+state/cache-tag.effects';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([CacheTagEffects]),
  ],
})
export class CacheManagementModule {}
