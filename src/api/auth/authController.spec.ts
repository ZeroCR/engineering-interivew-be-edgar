"use strict";

import request from "supertest";
import assert from "assert";

import { app } from "../../index";

describe("User Controller CRUD API", () => {
  it("Get Token", (done) => {
    request(app)
      .get("/api/auth/getToken")
      .expect(200)
      .end((err: any, results: { body: any }) => {
        if (err) {
          throw err;
        }
        done();
      });
  });
});
