import { User } from '@interfaces/users.interface';
import { db } from "../database/dbconnection"

// password: q1w2e3r4
const userModel: User[] = [
  { id: 1, email: 'lim@gmail.com', password: '$2b$10$hmrwtGwC.QlfWt6YWaT3S.FP9CarS3.V9n3Qr.d9y2ovcan0oxs56' },
  { id: 2, email: 'kim@gmail.com', password: '$2b$10$hmrwtGwC.QlfWt6YWaT3S.FP9CarS3.V9n3Qr.d9y2ovcan0oxs56' },
  { id: 3, email: 'park@gmail.com', password: '$2b$10$hmrwtGwC.QlfWt6YWaT3S.FP9CarS3.V9n3Qr.d9y2ovcan0oxs56' },
  { id: 4, email: 'choi@gmail.com', password: '$2b$10$hmrwtGwC.QlfWt6YWaT3S.FP9CarS3.V9n3Qr.d9y2ovcan0oxs56' },
  { id: 5, email: 'chris@chris.com', password: "$2b$10$AKEYN2ATzUJSzjERpSRsjutI1uqzw/rtpX7DOIgp367vXAQSVbcUe" },


];

export default userModel;
