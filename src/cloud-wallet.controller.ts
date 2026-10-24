/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from '@nestjs/common'; // Import the common service in the library
import { CloudWalletService } from './cloud-wallet.service'; // Import the common service in connection module
import { MessagePattern } from '@nestjs/microservices'; // Import the nestjs microservices package
import {
  IProofRequestRes,
  IGetStoredWalletInfo,
  IStoredWalletDetails,
  IConnectionInvitationResponse
} from '@credebl/common/interfaces/cloud-wallet.interface';
import { ConfigureBaseWalletDto } from './dtos/configure-base-wallet.dto';
import { BasePayloadDto } from './dtos/base-payload.dto';
import {
  AcceptProofRequestDto,
  GetProofByIdDto,
  GetProofPresentationDto
} from './dtos/accept-proof-request.dto';
import {
  AcceptOfferDto,
  BasicMessageByConnectionIdDto,
  BasicMessageDto,
  ConnectionByIdDto,
  CreateCloudWalletDidDto,
  CreateCloudWalletDto,
  CredentialByRecordIdDto,
  CredentialListDto,
  GetAllCloudWalletConnectionsDto,
  ReceiveInvitationUrlDto
} from './dtos/cloud-wallet.dto';
import { CreateConnectionDto } from './dtos/create-connection.dto';
import {
  AcceptOid4vpProofRequestDto,
  AuthorizationRequestDto,
  DecodeMdocDto,
  DecodeSdJwtDto,
  DeleteHolderCredentialDto,
  RequestCredentialDto,
  ResolveCredentialOfferDto,
  ResolveProofRequestDto
} from './dtos/oid4vc-holder.dto';

@Controller()
export class CloudWalletController {
  constructor(private readonly cloudWalletService: CloudWalletService) {}

  @MessagePattern({ cmd: 'configure-cloud-base-wallet' })
  async configureBaseWallet(configureBaseWalletPayload: ConfigureBaseWalletDto): Promise<IGetStoredWalletInfo> {
    return this.cloudWalletService.configureBaseWallet(configureBaseWalletPayload);
  }

  @MessagePattern({ cmd: 'create-connection-by-holder' })
  async createConnection(createConnection: CreateConnectionDto): Promise<IConnectionInvitationResponse> {
    return this.cloudWalletService.createConnection(createConnection);
  }

  @MessagePattern({ cmd: 'accept-proof-request-by-holder' })
  async acceptProofRequest(acceptProofRequestPayload: AcceptProofRequestDto): Promise<IProofRequestRes> {
    return this.cloudWalletService.acceptProofRequest(acceptProofRequestPayload);
  }

  @MessagePattern({ cmd: 'get-proof-by-proof-id-holder' })
  async getProofById(proofPrsentationByIdPayload: GetProofByIdDto): Promise<IProofRequestRes> {
    return this.cloudWalletService.getProofById(proofPrsentationByIdPayload);
  }

  @MessagePattern({ cmd: 'get-proof-presentation-holder' })
  async getProofPresentation(proofPresentationPayload: GetProofPresentationDto): Promise<IProofRequestRes[]> {
    return this.cloudWalletService.getProofPresentation(proofPresentationPayload);
  }

  @MessagePattern({ cmd: 'create-cloud-wallet' })
  async createConnectionInvitation(cloudWalletDetails: CreateCloudWalletDto): Promise<IStoredWalletDetails> {
    return this.cloudWalletService.createCloudWallet(cloudWalletDetails);
  }

  @MessagePattern({ cmd: 'receive-invitation-by-url' })
  async receiveInvitationByUrl(ReceiveInvitationDetails: ReceiveInvitationUrlDto): Promise<Response> {
    return this.cloudWalletService.receiveInvitationByUrl(ReceiveInvitationDetails);
  }

  @MessagePattern({ cmd: 'accept-credential-offer' })
  async acceptOffer(acceptOfferDetails: AcceptOfferDto): Promise<Response> {
    return this.cloudWalletService.acceptOffer(acceptOfferDetails);
  }

  @MessagePattern({ cmd: 'create-cloud-wallet-did' })
  async createDid(createDidDetails: CreateCloudWalletDidDto): Promise<Response> {
    return this.cloudWalletService.createDid(createDidDetails);
  }

  @MessagePattern({ cmd: 'cloud-wallet-did-list' })
  async getDidList(walletDetails: BasePayloadDto): Promise<IProofRequestRes[]> {
    return this.cloudWalletService.getDidList(walletDetails);
  }

  @MessagePattern({ cmd: 'get-cloud-wallet-connection-by-id' })
  async getconnectionById(connectionDetails: ConnectionByIdDto): Promise<Response> {
    return this.cloudWalletService.getconnectionById(connectionDetails);
  }

  @MessagePattern({ cmd: 'get-all-cloud-wallet-connections-list-by-id' })
  async getAllconnectionById(connectionDetails: GetAllCloudWalletConnectionsDto): Promise<Response> {
    return this.cloudWalletService.getAllconnectionById(connectionDetails);
  }

  @MessagePattern({ cmd: 'wallet-credential-by-id' })
  async getCredentialList(tenantDetails: CredentialListDto): Promise<Response> {
    return this.cloudWalletService.getCredentialListById(tenantDetails);
  }

  @MessagePattern({ cmd: 'wallet-credential-by-record-id' })
  async getCredentialByCredentialRecordId(credentialDetails: CredentialByRecordIdDto): Promise<Response> {
    return this.cloudWalletService.getCredentialByRecord(credentialDetails);
  }

  @MessagePattern({ cmd: 'basic-message-list-by-connection-id' })
  async getBasicMessageByConnectionId(connectionDetails: BasicMessageByConnectionIdDto): Promise<Response> {
    return this.cloudWalletService.getBasicMessageByConnectionId(connectionDetails);
  }

  @MessagePattern({ cmd: 'send-basic-message' })
  async sendBasicMessage(messageDetails: BasicMessageDto): Promise<Response> {
    return this.cloudWalletService.sendBasicMessage(messageDetails);
  }

  @MessagePattern({ cmd: 'holder-sd-jwt-credentials' })
  async getSdJwtCredentials(holderDetails: BasePayloadDto): Promise<Response> {
    return this.cloudWalletService.getSdJwtCredentials(holderDetails);
  }

  @MessagePattern({ cmd: 'holder-mdoc-credentials' })
  async getMdocCredentials(holderDetails: BasePayloadDto): Promise<Response> {
    return this.cloudWalletService.getMdocCredentials(holderDetails);
  }

  @MessagePattern({ cmd: 'holder-w3c-credentials' })
  async getW3cCredentials(holderDetails: BasePayloadDto): Promise<Response> {
    return this.cloudWalletService.getW3cCredentials(holderDetails);
  }

  @MessagePattern({ cmd: 'holder-decode-mdoc' })
  async decodeMdoc(decodeMdocDetails: DecodeMdocDto): Promise<Response> {
    return this.cloudWalletService.decodeMdoc(decodeMdocDetails);
  }

  @MessagePattern({ cmd: 'holder-decode-sdjwt' })
  async decodeSdJwt(decodeSdJwtDetails: DecodeSdJwtDto): Promise<Response> {
    return this.cloudWalletService.decodeSdJwt(decodeSdJwtDetails);
  }

  @MessagePattern({ cmd: 'holder-delete-credential' })
  async deleteHolderCredential(deleteCredentialDetails: DeleteHolderCredentialDto): Promise<Response> {
    return this.cloudWalletService.deleteHolderCredential(deleteCredentialDetails);
  }

  @MessagePattern({ cmd: 'oid4vc-holder-resolve-credential-offer' })
  async resolveCredentialOffer(resolveCredentialOfferDetails: ResolveCredentialOfferDto): Promise<Response> {
    return this.cloudWalletService.resolveCredentialOffer(resolveCredentialOfferDetails);
  }

  @MessagePattern({ cmd: 'oid4vc-holder-authorization-request' })
  async authorizationRequest(authorizationRequestDetails: AuthorizationRequestDto): Promise<Response> {
    return this.cloudWalletService.authorizationRequest(authorizationRequestDetails);
  }

  @MessagePattern({ cmd: 'oid4vc-holder-request-credential' })
  async requestCredential(requestCredentialDetails: RequestCredentialDto): Promise<Response> {
    return this.cloudWalletService.requestCredential(requestCredentialDetails);
  }

  @MessagePattern({ cmd: 'oid4vc-holder-resolve-proof-request' })
  async resolveProofRequest(resolveProofRequestDetails: ResolveProofRequestDto): Promise<Response> {
    return this.cloudWalletService.resolveProofRequest(resolveProofRequestDetails);
  }

  @MessagePattern({ cmd: 'oid4vc-holder-accept-proof-request' })
  async acceptProofRequestOid4vc(acceptProofRequestDetails: AcceptOid4vpProofRequestDto): Promise<Response> {
    return this.cloudWalletService.acceptProofRequestOid4vc(acceptProofRequestDetails);
  }
}
