/*
 * @format
 */

import { User } from "src/entities";
import { internet, name, phone, datatype } from "faker";

export default (params: any = {}): User =>
  new User({
    email: `${internet.userName()}${datatype.number()}@${internet.domainName()}`,
    name: name.findName(),
    phoneNumber: phone.phoneNumber(),
    encryptedPassword: datatype.string(),
    ...params,
  });
