import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
  describe('AppController', () => {
    let appController: AppController;
  
    beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
        controllers: [AppController],
        providers: [AppService],
      }).compile();
  
      appController = app.get<AppController>(AppController);
    });
  
    describe('root', () => {
      it('should return "Hello World!"', () => {
        expect(appController.getHello()).toBe('Hello World!');
      });
    });
  
    describe('printMessage', () => {
      it('should print "Test message"', () => {
        const spy = jest.spyOn(console, 'log');
        appController.printMessage();
        expect(spy).toHaveBeenCalledWith('Test message');
      });
    });
  });
  
});
