'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Studentmail = mongoose.model('Studentmail'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  studentmail;

/**
 * Studentmail routes tests
 */
describe('Studentmail CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Studentmail
    user.save(function () {
      studentmail = {
        name: 'Studentmail name'
      };

      done();
    });
  });

  it('should be able to save a Studentmail if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Studentmail
        agent.post('/api/studentmails')
          .send(studentmail)
          .expect(200)
          .end(function (studentmailSaveErr, studentmailSaveRes) {
            // Handle Studentmail save error
            if (studentmailSaveErr) {
              return done(studentmailSaveErr);
            }

            // Get a list of Studentmails
            agent.get('/api/studentmails')
              .end(function (studentmailsGetErr, studentmailsGetRes) {
                // Handle Studentmails save error
                if (studentmailsGetErr) {
                  return done(studentmailsGetErr);
                }

                // Get Studentmails list
                var studentmails = studentmailsGetRes.body;

                // Set assertions
                (studentmails[0].user._id).should.equal(userId);
                (studentmails[0].name).should.match('Studentmail name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Studentmail if not logged in', function (done) {
    agent.post('/api/studentmails')
      .send(studentmail)
      .expect(403)
      .end(function (studentmailSaveErr, studentmailSaveRes) {
        // Call the assertion callback
        done(studentmailSaveErr);
      });
  });

  it('should not be able to save an Studentmail if no name is provided', function (done) {
    // Invalidate name field
    studentmail.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Studentmail
        agent.post('/api/studentmails')
          .send(studentmail)
          .expect(400)
          .end(function (studentmailSaveErr, studentmailSaveRes) {
            // Set message assertion
            (studentmailSaveRes.body.message).should.match('Please fill Studentmail name');

            // Handle Studentmail save error
            done(studentmailSaveErr);
          });
      });
  });

  it('should be able to update an Studentmail if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Studentmail
        agent.post('/api/studentmails')
          .send(studentmail)
          .expect(200)
          .end(function (studentmailSaveErr, studentmailSaveRes) {
            // Handle Studentmail save error
            if (studentmailSaveErr) {
              return done(studentmailSaveErr);
            }

            // Update Studentmail name
            studentmail.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Studentmail
            agent.put('/api/studentmails/' + studentmailSaveRes.body._id)
              .send(studentmail)
              .expect(200)
              .end(function (studentmailUpdateErr, studentmailUpdateRes) {
                // Handle Studentmail update error
                if (studentmailUpdateErr) {
                  return done(studentmailUpdateErr);
                }

                // Set assertions
                (studentmailUpdateRes.body._id).should.equal(studentmailSaveRes.body._id);
                (studentmailUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Studentmails if not signed in', function (done) {
    // Create new Studentmail model instance
    var studentmailObj = new Studentmail(studentmail);

    // Save the studentmail
    studentmailObj.save(function () {
      // Request Studentmails
      request(app).get('/api/studentmails')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Studentmail if not signed in', function (done) {
    // Create new Studentmail model instance
    var studentmailObj = new Studentmail(studentmail);

    // Save the Studentmail
    studentmailObj.save(function () {
      request(app).get('/api/studentmails/' + studentmailObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', studentmail.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Studentmail with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/studentmails/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Studentmail is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Studentmail which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Studentmail
    request(app).get('/api/studentmails/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Studentmail with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Studentmail if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Studentmail
        agent.post('/api/studentmails')
          .send(studentmail)
          .expect(200)
          .end(function (studentmailSaveErr, studentmailSaveRes) {
            // Handle Studentmail save error
            if (studentmailSaveErr) {
              return done(studentmailSaveErr);
            }

            // Delete an existing Studentmail
            agent.delete('/api/studentmails/' + studentmailSaveRes.body._id)
              .send(studentmail)
              .expect(200)
              .end(function (studentmailDeleteErr, studentmailDeleteRes) {
                // Handle studentmail error error
                if (studentmailDeleteErr) {
                  return done(studentmailDeleteErr);
                }

                // Set assertions
                (studentmailDeleteRes.body._id).should.equal(studentmailSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Studentmail if not signed in', function (done) {
    // Set Studentmail user
    studentmail.user = user;

    // Create new Studentmail model instance
    var studentmailObj = new Studentmail(studentmail);

    // Save the Studentmail
    studentmailObj.save(function () {
      // Try deleting Studentmail
      request(app).delete('/api/studentmails/' + studentmailObj._id)
        .expect(403)
        .end(function (studentmailDeleteErr, studentmailDeleteRes) {
          // Set message assertion
          (studentmailDeleteRes.body.message).should.match('User is not authorized');

          // Handle Studentmail error error
          done(studentmailDeleteErr);
        });

    });
  });

  it('should be able to get a single Studentmail that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Studentmail
          agent.post('/api/studentmails')
            .send(studentmail)
            .expect(200)
            .end(function (studentmailSaveErr, studentmailSaveRes) {
              // Handle Studentmail save error
              if (studentmailSaveErr) {
                return done(studentmailSaveErr);
              }

              // Set assertions on new Studentmail
              (studentmailSaveRes.body.name).should.equal(studentmail.name);
              should.exist(studentmailSaveRes.body.user);
              should.equal(studentmailSaveRes.body.user._id, orphanId);

              // force the Studentmail to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Studentmail
                    agent.get('/api/studentmails/' + studentmailSaveRes.body._id)
                      .expect(200)
                      .end(function (studentmailInfoErr, studentmailInfoRes) {
                        // Handle Studentmail error
                        if (studentmailInfoErr) {
                          return done(studentmailInfoErr);
                        }

                        // Set assertions
                        (studentmailInfoRes.body._id).should.equal(studentmailSaveRes.body._id);
                        (studentmailInfoRes.body.name).should.equal(studentmail.name);
                        should.equal(studentmailInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Studentmail.remove().exec(done);
    });
  });
});
