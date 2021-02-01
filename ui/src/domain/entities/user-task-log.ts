import { JsonProperty, JsonObject } from 'json2typescript';

@JsonObject('UserTaskLog')
class UserTaskLog {
  @JsonProperty('id', Number)
  public id: number;

  @JsonProperty('userTaskId', Number)
  public userTaskId: number;

  @JsonProperty('completedAt', String)
  public completedAt: string;

  constructor(id?: number, userTaskId?: number, completedAt?: string) {
    this.id = id || 0;
    this.userTaskId = userTaskId || 0;
    this.completedAt = completedAt || '';
  }
}

export { UserTaskLog };
