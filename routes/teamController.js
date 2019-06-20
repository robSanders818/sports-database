// Imports JS middleware
const express = require('express');
const router = express.Router();
const session = require('express-session');

const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit : 10,
  host            : '104.196.165.56',
  user            : 'teamDD',
  password        : 'BolajiRobertJovan2022',
  database        : 'KnowItAllSports'
});

router.use('/components', express.static('components'));

// Post a Review Page
//router.get('/review', ensureAuthenticated, (req, res) => res.render('review.ejs'));


/*
// User Dorm Review
router.post('/review', ensureAuthenticated, (req, res) => {
  console.log(req.user.university);
  const { title, dorm, rating, content } = req.body;
  let errors = [];

  // Does the user fill in theses fields when posting a review?
  if (!dorm || !content || !title || !rating) {
    errors.push({ msg: 'Please enter all fields' });
  }

  // Are there any with the review?
  if (errors.length > 0) {
    res.render('review.ejs', {
      errors,
      title,
      content,
      dorm,
      rating
    });
  } else {
    Review.findOne({ content: content }).then(review => { // Searches the database for any content that matches this one
      if (review) {
        errors.push({ msg: 'Post already exists' });
        res.render('review.ejs', {
          errors,
          title,
          content,
          dorm,
          rating
        });
      } else {
        const newReview = new Review({ // Creates the new Review JSON Object for the database
          title,
          content,
          dorm,
          rating,
          user_id: req.user._id,
          university: req.user.university
        });

        newReview
          .save() // Saves the Review JSON Object to the database
          .then(user => {
            req.flash(
              'success_msg',
              'You have successfully posted your post'
            );
            res.redirect(`/posts/review/${newReview._id}`);
          })
          .catch(err => console.log(err));
      }
    });
  }
});
*/

// Getting the string of the webpage
router.get('/:teamid', (req, res) =>{
  teamid = req.params.teamid; // The Review JSON Object
  
  // Finds the user matching the id of the post
  pool.query('CALL team_info_by_id(?)',teamid, (error, results, fields) => {


      //if theres an error it redirects the user to the dashboard(for now)
      if (error) res.redirect('/dashboard');

      //if there are no posts it redirects the user to the dashboard(for now)
      if(results == null) {
        res.redirect('/dashboard');
      } else {
        var teamInfo = results[0];

        pool.query('CALL team_stats_by_id(?)',teamid, (error, results, fields) => {
      res.render('team.ejs',{
          info: teamInfo[0],
          stats: results[0]
      })
    })
    }
  });
}); 


// Exports the JS middleware object
module.exports = router;
