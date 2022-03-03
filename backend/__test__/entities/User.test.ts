/*
 * @format
 */
import { userFactory } from "__test__/factories";
import { verifyJWT } from "src/lib/encryption";
import { IAttributes } from "src/entities";
import { datatype } from "faker";

describe("User", () => {
  const user = userFactory();

  it("has valid factory", async () => {
    await user.save();
    expect(user.id).toBeTruthy();
  });

  it("has jwt", async () => {
    const jwt = user.jwt;
    const decoded = verifyJWT(jwt) as IAttributes;
    expect(decoded?.id).toBe(user.id);
  });

  it("can compare password", async () => {
    const password = datatype.string();
    user.password = password;
    expect(user.encryptedPassword).not.toBe(password);
    expect(user.comparePassword(password)).toBeTruthy();
    expect(user.comparePassword("other-string")).toBeFalsy();
  });
});
