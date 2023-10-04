import { User, UserDto } from '../User';

export class GetMe {}

export class GetMeResponse {
	user!: User;
}

export class GetMeResponseDto {
	user!: UserDto;
}