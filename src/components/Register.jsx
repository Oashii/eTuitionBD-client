import React, { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
  const { createUser, setUser, updateUser, logInWithGoogle } = useContext(AuthContext);

  useEffect(() => {
    document.title = 'GameHub - Register';
  }, []);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;


    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate("/");
          })
          .catch((error) => {
            console.error(error);
            setUser(user);
          });
      })
      .catch((error) => {
        alert(`${error.code}: ${error.message}`);
      });
  };


  const handleGoogleSignIn = () => {
    logInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate("/");
      })
      .catch((error) => {
        alert(`${error.code}: ${error.message}`);
      });
  };

  return (
    <div className='flex justify-center my-16'>
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5">
        <h2 className='font-semibold text-2xl text-center'>Register Your Account</h2>
        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset">

            {/* Name */}
            <label className="label">Name</label>
            <input name='name' type="text" className="input" placeholder="Name" required />

            {/* Photo URL */}
            <label className="label">Photo URL</label>
            <input name='photo' type="text" className="input" placeholder="Photo URL" required />

            {/* Email */}
            <label className="label">Email</label>
            <input name='email' type="email" className="input" placeholder="Email" required />

            {/* Password */}
            <label className="label">Password</label>
            <input name='password' type="password" className="input" placeholder="Password" required />

            <button className="btn btn-neutral mt-4" type='submit'>
              Register
            </button>

            <h2 className='font-semibold text-center mt-3'>-------- Or --------</h2>

            
            <button
              type='button'
              onClick={handleGoogleSignIn}
              className="btn mt-3 bg-white text-black border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Sign in with Google
            </button>

            <p className='font-semibold text-center mt-3'>
              Already Have An Account?
              <NavLink className="text-blue-400 font-bold link link-hover ml-1" to='/login'>Login</NavLink>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
