export interface ICreateProposalContract {
  title: string;
  description: string;
  endDate: number;
}

export interface IProposalContract {
  appId: string;
  asaId: string;
  title: string;
  description: string;
  startDate: number;
  endDate: number;
  creator: string;
  ongoing: true;
  registeredVoters: string[];
  yesVotes: string[];
  noVotes: string[];
}

export interface ICreateProposalContractApi {
  title: string;
  description: string;
  endDate: number;
  appId: string;
  startDate: number;
  creator: string;
}

export interface ValidateWalletAddressResponse {
  valid: boolean;
  address: string;
  assetId: string;
}

export interface IBootstrapProposalDto {
  asaId: string;
  appId: string;
}

export interface IVoteProposalDto {
  vote: boolean;
  voterAddress: string;
  appId: string;
}
