'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Timetable = mongoose.model('Timetable'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  timetable;

/**
 * Timetable routes tests
 */
describe('Timetable CRUD tests', function () {

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

    // Save a user to the test db and create new Timetable
    user.save(function () {
      timetable = {
        name: 'Timetable name'
      };

      done();
    });
  });

  it('should be able to save a Timetable if logged in', function (done) {
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

        // Save a new Timetable
        agent.post('/api/timetables')
          .send(timetable)
          .expect(200)
          .end(function (timetableSaveErr, timetableSaveRes) {
            // Handle Timetable save error
            if (timetableSaveErr) {
              return done(timetableSaveErr);
            }

            // Get a list of Timetables
            agent.get('/api/timetables')
              .end(function (timetablesGetErr, timetablesGetRes) {
                // Handle Timetables save error
                if (timetablesGetErr) {
                  return done(timetablesGetErr);
                }

                // Get Timetables list
                var timetables = timetablesGetRes.body;

                // Set assertions
                (timetables[0].user._id).should.equal(userId);
                (timetables[0].name).should.match('Timetable name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Timetable if not logged in', function (done) {
    agent.post('/api/timetables')
      .send(timetable)
      .expect(403)
      .end(function (timetableSaveErr, timetableSaveRes) {
        // Call the assertion callback
        done(timetableSaveErr);
      });
  });

  it('should not be able to save an Timetable if no name is provided', function (done) {
    // Invalidate name field
    timetable.name = '';

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

        // Save a new Timetable
        agent.post('/api/timetables')
          .send(timetable)
          .expect(400)
          .end(function (timetableSaveErr, timetableSaveRes) {
            // Set message assertion
            (timetableSaveRes.body.message).should.match('Please fill Timetable name');

            // Handle Timetable save error
            done(timetableSaveErr);
          });
      });
  });

  it('should be able to update an Timetable if signed in', function (done) {
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

        // Save a new Timetable
        agent.post('/api/timetables')
          .send(timetable)
          .expect(200)
          .end(function (timetableSaveErr, timetableSaveRes) {
            // Handle Timetable save error
            if (timetableSaveErr) {
              return done(timetableSaveErr);
            }

            // Update Timetable name
            timetable.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Timetable
            agent.put('/api/timetables/' + timetableSaveRes.body._id)
              .send(timetable)
              .expect(200)
              .end(function (timetableUpdateErr, timetableUpdateRes) {
                // Handle Timetable update error
                if (timetableUpdateErr) {
                  return done(timetableUpdateErr);
                }

                // Set assertions
                (timetableUpdateRes.body._id).should.equal(timetableSaveRes.body._id);
                (timetableUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Timetables if not signed in', function (done) {
    // Create new Timetable model instance
    var timetableObj = new Timetable(timetable);

    // Save the timetable
    timetableObj.save(function () {
      // Request Timetables
      request(app).get('/api/timetables')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Timetable if not signed in', function (done) {
    // Create new Timetable model instance
    var timetableObj = new Timetable(timetable);

    // Save the Timetable
    timetableObj.save(function () {
      request(app).get('/api/timetables/' + timetableObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', timetable.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Timetable with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/timetables/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Timetable is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Timetable which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Timetable
    request(app).get('/api/timetables/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Timetable with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Timetable if signed in', function (done) {
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

        // Save a new Timetable
        agent.post('/api/timetables')
          .send(timetable)
          .expect(200)
          .end(function (timetableSaveErr, timetableSaveRes) {
            // Handle Timetable save error
            if (timetableSaveErr) {
              return done(timetableSaveErr);
            }

            // Delete an existing Timetable
            agent.delete('/api/timetables/' + timetableSaveRes.body._id)
              .send(timetable)
              .expect(200)
              .end(function (timetableDeleteErr, timetableDeleteRes) {
                // Handle timetable error error
                if (timetableDeleteErr) {
                  return done(timetableDeleteErr);
                }

                // Set assertions
                (timetableDeleteRes.body._id).should.equal(timetableSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Timetable if not signed in', function (done) {
    // Set Timetable user
    timetable.user = user;

    // Create new Timetable model instance
    var timetableObj = new Timetable(timetable);

    // Save the Timetable
    timetableObj.save(function () {
      // Try deleting Timetable
      request(app).delete('/api/timetables/' + timetableObj._id)
        .expect(403)
        .end(function (timetableDeleteErr, timetableDeleteRes) {
          // Set message assertion
          (timetableDeleteRes.body.message).should.match('User is not authorized');

          // Handle Timetable error error
          done(timetableDeleteErr);
        });

    });
  });

  it('should be able to get a single Timetable that has an orphaned user reference', function (done) {
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

          // Save a new Timetable
          agent.post('/api/timetables')
            .send(timetable)
            .expect(200)
            .end(function (timetableSaveErr, timetableSaveRes) {
              // Handle Timetable save error
              if (timetableSaveErr) {
                return done(timetableSaveErr);
              }

              // Set assertions on new Timetable
              (timetableSaveRes.body.name).should.equal(timetable.name);
              should.exist(timetableSaveRes.body.user);
              should.equal(timetableSaveRes.body.user._id, orphanId);

              // force the Timetable to have an orphaned user reference
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

                    // Get the Timetable
                    agent.get('/api/timetables/' + timetableSaveRes.body._id)
                      .expect(200)
                      .end(function (timetableInfoErr, timetableInfoRes) {
                        // Handle Timetable error
                        if (timetableInfoErr) {
                          return done(timetableInfoErr);
                        }

                        // Set assertions
                        (timetableInfoRes.body._id).should.equal(timetableSaveRes.body._id);
                        (timetableInfoRes.body.name).should.equal(timetable.name);
                        should.equal(timetableInfoRes.body.user, undefined);

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
      Timetable.remove().exec(done);
    });
  });
});
