import { Test } from '@nestjs/testing';

import { LinksModule } from '../links.module';
import { LinksService } from '../links.service';
import { getModelToken } from '@nestjs/mongoose';

import mongoose from 'mongoose';
import { LinksHasId, Links, LinksQuery } from '../interface/links.interface';

describe('link', () => {
  let linksService: LinksService;

  // function mockRepository() {
  //   const paginate = () => ({});
  //   const findByIdAndUpdate = () => ({});
  //   const findByIdAndRemove = () => ({});
  //   return {

  //   }
  // }

  // tslint:disable-next-line:class-name
  class mockRepository {
    public static paginate() {
      return {};
    }
    public static findByIdAndUpdate() {
      return {};
    }
    public static findByIdAndRemove() {
      return {};
    }

    public save() {
      return {};
    }
  }

  mockRepository.prototype.save = () => ({});

  // const mockRepository = {

  // };
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [LinksModule]
    })
      .overrideProvider(getModelToken('Links'))
      .useValue(mockRepository)
      .compile();

    linksService = module.get<LinksService>(LinksService);
  });

  it('createLink', async () => {
    const obj = {} as Links;
    const res = await linksService.createLink(obj);
    expect(res).toMatchObject(new mockRepository().save());
  });

  it('searchLink', async () => {
    const obj = {} as LinksQuery;
    const res = await linksService.searchLink(obj);
    expect(res).toMatchObject(mockRepository.paginate());
  });

  it('updateLink', async () => {
    const obj = {} as LinksHasId;
    const res = await linksService.updateLink(obj);
    expect(res).toMatchObject(mockRepository.findByIdAndUpdate());
  });

  it('deleteLink', async () => {
    const res = await linksService.deleteLink('12345');
    expect(res).toMatchObject(mockRepository.findByIdAndRemove());
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
