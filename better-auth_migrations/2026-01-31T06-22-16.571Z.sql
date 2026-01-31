alter table "user" add column "role" text;

alter table "user" add column "banned" boolean;

alter table "user" add column "banReason" text;

alter table "user" add column "banExpires" timestamptz;

alter table "user" add column "twoFactorEnabled" boolean;

alter table "session" add column "impersonatedBy" text;

create table "twoFactor" ("id" text not null primary key, "secret" text not null, "backupCodes" text not null, "userId" text not null references "user" ("id") on delete cascade);

create table "rateLimit" ("id" text not null primary key, "key" text not null unique, "count" integer not null, "lastRequest" bigint not null);

create index "twoFactor_secret_idx" on "twoFactor" ("secret");

create index "twoFactor_userId_idx" on "twoFactor" ("userId");