import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from 'apps/user/entities';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserDto, Response } from '../dto/users.dto';
import { IUserRepository } from '../interfaces/iUser.repository';

@Injectable()
export class UserRepository implements IUserRepository{
	constructor(
		@InjectRepository(UserEntity)
		private usersRepo: Repository<UserEntity>,
	) {}

	create = async (user: UserDto): Promise<Response> => {
		const response: Response<UserDto> = new Response();
		try {
			const savedUser = await this.usersRepo.save(user);
			if (!savedUser) 
				throw('Unable to fetch the data');
			response.data = savedUser;
			response.isSuccess = true;
		} catch (error) {
			response.error = error;
			response.isSuccess = false;
		}
		return response;
	}
	
	findById = async (id: string): Promise<Response> => {
		const response: Response<UserDto> = new Response();
		try {
			const user = await this.usersRepo.findOneBy({userId: id});
			if (!user) 
				throw('Unable to fetch the data');
			response.data = user;
			response.isSuccess = true;
		} catch (error) {
			response.error = error;
			response.isSuccess = false;
		}
		return response;
	}

	findAll = async (): Promise<Response> => {
		const response: Response<UserDto[]> = new Response();
		try {
			const user = await this.usersRepo.find();
			if (!user) 
				throw('Unable to fetch the data');
			response.data = user;
			response.isSuccess = true;
		} catch (error) {
			response.error = error;
			response.isSuccess = false;
		}
		return response;
	}

	findBy = async (options: FindOptionsWhere<UserDto>): Promise<Response> => {
		const response: Response<UserDto[]> = new Response();
		try {
			const user = await this.usersRepo.findBy(options);
			if (!user) 
				throw('Unable to fetch the data');
			response.data = user;
			response.isSuccess = true;
		} catch (error) {
			response.error = error;
			response.isSuccess = false;
		}
		return response;
	}

	updateById = (userId: string, user: UserDto): Promise<any> => {
		return this.usersRepo.update(userId, user);
	}

	deleteById = (userId: string): Promise<any> => {
		return this.usersRepo.softDelete(userId);
	}
}
