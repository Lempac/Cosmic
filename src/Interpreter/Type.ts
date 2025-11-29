import { RuntimeError } from "../Common/GenericError.ts";
import { Err, Ok, Result } from "../Common/Result.ts";
import { AstNode } from "../Parser/Common.ts";
import { PositionInfo } from "./PositionInfo.ts";

export abstract class Type {
  info: PositionInfo;

  constructor(info: PositionInfo) {
    this.info = info;
  }

  protected runtimeError(reason: string): RuntimeError {
    return {
      isErrorCritical: true,
      reason: reason,
      start: this.info.start,
      end: this.info.end,
      type: "RuntimeError",
    };
  }

  rhsNotImplemented(rhs: Type, operator: string) {
    return Err(
      this.runtimeError(
        `'${this.toString()}' does not implement 'operator${operator}' for '${this.toString()}'`,
      ),
    );
  }

  operatorNotImplemented(operator: string) {
    return Err(
      this.runtimeError(
        `'${this.toString()}' does not implement 'operator${operator}'`,
      ),
    );
  }

  add(rhs: Type) {
    return this.operatorNotImplemented("+");
  }

  sub(rhs: Type) {
    return this.operatorNotImplemented("-");
  }

  div(rhs: Type) {
    return this.operatorNotImplemented("/");
  }

  mul(rhs: Type) {
    return this.operatorNotImplemented("*");
  }

  gt(rhs: Type) {
    return this.operatorNotImplemented(">");
  }

  gte(rhs: Type) {
    return this.operatorNotImplemented(">=");
  }

  lt(rhs: Type) {
    return this.operatorNotImplemented("<");
  }

  lte(rhs: Type){
    return this.operatorNotImplemented("<=");
  }

  ee(rhs: Type) {
    return this.operatorNotImplemented("==");
  }

  ne(rhs: Type) {
    return this.operatorNotImplemented("!=");
  }

  not(operator: PositionInfo) {
    return this.operatorNotImplemented("!");
  }
  
  toString() {
    return "Type";
  }
}
