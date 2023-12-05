const express = require("express");
const Account = require("../models/account");
const Score = require("../models/score");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("../strategies/passport");

router.post("/register", async (req, res, next) => {
  try {
    const existingUser = await Account.findOne({ username: req.body.username });

    if (existingUser) {
      console.log("Username already exists.");
      res.json({ error: "Username already exists." });
    } else {
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newAccount = await Account.create({
        username: req.body.username,
        password: hashedPassword,
      });
      console.log("Account created:", newAccount);
      res.json(newAccount);
    }
  } catch (err) {
    console.error(err);
    res.json({ error: "Something went wrong when creating your account." });
  }
});

router.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
    if (!user) {
      return res.status(401).json({ success: false, message: "Login failed" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
      return res
        .status(200)
        .json({ success: true, message: "Login successful" });
    });
  })(req, res, next);
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
  });
});

router.get("/check-auth", async (req, res, next) => {
  try {
    if (req.user) res.json({ auth: true, username: req.user.username });
    else res.json({ auth: false, username: null });
  } catch (err) {
    return next(err);
  }
});

router.get("/accounts/:username", async (req, res, next) => {
  try {
    const user = await Account.findOne({ username: req.params.username })
      .populate("best_score")
      .exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const scores = await Score.find({ user: user._id }).exec();

    // Include scores in the response
    const userWithScores = {
      _id: user._id,
      username: user.username,
      best_score: user.best_score,
      scores: scores,
    };

    res.json({ user: userWithScores });
  } catch (err) {
    return next(err);
  }
});

router.get("/get-user-id", async (req, res, next) => {
  try {
    if (req.user) {
      const user = await Account.findOne({
        username: req.user.username,
      }).exec();
      res.json({ user_id: user._id });
    } else res.json({ user_id: null });
  } catch (err) {
    return next(err);
  }
});

router.post("/scores", async (req, res, next) => {
  try {
    const wpm = req.body.wpm;
    const accuracy = req.body.accuracy;
    const difficulty = req.body.difficulty;
    const time = req.body.time;
    const user = req.body.user_id;

    console.log("saving score to uid ", user);

    //Format date
    const currentDate =  new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    };
    const formattedDate = currentDate.toLocaleString("en-US", options);

    console.log(formattedDate);
    const newScore = await Score.create({
      date: formattedDate,
      wpm: wpm,
      acc: accuracy,
      difficulty: difficulty,
      time: time, 
      user: user,
    });

    const account = await Account.findById(user).populate("best_score");

    if (!account.best_score) {
      account.best_score = newScore._id;
      await account.save();
    } else {
      if (account.best_score.wpm < newScore.wpm) {
        account.best_score = newScore._id;
        await account.save();
      }
    }
    console.log("Score saved successfully: ", newScore);
    res.json({ success: true });
  } catch (err) {
    return next(err);
  }
});

/////// NOT REST API, retrieves scores of user of current session
router.get("/scores", async (req, res, next) => {
  if (req.user) {
    const user = await Account.findOne({ username: req.user.username }).exec();
    const scores = await Score.find({ user: user._id }).exec();
    console.log(scores);
    res.json({ scores });
  } else res.json({ scores: [] });
});

router.get("/accounts", async (req, res, next) => {
  const accounts = await Account.find().populate("best_score").exec();
  console.log(accounts);
  res.json({ accounts });
});

router.get("/accounts/:username/scores", async (req, res, next) => {
  if (req.params.username) {
    const user = await Account.findOne({
      username: req.params.username,
    }).exec();
    if (user) {
      const scores = await Score.find({ user: user._id }).exec();
      console.log(scores);
      res.json({ scores });
    } else res.json({ scores: false });
  } else res.json({ scores: [] });
});

router.get("/accounts/:username/followers", async (req, res, next) => {
  if (req.params.username) {
    const user = await Account.findOne({
      username: req.params.username,
    })
    .populate("followers")
    .exec();
    if (user) {
      res.json({ followers: user.followers });
    } else res.json({ followers: false });
  } else res.json({ followers: [] });
});

router.post("/accounts/:username/followers", async (req, res, next) => {
  console.log(req.body);
  if (req.params.username) {
    try {
      const user = await Account.findOne({
        username: req.params.username,
      })
      .exec();

      if (user && req.body.user_id) {
        if (!user.followers.includes(req.body.user_id)) {
          user.followers.push(req.body.user_id); // use push() instead of append()
          await user.save();
          res.json({ success: true, newFollower: true });
        } else {
          res.json({ success: true, newFollower: false });
        }
      } else {
        res.json({ success: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ success: false, error: "Unauthorized" });
  }
});


module.exports = router;
