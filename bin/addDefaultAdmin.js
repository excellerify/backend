var path = require('path');
var app = require(path.resolve(__dirname, '../server/server'));

const addDefaultUser = async() => {
  try {
    const admin = {
      realm: 'protected',
      username: 'admin',
      password: 'admin',
      email: 'admin@excellerify.io',
      emailVerified: true,
      verificationToken: '',
    };

    const role = await app.models.Role.create({
      name: 'admin',
    });
    console.log('Created role:', role);

    const adminCreate = await app.models.admin.create(admin);

    console.log('Default admin user: admin, password: admin => ', adminCreate);

    const principals = await role.principals.create({
      principalType: app.models.RoleMapping.USER,
      principalId: adminCreate.id,
    });

    console.log('Create role principal ', principals);

    process.exit();
  } catch (err) {
    console.error(err);
  }
};

addDefaultUser();
