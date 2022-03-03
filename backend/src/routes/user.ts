/*
 * @format
 */
import { validate } from "class-validator";
import express from "express";
import { User } from "src/entities";
import { getRepository } from 'typeorm';



const login = async (req: express.Request, res: express.Response): Promise<void>=> {
  const { email, password } = req.body;
  if (!(email && password)) {
    res.status(400).send();
    return;
  }
  const userRepository = getRepository(User);
  let user: User;

  try {
    user = await userRepository.findOne({
      where: {
        email
      }
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong, please try later'
    })
    return;
  }

  if(!user){
    res.status(404).json({
      message: "User does not exists, try to signup"
    });
    return;
  } 
  
  if (!user.comparePassword(password)) {
    res.status(403).json({
      message: "Password is incorrect"
    });
    return;
  }

  res.json({
    message: "logged in",
    token: user.jwt,
  });
  return;
};

const signup = async (req: express.Request, res: express.Response): Promise<void> => {
  if(!(req.body.email && req.body.password)){
    res.status(422)
    .json({
      message: "Invalid user"
    })
    return;
  }
  const { email, password, phoneNumber, name } = req.body;
    const user = new User();
    user.email = email;
    user.password = password;
    user.phoneNumber = phoneNumber;
    user.name = name

    const errors = await validate(user);

    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    user.hasId();
    const userRepository = getRepository(User);
    try {
      const newUser = await userRepository.save(user);
      res.status(201).json({
        token: newUser.jwt,
        message: 'User has been registered.',
        id: user.id
      })
      return;
    } catch (err) {
      if(err.code === '23505'){
        res.status(409).json({
            message: 'This email is already registered. Please try to login!',
        });
        return;
      }else{
        res.status(500).json({
          message: 'Something went wrong, please try later'
        })
        return;
      }
    }
};



export { login, signup};
