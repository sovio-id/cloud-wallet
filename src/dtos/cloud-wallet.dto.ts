/* DTOs ported from credebl/platform apps/api-gateway/src/cloud-wallet/dtos.
 * Divergences from the gateway originals (see VENDORED.md):
 *  - identity (userId/email) moved to BasePayloadDto and made mandatory/validated
 *  - @Transform(trim) removed from non-string fields (trim() returns undefined
 *    for non-strings, which would null-out booleans/numbers)
 *  - previously undecorated fields decorated so ValidationPipe whitelist keeps them
 */
import { IsBoolean, IsInt, IsNotEmpty, IsObject, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotSQLInjection, trim } from '@credebl/common/cast.helper';
import { Transform } from 'class-transformer';
import { BasePayloadDto } from './base-payload.dto';

export class CreateCloudWalletDto extends BasePayloadDto {
  @ApiProperty({ example: 'Credential Wallet', description: 'Cloud wallet label' })
  @IsString({ message: 'label must be a string' })
  @IsNotEmpty({ message: 'please provide valid label' })
  @Transform(({ value }) => trim(value))
  @IsNotSQLInjection({ message: 'label is required.' })
  label: string;

  @ApiProperty({ example: 'https://picsum.photos/200', description: 'Connection image URL' })
  @IsString({ message: 'Image URL must be a string' })
  @IsOptional()
  @IsNotEmpty({ message: 'please provide valid image URL' })
  @Transform(({ value }) => trim(value))
  @IsNotSQLInjection({ message: 'Image URL is required.' })
  connectionImageUrl?: string;
}

export class ReceiveInvitationUrlDto extends BasePayloadDto {
  @ApiPropertyOptional()
  @IsString({ message: 'alias must be a string' })
  @IsOptional()
  @IsNotEmpty({ message: 'please provide valid alias' })
  @Transform(({ value }) => trim(value))
  @IsNotSQLInjection({ message: 'alias is required.' })
  alias?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'label must be a string' })
  @IsOptional()
  @IsNotEmpty({ message: 'please provide valid label' })
  @Transform(({ value }) => trim(value))
  @IsNotSQLInjection({ message: 'label is required.' })
  label?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'Image URL must be a string' })
  @IsOptional()
  @IsNotEmpty({ message: 'please provide valid image URL' })
  @Transform(({ value }) => trim(value))
  @IsNotSQLInjection({ message: 'Image URL is required.' })
  imageUrl?: string;

  @ApiPropertyOptional()
  @IsBoolean({ message: 'autoAcceptConnection must be a boolean' })
  @IsOptional()
  autoAcceptConnection?: boolean;

  @ApiPropertyOptional()
  @IsBoolean({ message: 'autoAcceptInvitation must be a boolean' })
  @IsOptional()
  autoAcceptInvitation?: boolean;

  @ApiPropertyOptional()
  @IsBoolean({ message: 'reuseConnection must be a boolean' })
  @IsOptional()
  reuseConnection?: boolean;

  @ApiPropertyOptional()
  @IsInt({ message: 'acceptInvitationTimeoutMs must be an integer' })
  @IsOptional()
  acceptInvitationTimeoutMs?: number;

  @ApiPropertyOptional()
  @IsString({ message: 'ourDid must be a string' })
  @IsOptional()
  @IsNotEmpty({ message: 'please provide valid ourDid' })
  @Transform(({ value }) => trim(value))
  @IsNotSQLInjection({ message: 'ourDid is required.' })
  ourDid?: string;

  @ApiProperty()
  @IsString({ message: 'invitationUrl must be a string' })
  @IsNotEmpty({ message: 'please provide valid invitationUrl' })
  @Transform(({ value }) => trim(value))
  @IsNotSQLInjection({ message: 'invitationUrl is required.' })
  invitationUrl: string;
}

export class AcceptOfferDto extends BasePayloadDto {
  @ApiPropertyOptional({
    example: 'always',
    description: 'autoAcceptCredential',
    enum: ['always', 'contentApproved', 'never']
  })
  @Transform(({ value }) => trim(value))
  @IsString({ message: 'autoAcceptCredential must be a string' })
  autoAcceptCredential: string;

  @ApiPropertyOptional({ example: 'string', description: 'Comment' })
  @Transform(({ value }) => trim(value))
  @IsString({ message: 'comment must be a string' })
  @IsOptional()
  comment?: string;

  @ApiProperty({ example: 'string', description: 'Credential record ID' })
  @Transform(({ value }) => trim(value))
  @IsString({ message: 'credentialRecordId must be a string' })
  credentialRecordId: string;

  @ApiProperty({ type: Object, description: 'Credential formats' })
  @IsObject({ message: 'credentialFormats must be an object' })
  @IsOptional()
  credentialFormats?: object;
}

export class CreateCloudWalletDidDto extends BasePayloadDto {
  @ApiPropertyOptional({ example: '000000000000000000000000000Seed1' })
  @MaxLength(32, { message: 'seed must be at most 32 characters.' })
  @Transform(({ value }) => trim(value))
  @IsOptional()
  @IsString({ message: 'seed must be in string format.' })
  @Matches(/^\S*$/, {
    message: 'Spaces are not allowed in seed'
  })
  seed?: string;

  @ApiProperty({ example: 'ed25519' })
  @IsNotEmpty({ message: 'key type is required' })
  @Transform(({ value }) => trim(value))
  @IsString({ message: 'key type be in string format.' })
  keyType: string;

  @ApiProperty({ example: 'indy' })
  @IsNotEmpty({ message: 'method is required' })
  @Transform(({ value }) => trim(value))
  @IsString({ message: 'method must be in string format.' })
  method: string;

  @ApiPropertyOptional({ example: 'bcovrin:testnet' })
  @IsOptional()
  @Transform(({ value }) => trim(value))
  @IsString({ message: 'network must be in string format.' })
  network?: string;

  @ApiPropertyOptional({ example: 'www.github.com' })
  @IsOptional()
  @Transform(({ value }) => trim(value))
  @IsString({ message: 'domain must be in string format.' })
  domain?: string;

  @ApiPropertyOptional({ example: 'endorser' })
  @IsOptional()
  @Transform(({ value }) => trim(value))
  @IsString({ message: 'role must be in string format.' })
  role?: string;

  @ApiPropertyOptional({ example: '651727dab6dfdbb4f18afff5f368d13b0dca41fd26bd5e1c7953457524d645e6' })
  @IsOptional()
  @IsString({ message: 'private key must be in string format.' })
  @Transform(({ value }) => trim(value))
  privatekey?: string;

  @ApiPropertyOptional({ example: 'http://localhost:6006/docs' })
  @IsOptional()
  @IsString({ message: 'endpoint must be in string format.' })
  endpoint?: string;

  @ApiPropertyOptional({ example: 'XzFjo1RTZ2h9UVFCnPUyaQ' })
  @IsOptional()
  @Transform(({ value }) => trim(value))
  @IsString({ message: 'did must be in string format.' })
  did?: string;

  @ApiPropertyOptional({ example: 'did:indy:bcovrin:testnet:UEeW111G1tYo1nEkPwMcF' })
  @IsOptional()
  @Transform(({ value }) => trim(value))
  @IsString({ message: 'endorser did must be in string format.' })
  endorserDid?: string;
}

export class CredentialListDto extends BasePayloadDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  threadId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  connectionId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  state?: string;
}

export class GetAllCloudWalletConnectionsDto extends BasePayloadDto {
  @ApiProperty({ required: false, example: 'e315f30d-9beb-4068-aea4-abb5fe5eecb1' })
  @IsString()
  @IsOptional()
  outOfBandId?: string;

  @ApiProperty({ required: false, example: 'Test' })
  @IsString()
  @IsOptional()
  alias?: string;

  @ApiProperty({ required: false, example: 'did:example:e315f30d-9beb-4068-aea4-abb5fe5eecb1' })
  @IsString()
  @IsOptional()
  myDid?: string;

  @ApiProperty({ required: false, example: 'did:example:e315f30d-9beb-4068-aea4-abb5fe5eecb1' })
  @IsString()
  @IsOptional()
  theirDid?: string;

  @ApiProperty({ required: false, example: 'Bob' })
  @IsString()
  @IsOptional()
  theirLabel?: string;
}

export class BasicMessageDto extends BasePayloadDto {
  @ApiProperty({ example: 'Message' })
  @IsNotEmpty({ message: 'content is required' })
  @Transform(({ value }) => trim(value))
  @IsString({ message: 'content should be in string format.' })
  content: string;

  @IsNotEmpty({ message: 'connectionId is required' })
  @IsString({ message: 'connectionId must be a string' })
  connectionId: string;
}

export class ConnectionByIdDto extends BasePayloadDto {
  @IsNotEmpty({ message: 'connectionId is required' })
  @IsString({ message: 'connectionId must be a string' })
  connectionId: string;
}

export class BasicMessageByConnectionIdDto extends BasePayloadDto {
  @IsNotEmpty({ message: 'connectionId is required' })
  @IsString({ message: 'connectionId must be a string' })
  connectionId: string;
}

export class CredentialByRecordIdDto extends BasePayloadDto {
  @IsNotEmpty({ message: 'credentialRecordId is required' })
  @IsString({ message: 'credentialRecordId must be a string' })
  credentialRecordId: string;
}
