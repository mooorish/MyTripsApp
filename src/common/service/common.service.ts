import { Schema } from 'mongoose';
import { MongooseService } from '../service/mongoose.service';

import debug from 'debug';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../ioc/types';

const log: debug.IDebugger = debug('app:common-service');

class CommonService {
  constructor(private mongooseService: MongooseService) {
    log('Created new instance of CommonService');
  }

  /**
   * Returns a Mongoose model for the given schema and model name. If the model doesn't exist, it will be created.
   * @param schema The Mongoose schema for the model.
   * @param modelName The name of the Mongoose model.
   * @returns The Mongoose model.
   */
  public getOrCreateModel(modelName: string, schema?: Schema) {
    let model;
    try {
      model = this.mongooseService.getMongoose().model(modelName);
    } catch (error) {
      model = this.mongooseService.getMongoose().model(modelName, schema);
    }
    return model;
  }

  getMongoose() {
    return this.mongooseService.getMongoose();
  }
}

export { CommonService };
