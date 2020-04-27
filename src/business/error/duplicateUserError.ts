import { BaseError } from "./BaseError";

export class DuplicateUserError extends BaseError {
  constructor() {
    super(1062, "Usuario já existe");
  }
}
