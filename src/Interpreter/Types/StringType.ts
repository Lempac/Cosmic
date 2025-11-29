import { RuntimeError } from "../../Common/GenericError.ts";
import { Err, Ok, Result } from "../../Common/Result.ts";
import { PositionInfo } from "../PositionInfo.ts";
import { Type } from "../Type.ts";

export class StringType extends Type {
  value: string;

  constructor(info: PositionInfo, value: string) {
    super(info);
    this.value = value;
  }

  override add(rhs: Type) {
    const info = new PositionInfo(this.info.start, rhs.info.end);

    if (rhs instanceof StringType) {
      return Ok(new StringType(info, this.value + rhs.value));
    }

    return this.rhsNotImplemented(rhs, "+");
  }
  
  override toString() {
    return "StringType" as const;
  }
}
