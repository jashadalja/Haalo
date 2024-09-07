const express = require("express");
const router = express.Router();
const { Users, sequelize } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");
const { QueryTypes, Op } = require('sequelize');

router.post("/signup", async (req, res) => {
  const { userName, password, email, phoneNumber, gender } = req.body;

  const user = await Users.findOne({ where: { username: userName } });

  if (user) {
    res.json("User Name Is Already Exists");
    return
  }

  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: userName,
      password: hash,
      email: email,
      phone_no: phoneNumber,
      gender: gender
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { userIdentifier, password } = req.body;

  try {
    // Check for user either by username, email, or phone number
    const user = await Users.findOne({
      where: {
        [Op.or]: [
          { username: userIdentifier },
          { email: userIdentifier },
          { phone_no: userIdentifier }
        ]
      }
    });

    // If user is not found
    if (!user) {
      res.json({ error: "User Doesn't Exist" });
      return;
    }

    // Compare the password with the stored hash
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json({ error: "Wrong username and/or password" });
        return;
      }

      // Generate a JWT token if login is successful
      const accessToken = sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          phoneno: user.phone_no
        },
        "importantsecret"
      );

      // Send response with the token and user info
      res.json({
        token: accessToken,
        id: user.id,
        username: user.username,
        email: user.email,
        phoneno: user.phone_no
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

// router.put("/:userId", async (req, res) => {
//   const userId = req.params.userId;
//   const newData = req.body;
//   console.log("hellohello - ",userId, newData)
//   try {
//     const user = await UserList.findByPk(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Update the user's data
//     if (newData[3] == "") {
//       await user.update({
//         usertype: newData.usertype,
//         disable: newData.disable,
//         username: newData.username,
//         wan: newData.wan,
//       });
//     } else {
//       bcrypt.hash(newData.password, 10).then((hash) => {
//         user.update({
//           usertype: newData.usertype,
//           disable: newData.disable,
//           username: newData.username,
//           password: hash,
//           wan: newData.wan,
//         });
//       });
//     }
//     res.json("SUCCESS");
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// });

router.delete('/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCount = await Users.destroy({ where: { id } });
    if (!deleteCount) {
      return res.status(404).send('Person not found');
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting person:', error);
    res.status(500).send(error.message);
  }
});


// router.post("/delete", validateToken, (req, res) => {
//   const data = req.body;
//   console.log(data);
//   UserList.destroy({
//     where: {
//       id: data,
//     },
//   })
//   res.json("deleted")
// });



router.put('/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body)
    const { usertype, disable, username, wan, updatedby, entityid, entityidno } = req.body;
    const person = await Users.findByPk(id);
    if (!person) {
      return res.status(404).send('Person not found');
    }
    if (person.wan == wan) {
      await person.update({
        usertype: usertype,
        disable: disable,
        username: username,
        wan: wan,
        updatedby: updatedby,
        entityid: entityid,
        entityidno: entityidno
      });
    } else {
      await person.update({
        usertype: usertype,
        disable: disable,
        username: username,
        wan: wan,
        updatedby: updatedby,
        entityid: entityid,
        entityidno: entityidno,
        wanverified: false
      });
    }


    await person.save();

    res.json(person);
  } catch (error) {
    console.error('Error updating person:', error);
    res.status(500).send(error.message);
  }
});


router.get("/getuserlist", validateToken, async (req, res) => {
  try {
    const userlist = await Users.findAll();
    res.json(userlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// router.post("/deleteallselectedrows", validateToken, (req, res) => {
//   const data = req.body;
//   console.log(data);
//   res.json("df")
//   UserList.destroy({
//     where: {
//       id: data,
//     },
//   })
// });



// router.get("/basicinfo/:id", async (req, res) => {
//   const id = req.params.id;

//   const basicInfo = await UserList.findByPk(id, {
//     attributes: { exclude: ["password"] },
//   });

//   res.json(basicInfo);
// });



// router.put("/changepassword", validateToken, async (req, res) => {
//   const { oldPassword, newPassword } = req.body;
//   const user = await UserList.findOne({ where: { username: req.user.username } });

//   bcrypt.compare(oldPassword, user.password).then(async (match) => {
//     if (!match) res.json({ error: "Wrong Password Entered!" });

//     bcrypt.hash(newPassword, 10).then((hash) => {
//       UserList.update(
//         { password: hash },
//         { where: { username: req.user.username } }
//       );
//       res.json("SUCCESS");
//     });
//   });
// });

module.exports = router;
