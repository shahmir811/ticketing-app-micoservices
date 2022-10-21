import mongoose, { Schema, model, connect } from 'mongoose';
import { Password } from '../services/password';

// 1. An interface that describes the properties that are required
// to create a new user
interface UserAttrs {
	email: string;
	password: string;
}

// An interface that describes the properties that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
	email: string;
	password: string; // you can add the createAt and updateAt properties here
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<UserAttrs>({
	email: { type: String, required: true },
	password: { type: String, required: true },
});

// Hashing the password whenever a new user is created
userSchema.pre('save', async function (done) {
	if (this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'));
		this.set('password', hashed);
	}
	done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};

// 3. Create a Model.
const User = model<UserDoc, UserModel>('User', userSchema);

// 4. Export User Model
export { User };
