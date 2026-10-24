import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IsHostPortOrDomain } from '@credebl/common/cast.helper';
import { BasePayloadDto } from './base-payload.dto';

export class ConfigureBaseWalletDto extends BasePayloadDto {
  @ApiProperty({ example: 'xxx-xxxx-xxxx' })
  @IsString({ message: 'walletKey must be a string' })
  @IsNotEmpty({ message: 'please provide valid walletKey' })
  walletKey: string;

  @ApiProperty({ example: 'xxx-xxxx-xxxx' })
  @IsString({ message: 'apiKey must be a string' })
  @IsNotEmpty({ message: 'please provide valid apiKey' })
  apiKey: string;

  @ApiProperty({ example: 'https://0.0.0.0:4001' })
  @IsString({ message: 'agentEndpoint must be a string' })
  @IsNotEmpty({ message: 'please provide valid agentEndpoint' })
  @IsHostPortOrDomain({ message: 'Agent Endpoint must be a valid protocol://host:port or domain' })
  agentEndpoint: string;
}
