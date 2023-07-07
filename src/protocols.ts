import { Request } from 'express';

export type ApplicationError = {
  name: string;
  message: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type JWTPayload = {
  userId: number;
};

export type AuthenticatedRequest = Request & JWTPayload;

export type ViaCEPAddress = {
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
};

export type ViaCEPResponseSuccess = {
  logradouro: string;
  complemento: string;
  bairro: string;
  uf: string;
  localidade: string;
  cep: string;
  ibge: string;
  ddd: string;
  siafi: string;
};

export type ViaCEPResponseError = {
  erro: boolean;
};

export type ViaCEPResponse = ViaCEPResponseSuccess | ViaCEPResponseError;

export type createTicketBody = {
  ticketTypeId: number;
};

export interface createTicketRequest extends AuthenticatedRequest {
  body: createTicketBody;
}
