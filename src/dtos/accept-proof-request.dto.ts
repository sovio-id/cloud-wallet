import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { BasePayloadDto } from './base-payload.dto';

export class AcceptProofRequestDto extends BasePayloadDto {
  @ApiProperty({ example: '4e687079-273b-447b-b9dd-9589c84dc6dd' })
  @IsString({ message: 'proofRecordId must be a string' })
  @IsNotEmpty({ message: 'please provide valid proofRecordId' })
  @IsUUID()
  proofRecordId: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean({ message: 'filterByPresentationPreview must be a boolean' })
  filterByPresentationPreview?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean({ message: 'filterByNonRevocationRequirements must be a boolean' })
  filterByNonRevocationRequirements?: boolean;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsString({ message: 'comment must be a string' })
  comment?: string;
}

export class GetProofByIdDto extends BasePayloadDto {
  @ApiProperty({ example: '4e687079-273b-447b-b9dd-9589c84dc6dd' })
  @IsNotEmpty({ message: 'proofRecordId is required' })
  @IsString({ message: 'proofRecordId must be a string' })
  proofRecordId: string;
}

export class GetProofPresentationDto extends BasePayloadDto {
  @ApiPropertyOptional({ example: '4e687079-273b-447b-b9dd-9589c84dc6dd' })
  @IsOptional()
  @IsString({ message: 'threadId must be a string' })
  threadId?: string;
}
