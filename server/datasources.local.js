
module.exports = {
  db: {
    name: 'db',
    connector: 'memory',
  },
  mainDS: {
    host: process.env.EXCELLERIFY_DB_HOST || '127.0.0.1',
    port: process.env.EXCELLERIFY_DB_PORT || 5432,
    database: process.env.EXCELLERIFY_DB || 'excellerify',
    user: process.env.EXCELLERIFY_DB_USER || 'excellerify',
    password: process.env.EXCELLERIFY_DB_PASSWORD || 'excellerify',
    name: 'mainDS',
    connector: 'postgresql',
  },
  fileDS: {
    name: 'fileDS',
    connector: 'loopback-component-storage',
    provider: 'filesystem',
    root: process.env.EXCELLERIFY_FILE_STORAGE || './storage',
  },
  s3DS: {
    name: 's3DS',
    connector: 'loopback-component-storage',
    provider: 'amazon',
    key: process.env.EXCELLERIFY_S3_KEY,
    keyId: process.env.EXCELLERIFY_S3_KEY_ID,
  },
  // cacheDS: {
  //   host: process.env.EXCELLERIFY_REDIS_HOST || 'localhost',
  //   port: process.env.EXCELLERIFY_REDIS_PORT || 6379,
  //   password: process.env.EXCELLERIFY_REDIS_PASSWORD || '',
  //   name: 'cacheDS',
  //   connector: 'kv-redis',
  // },
  // twilio: {
  //   name: 'twilio',
  //   connector: 'loopback-connector-twilio',
  //   accountSid: process.env.TWILIO_ACCOUNT_SID || '',
  //   authToken: process.env.TWILIO_AUTH_TOKEN || '',
  // },
  // SMSMasking: {
  //   name: 'SMSMasking',
  //   connector: 'loopback-my-sms-masking-connector',
  //   url: 'http://103.16.199.187/',
  //   username: process.env.SMS_MASKING_USERNAME,
  //   password: process.env.SMS_MASKING_PASSWORD,
  // },
  myEmailDataSource: {
    name: 'myEmailDataSource',
    connector: 'mail',
    transports: [{
      type: 'SMTP',
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    }],
  },
};
