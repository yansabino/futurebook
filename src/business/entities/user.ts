export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string
  ) {}

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getPassword(): string {
    return this.password;
  }
}
