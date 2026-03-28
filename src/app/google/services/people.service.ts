import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Resource, inject, resource } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Person } from '../types/google/people';
import { OauthClient } from './oauth.client';

const BASE_URL = 'https://people.googleapis.com/v1';
const PERSON_FIELDS = 'names,emailAddresses,phoneNumbers,photos';

interface ConnectionsResponse {
  readonly connections?: readonly Person[];
  readonly nextPageToken?: string;
  readonly totalItems?: number;
}

export interface CreatePersonBody {
  readonly names?: readonly { readonly givenName?: string; readonly familyName?: string }[];
  readonly emailAddresses?: readonly { readonly value: string; readonly type?: string }[];
  readonly phoneNumbers?: readonly { readonly value: string; readonly type?: string }[];
}

@Injectable()
export class PeopleService {
  private readonly http = inject(HttpClient);
  private readonly oauthClient = inject(OauthClient);

  connectionsResource(): Resource<ConnectionsResponse | undefined> {
    return resource({
      loader: async () => {
        const { Authorization } = await this.oauthClient.getAuthorizationHeaders();
        const headers = new HttpHeaders({ Authorization });
        const params = new URLSearchParams({
          personFields: PERSON_FIELDS,
          sortOrder: 'FIRST_NAME_ASCENDING',
        });
        return await firstValueFrom(
          this.http.get<ConnectionsResponse>(
            `${BASE_URL}/people/me/connections?${params}`,
            { headers },
          ),
        );
      },
    });
  }

  async createContact(body: CreatePersonBody): Promise<Person> {
    const { Authorization } = await this.oauthClient.getAuthorizationHeaders();
    const headers = new HttpHeaders({ Authorization });
    const params = new URLSearchParams({ personFields: PERSON_FIELDS });
    return await firstValueFrom(
      this.http.post<Person>(
        `${BASE_URL}/people:createContact?${params}`,
        body,
        { headers },
      ),
    );
  }
}