import { expect } from "chai";
import * as sinon from 'sinon';
import { getUsers, getUserById, createUser, deleteUser } from '../src/controller'

describe('Users', function () {
  it('get user success case', async function () {
    const res: any = {};
    res.json = sinon.stub();
    await getUsers({}, res)
    expect(res.json.args[0][0]).length.greaterThan(0)
  });

  it('get user by id success case', async function () {
    const res: any = {};
    res.json = sinon.stub();
    await getUserById({ params: { id: 1 } }, res)
    expect(res.json.args[0][0]).length.lessThanOrEqual(1)
  });

  it('get user by id with invalid id', async function () {
    const res: any = {};
    res.json = sinon.stub();
    await getUserById({ params: { id: 123 } }, res)
    expect(res.json.args[0][0].message).equal("user not found")
  });

  it('create user success case', async function () {
    const req = {
      body: {
        "name": "chandra",
        "email": "chandra@gmail.com",
        "dob": "12 jun"
      }
    }
    const res: any = {};
    res.json = sinon.stub();
    await createUser(req, res)
    expect(res.json.args[0][0].message).equal("user created successfully")
  });

  it('delete user by id success case', async function () {
    const res: any = {};
    res.json = sinon.stub();
    await deleteUser({ params: { id: 1 } }, res)
    expect(res.json.args[0][0].message).equal("user deleted successfully")
  });

  it('delete user by id with invalid id', async function () {
    const res: any = {};
    res.json = sinon.stub();
    await deleteUser({ params: { id: 123 } }, res)
    expect(res.json.args[0][0].message).equal("user not found")
  });
});
