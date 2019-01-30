var ObjectID = require("mongodb").ObjectID;

module.exports = function(app, db) {
  // INDEX People
  app.get("/people", (req, res) => {
    db.collection("people")
      .find({
        treeId: req.query.treeId
      })
      .toArray(function(err, result) {
        if (err) {
          res.send({ error: "An error occurred" });
        } else {
          res.send(result);
        }
      });
  });

  // CREATE Person
  app.post("/people", (req, res) => {
    const person = req.body;
    db.collection("people").insertOne(person, (err, result) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  // READ Person
  app.get("/people/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection("people").findOne(details, (err, item) => {
      if (err) {
        res.send({ error: "An error has occured." });
      } else {
        res.send(item);
      }
    });
  });

  // UPDATE Person
  app.patch("/people/:id", (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectID(id) };
    const update = {
      $set: {
        forenames: req.body.forenames,
        surname: req.body.surname
      }
    };
    db.collection("people").updateOne(query, update, function(err, item) {
      if (err) {
        res.send({ error: "An error has occured." });
      } else {
        res.send({ message: "Person " + id + " updated." });
      }
    });
  });

  // DELETE Person
  app.delete("/people/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection("people").remove(details, (err, item) => {
      if (err) {
        res.send({ error: "An error occured" });
      } else {
        res.send({ message: "Person " + id + " deleted!" });
      }
    });
  });
};