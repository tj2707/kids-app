import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('Task')
export class Task {
  @JsonProperty('id', Number)
  public id: number;

  @JsonProperty('title', String)
  public title: string;

  @JsonProperty('description', String)
  public description: string;

  @JsonProperty('createdAt', String)
  public createdAt: string;

  @JsonProperty('updatedAt', String)
  public updatedAt: string;

  constructor(id?: number, title?: string, description?: string, createdAt?: string, updatedAt?: string) {
    this.id = id || 0;
    this.title = title || '';
    this.description = description || '';
    this.createdAt = createdAt || '';
    this.updatedAt = updatedAt || '';
  }
}
