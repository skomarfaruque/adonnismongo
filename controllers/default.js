exports.install = function () {
	F.route('/', generate_auth)
	F.route('/auth', plain_version, ['authorize'])
	F.route('/user', create_user)
}

function mail_send() {
	var message = new Mail.Message('subject', 'body');

	message.from('no-reply@lolobyte.com', 'lolobyte');

	message.to('sohag2847@gmail.com');

	message.send('smtp.zoho.com', {
		port: 465,
		secure: true,
		user: 'no-reply@lolobyte.com',
		password: '1hFgSjg8CMvd'
	})
	this.plain('message sent!')
}

function create_user() {
	var self = this;

	var User = MODEL('user').schema;


	User.create({
		name: 'admin',
		password: 'somepassword'
	}, function (err, users) {

		self.plain('user created')

	});
}

function nuxt_generator() {

}

function plain_version() {
	var self = this;
	self.plain('REST Service {0}\nVersion: {1}'.format(F.config.name, F.config.version));
}

function generate_auth() {
	return this.plain(F.encrypt("user", F.config.secret))
}