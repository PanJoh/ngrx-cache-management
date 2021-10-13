import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCacheTag from './+state/cache-tag.reducer';
import { CacheTagEffects } from './+state/cache-tag.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromCacheTag.CACHE_TAG_FEATURE_KEY, fromCacheTag.reducer),
    EffectsModule.forFeature([CacheTagEffects]),
  ],
})
export class CacheManagementModule {}
