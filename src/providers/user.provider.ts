import { Inject } from "@nestjs/common";
import { FindOptionsWhere } from "typeorm";
import { INTERFACE_ENUM } from "../constants/enum";
import { UserDto, Response } from "../dto/users.dto";
import { IUserProvider } from "../interfaces/iUser.provider";
import { IUserRepository } from "../interfaces/iUser.repository";

export class UserProvider implements IUserProvider {
    constructor(
        @Inject(INTERFACE_ENUM.IUSER_REPOSITORY)
        private readonly _userRepo: IUserRepository
    ) {}

    create = async (user: UserDto): Promise<Response> => {
		return await this._userRepo.create(user);
	}
	
	findById = async (userId: string): Promise<Response> => {
		return await this._userRepo.findById(userId);
	}

	findAll = async (): Promise<Response> => {
		return await this._userRepo.findAll();
	}

	findBy = async (options: FindOptionsWhere<UserDto>): Promise<Response> => {
		return await this._userRepo.findBy(options);
	}

	updateById = (userId: string, user: UserDto): Promise<any> => {
		return this._userRepo.updateById(userId, user);
	}

	deleteById = (userId: string): Promise<any> => {
		return this._userRepo.deleteById(userId);
	}
}