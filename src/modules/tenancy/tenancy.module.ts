import { Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request as ExpressRequest } from 'express';
import { DATASOURCE } from './tenancy.symbols';
import { getTenantDataSource } from '@wanin/utils/tenancy.utils';

const dataSourceFactory = {
  provide: DATASOURCE,
  scope: Scope.REQUEST,
  useFactory: (request: ExpressRequest) => {
    const { activitySlug } = request;
    return getTenantDataSource(activitySlug);
  },
  inject: [REQUEST],
};

@Global()
@Module({
  providers: [dataSourceFactory],
  exports: [DATASOURCE],
})
export class TenancyModule {}
