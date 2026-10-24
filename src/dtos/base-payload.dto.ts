import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

/**
 * Every cloud-wallet NATS payload carries the authenticated caller's identity
 * (injected server-side by the caller from the verified JWT). Validation makes
 * the identity pair mandatory on every command.
 */
export class BasePayloadDto {
  @IsUUID(undefined, { message: 'userId must be a valid UUID' })
  @IsNotEmpty({ message: 'userId is required' })
  userId: string;

  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsNotEmpty({ message: 'email is required' })
  email: string;
}
