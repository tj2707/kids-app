import { JsonConverter, JsonCustomConvert } from 'json2typescript';

@JsonConverter
class NullableConverter implements JsonCustomConvert<any> {
  public serialize(value: any): any {
    return value;
  }

  public deserialize(value: any): any {
    if (value === null) {
      return undefined;
    }
    return value;
  }
}

export { NullableConverter };
