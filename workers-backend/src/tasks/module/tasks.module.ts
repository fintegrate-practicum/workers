import { Module, forwardRef } from '@nestjs/common';
import { TasksService } from '../service/tasks.service';
import { TasksController } from '../controller/tasks.controller';
import { Task, TaskSchema } from 'src/schemas/task.entity';
import { RabbitPublisherService } from 'src/rabbit-publisher/rabbit-publisher.service';
import { User, UserSchema } from 'src/schemas/user.entity';
import { WorkersService } from 'src/worker/services/workers.service';
import { Employee, EmployeeSchema } from 'src/schemas/employee.entity';
import { UsersService } from 'src/user/services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/user/module/users.module';
// import { UsersServiceFactory } from 'src/user/services/users.service.factory';

// // @Module({
// //   imports: [
// //     MongooseModule.forFeature([
// //       { name: Task.name, schema: TaskSchema },
// //       { name: User.name, schema: UserSchema },
// //       { name: Employee.name, schema: EmployeeSchema },
// //     ]),
// //     UsersModule,
// //   ],

// //   providers: [
// //     TasksService,
// //     RabbitPublisherService,
// //     WorkersService,
// //     UsersService,

// //   ],
// //   controllers: [TasksController],
// // })
// // export class TasksModule {}

// // @Module({
// //   imports: [
// //     MongooseModule.forFeature([
// //       { name: Task.name, schema: TaskSchema },
// //       { name: User.name, schema: UserSchema },
// //       { name: Employee.name, schema: EmployeeSchema },
// //     ]),
// //     UsersModule,
// //   ],
// //   providers: [
// //     TasksService,
// //     RabbitPublisherService,
// //     WorkersService,
// //     {
// //       provide: UsersService,
// //       useFactory: (forwardRef: () => UsersService) => new UsersService(forwardRef()),
// //       inject: [forwardRef(() => UsersService)], // Inject forward reference of UsersService
// //     },
// //   ],
// //   controllers: [TasksController],
// // })
// // export class TasksModule {}
// // tasks/tasks.module.ts

// // import { Module } from '@nestjs/common';
// // import { TasksService } from './tasks.service';
// // import { TasksController } from './tasks.controller';

// @Module({
//   imports: [
//     // ... ייבואים אחרים ...
//   ],
//   providers: [
//     TasksService,
//     {

//       provide: UsersService,
//       useFactory: (app: any) => {
//         return app.get(UsersServiceFactory).createUsersService();
//       },
//       inject: [UsersServiceFactory],
//     },

//   ],
//   exports: [TasksService],
//   controllers: [TasksController],
// })
// export class TasksModule {}

// import { Module } from '@nestjs/common';
// import { TasksService } from '../service/tasks.service';
// import { TasksController } from '../controller/tasks.controller';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Task, TaskSchema } from 'src/schemas/task.entity';
// import { CreateTaskDto } from 'src/dto/createTask.dto';
// import { UsersService } from 'src/user/services/users.service';
// import { RabbitPublisherService } from 'src/rabbit-publisher/rabbit-publisher.service';
// import { UsersModule } from 'src/user/module/users.module';
// import { WorkersService } from 'src/worker/workers.service';

@Module({
  imports: [
    UsersModule,
    // MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: User.name, schema: UserSchema },
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  providers: [
    TasksService,
    Task,
    UsersService,
    RabbitPublisherService,
    WorkersService,
    // UsersModule
  ],
  controllers: [TasksController],
})
export class TasksModule {}
