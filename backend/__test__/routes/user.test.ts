/*
 * @format
 */
import { userFactory } from "__test__/factories";
import { verifyJWT } from "src/lib/encryption";
import { IAttributes } from "src/entities";
import { client } from "__test__/helpers";

describe("user router", () => {
  const user = userFactory();
  // sign up 
  it("user sign-up", async () => {
    const {encryptedPassword: password, ...remaingUserInfo } = user;
    let res = await client
      .post('/api/sign-up')
      .send({...remaingUserInfo, password});

    const {body:createdUser} = res;
    expect(res.status).toBe(201);
    expect(createdUser).toHaveProperty('token');
    expect(createdUser).toHaveProperty('message');

    // verify user token 
    const decoded = verifyJWT(createdUser.token) as IAttributes;
    expect(decoded?.id).toBe(createdUser.id);
  });

  // sign in 
  it("user login-in",async () => {
    const {email, encryptedPassword: password } = user;
    let res = await client
      .post('/api/sign-in')
      .send({email, password});
    const {body:createdUser} = res;
    expect(createdUser).toHaveProperty('token');
    expect(createdUser).toHaveProperty('message');
  })
  
});
