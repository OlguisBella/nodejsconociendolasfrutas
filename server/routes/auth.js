module.exports = (app, passport) => {

	// index routes
	app.get('/auth', isNotLoggedIn, (req, res) => {
		res.render('index-admin');
	});

	
	app.get('/', isLoggedIn, (req, res) =>{
		res.render('index.ejs');
	});

	app.post('/', isLoggedIn, passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));

	//login view
	app.get('/login', isNotLoggedIn, (req, res) => {
		res.render('login.ejs', {
			message: req.flash('loginMessage')
		});
	});

	app.post('/login', isNotLoggedIn, passport.authenticate('local-login', {
		successRedirect: '/admin',
		failureRedirect: '/login',
		failureFlash: true
	}));

	// signup view
	app.get('/signup', isNotLoggedIn, (req, res) => {
		res.render('signup.ejs', {
			message: req.flash('signupMessage')
		});
	});

	app.post('/signup', isNotLoggedIn, passport.authenticate('local-signup', {
            successRedirect: '/admin',
            failureRedirect: '/signup',
            failureFlash: true // allow flash messages
        })
    );

	//admin view
	app.get('/admin', isLoggedIn, (req, res) => {
		res.render('admin', {
			user: req.user
		});
	});

	// logout
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn (req, res, next) {
    console.log(req.isAuthenticated());
	if (req.isAuthenticated()) {
        console.log("auntenticando");
		return next();
	} else
    	res.redirect('/login');
}

function isNotLoggedIn (req, res, next) {
    console.log(req.isAuthenticated());
	if (!req.isAuthenticated()) {
        console.log("auntenticando");
		return next();
	} else
    	res.redirect('/admin');
}