import { RuntimeError } from "../../Common/GenericError.ts";
import { Err, Ok, Result } from "../../Common/Result.ts";
import { SymbolNode } from "../../Parser/Common.ts";
import { PositionInfo } from "../PositionInfo.ts";
import { Type } from "../Type.ts";

export class NumberType extends Type {
  value: number;

  constructor(info: PositionInfo, value: number) {
    super(info);
    this.value = value;
  }

  override add(rhs: Type) {
    const info = new PositionInfo(this.info.start, rhs.info.end);

    if (rhs instanceof NumberType) {
      return Ok(new NumberType(info, this.value + rhs.value));
    }

    return this.rhsNotImplemented(rhs, "+");
  }

  override sub(rhs: Type) {
    const info = new PositionInfo(this.info.start, rhs.info.end);

    if (rhs instanceof NumberType) {
      return Ok(new NumberType(info, this.value - rhs.value));
    }

    return this.rhsNotImplemented(rhs, "-");
  }
  
  override toString() {
    return "NumberType" as const;
  }
}
