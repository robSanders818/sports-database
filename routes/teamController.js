// Imports JS middleware
const express = require('express');
const router = express.Router();

router.use('/components', express.static('assets'));

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


// Getting the string of the webpage
router.get('/review/:id', (req, res) =>{
  postname = req.params; // The Review JSON Object
  
  // Finds the user matching the id of the post
  Review.findById(postname.id, 'title content dorm university user_id', (err, posts) => {

      //if theres an error it redirects the user to the dashboard(for now)
      if (err) res.redirect('/dashboard');

      //if there are no posts it redirects the user to the dashboard(for now)
      if(posts === null) {
        res.redirect('/dashboard');
      } else {
        User.findById(posts.user_id, (err, user) => {
      res.render('posts.ejs',{
          review: posts,
          user: user
      })
    })
    }
  });
}); 
*/

// Exports the JS middleware object
module.exports = router;
