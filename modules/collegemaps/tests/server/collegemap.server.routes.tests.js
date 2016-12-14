'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Collegemap = mongoose.model('Collegemap'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  collegemap;

/**
 * Collegemap routes tests
 */
describe('Collegemap CRUD tests', function () {

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

    // Save a user to the test db and create new Collegemap
    user.save(function () {
      collegemap = {
        name: 'Collegemap name'
      };

      done();
    });
  });

  it('should be able to save a Collegemap if logged in', function (done) {
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

        // Save a new Collegemap
        agent.post('/api/collegemaps')
          .send(collegemap)
          .expect(200)
          .end(function (collegemapSaveErr, collegemapSaveRes) {
            // Handle Collegemap save error
            if (collegemapSaveErr) {
              return done(collegemapSaveErr);
            }

            // Get a list of Collegemaps
            agent.get('/api/collegemaps')
              .end(function (collegemapsGetErr, collegemapsGetRes) {
                // Handle Collegemaps save error
                if (collegemapsGetErr) {
                  return done(collegemapsGetErr);
                }

                // Get Collegemaps list
                var collegemaps = collegemapsGetRes.body;

                // Set assertions
                (collegemaps[0].user._id).should.equal(userId);
                (collegemaps[0].name).should.match('Collegemap name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Collegemap if not logged in', function (done) {
    agent.post('/api/collegemaps')
      .send(collegemap)
      .expect(403)
      .end(function (collegemapSaveErr, collegemapSaveRes) {
        // Call the assertion callback
        done(collegemapSaveErr);
      });
  });

  it('should not be able to save an Collegemap if no name is provided', function (done) {
    // Invalidate name field
    collegemap.name = '';

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

        // Save a new Collegemap
        agent.post('/api/collegemaps')
          .send(collegemap)
          .expect(400)
          .end(function (collegemapSaveErr, collegemapSaveRes) {
            // Set message assertion
            (collegemapSaveRes.body.message).should.match('Please fill Collegemap name');

            // Handle Collegemap save error
            done(collegemapSaveErr);
          });
      });
  });

  it('should be able to update an Collegemap if signed in', function (done) {
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

        // Save a new Collegemap
        agent.post('/api/collegemaps')
          .send(collegemap)
          .expect(200)
          .end(function (collegemapSaveErr, collegemapSaveRes) {
            // Handle Collegemap save error
            if (collegemapSaveErr) {
              return done(collegemapSaveErr);
            }

            // Update Collegemap name
            collegemap.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Collegemap
            agent.put('/api/collegemaps/' + collegemapSaveRes.body._id)
              .send(collegemap)
              .expect(200)
              .end(function (collegemapUpdateErr, collegemapUpdateRes) {
                // Handle Collegemap update error
                if (collegemapUpdateErr) {
                  return done(collegemapUpdateErr);
                }

                // Set assertions
                (collegemapUpdateRes.body._id).should.equal(collegemapSaveRes.body._id);
                (collegemapUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Collegemaps if not signed in', function (done) {
    // Create new Collegemap model instance
    var collegemapObj = new Collegemap(collegemap);

    // Save the collegemap
    collegemapObj.save(function () {
      // Request Collegemaps
      request(app).get('/api/collegemaps')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Collegemap if not signed in', function (done) {
    // Create new Collegemap model instance
    var collegemapObj = new Collegemap(collegemap);

    // Save the Collegemap
    collegemapObj.save(function () {
      request(app).get('/api/collegemaps/' + collegemapObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', collegemap.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Collegemap with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/collegemaps/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Collegemap is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Collegemap which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Collegemap
    request(app).get('/api/collegemaps/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Collegemap with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Collegemap if signed in', function (done) {
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

        // Save a new Collegemap
        agent.post('/api/collegemaps')
          .send(collegemap)
          .expect(200)
          .end(function (collegemapSaveErr, collegemapSaveRes) {
            // Handle Collegemap save error
            if (collegemapSaveErr) {
              return done(collegemapSaveErr);
            }

            // Delete an existing Collegemap
            agent.delete('/api/collegemaps/' + collegemapSaveRes.body._id)
              .send(collegemap)
              .expect(200)
              .end(function (collegemapDeleteErr, collegemapDeleteRes) {
                // Handle collegemap error error
                if (collegemapDeleteErr) {
                  return done(collegemapDeleteErr);
                }

                // Set assertions
                (collegemapDeleteRes.body._id).should.equal(collegemapSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Collegemap if not signed in', function (done) {
    // Set Collegemap user
    collegemap.user = user;

    // Create new Collegemap model instance
    var collegemapObj = new Collegemap(collegemap);

    // Save the Collegemap
    collegemapObj.save(function () {
      // Try deleting Collegemap
      request(app).delete('/api/collegemaps/' + collegemapObj._id)
        .expect(403)
        .end(function (collegemapDeleteErr, collegemapDeleteRes) {
          // Set message assertion
          (collegemapDeleteRes.body.message).should.match('User is not authorized');

          // Handle Collegemap error error
          done(collegemapDeleteErr);
        });

    });
  });

  it('should be able to get a single Collegemap that has an orphaned user reference', function (done) {
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

          // Save a new Collegemap
          agent.post('/api/collegemaps')
            .send(collegemap)
            .expect(200)
            .end(function (collegemapSaveErr, collegemapSaveRes) {
              // Handle Collegemap save error
              if (collegemapSaveErr) {
                return done(collegemapSaveErr);
              }

              // Set assertions on new Collegemap
              (collegemapSaveRes.body.name).should.equal(collegemap.name);
              should.exist(collegemapSaveRes.body.user);
              should.equal(collegemapSaveRes.body.user._id, orphanId);

              // force the Collegemap to have an orphaned user reference
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

                    // Get the Collegemap
                    agent.get('/api/collegemaps/' + collegemapSaveRes.body._id)
                      .expect(200)
                      .end(function (collegemapInfoErr, collegemapInfoRes) {
                        // Handle Collegemap error
                        if (collegemapInfoErr) {
                          return done(collegemapInfoErr);
                        }

                        // Set assertions
                        (collegemapInfoRes.body._id).should.equal(collegemapSaveRes.body._id);
                        (collegemapInfoRes.body.name).should.equal(collegemap.name);
                        should.equal(collegemapInfoRes.body.user, undefined);

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
      Collegemap.remove().exec(done);
    });
  });
});
