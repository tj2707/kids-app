import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('User')
export class User {
  @JsonProperty('id', Number)
  public id: number;

  @JsonProperty('name', String)
  public name: string;

  @JsonProperty('createdAt', String)
  public createdAt: string;

  @JsonProperty('updatedAt', String)
  public updatedAt: string;

  constructor(id?: number, name?: string, createdAt?: string, updatedAt?: string) {
    this.id = id || 0;
    this.name = name || '';
    this.createdAt = createdAt || '';
    this.updatedAt = updatedAt || '';
  }
}
