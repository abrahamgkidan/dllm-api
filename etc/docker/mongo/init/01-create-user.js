const dbName = 'dllm';

db = db.getSiblingDB(dbName);

db.createUser({
  user: 'dllmapi',
  pwd: 'Dllms3cure!',
  roles: [
    {
      role: 'readWrite',
      db: dbName,
    },
  ],
});
