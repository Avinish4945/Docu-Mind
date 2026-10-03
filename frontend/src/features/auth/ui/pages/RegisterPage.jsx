import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { AuthHook } from "../../hooks/AuthHook";

const RegisterPage= () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  let{navigate,handleRegister}=AuthHook();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");


  return (
    <div className="min-h-screen bg-[#f5f7fc] flex">

      {/* =================================================
          LEFT BRAND PANEL
      ================================================= */}

      <div className="relative hidden min-h-screen overflow-hidden bg-[#1e2b4d] text-white lg:flex lg:w-[45%]">

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.10]">
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        {/* Decorative circles */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full border border-white/10" />

        <div className="absolute bottom-[-180px] left-[-80px] h-[500px] w-[500px] rounded-full border border-white/10" />

        <div className="absolute right-[-120px] top-[25%] h-72 w-72 rounded-full border border-white/5" />

        <div className="relative z-10 flex w-full flex-col px-12 py-12">

          {/* Brand */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              KMRL Document Intelligence
            </h1>
          </div>

          {/* Main content */}
          <div className="mt-[145px] max-w-[470px]">

            <h2 className="text-[50px] font-bold leading-[1.18] tracking-tight">
              Welcome to the
              <br />
              Nexus
              <br />
              of Intelligence.
            </h2>

            <p className="mt-7 max-w-[460px] text-[18px] leading-7 text-slate-300">
              Secure, enterprise-grade document processing
              powered by advanced predictive modeling. Join the
              workspace to begin structuring your unstructured
              data.
            </p>

            {/* Small security indicator */}
            <div className="mt-8 flex items-center gap-3 text-slate-300">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10">
                <ShieldCheck size={18} />
              </div>

              <span className="text-sm">
                Enterprise-grade secure authentication
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto">
            <p className="text-xs tracking-[0.18em] text-slate-400">
              © 2026 KMRL DOCUMENT INTELLIGENCE. ENTERPRISE GRADE SECURITY.
            </p>
          </div>

        </div>
      </div>

      {/* =================================================
          RIGHT REGISTER PANEL
      ================================================= */}

      <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8">

        <div className="w-full max-w-[448px] rounded-2xl border border-slate-200 bg-white px-8 py-8 shadow-[0_12px_40px_rgba(30,43,77,0.08)]">

          {/* Heading */}
          <div>
            <h2 className="text-[32px] font-semibold tracking-tight text-[#101828]">
              Create your account
            </h2>

            <p className="mt-2 text-base text-slate-500">
              Join the KMRL Document Intelligence workspace
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="mt-8 space-y-4"
          >

            {/* =================================================
                NAME
            ================================================= */}

            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block font-mono text-sm font-medium text-[#17233c]"
              >
                Full name
              </label>

              <div
                className={`relative flex items-center rounded-md border bg-white transition
                ${
                  errors.name
                    ? "border-red-500"
                    : "border-slate-300 focus-within:border-indigo-500"
                }`}
              >

                <User
                  size={17}
                  className="absolute left-3 text-slate-400"
                />

                <input
                  id="name"
                  type="text"
                  placeholder="Jane Doe"
                  className="h-11 w-full rounded-md bg-transparent pl-10 pr-3 text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
                  {...register("name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
              </div>

              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* =================================================
                EMAIL
            ================================================= */}

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block font-mono text-sm font-medium text-[#17233c]"
              >
                Work email
              </label>

              <div
                className={`relative flex items-center rounded-md border bg-white transition
                ${
                  errors.email
                    ? "border-red-500"
                    : "border-slate-300 focus-within:border-indigo-500"
                }`}
              >

                <Mail
                  size={17}
                  className="absolute left-3 text-slate-400"
                />

                <input
                  id="email"
                  type="email"
                  placeholder="jane.doe@company.com"
                  className="h-11 w-full rounded-md bg-transparent pl-10 pr-3 text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
                  {...register("email", {
                    required: "Work email is required",
                    pattern: {
                      value:
                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
              </div>

              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* =================================================
                PASSWORD
            ================================================= */}

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block font-mono text-sm font-medium text-[#17233c]"
              >
                Password
              </label>

              <div
                className={`relative flex items-center rounded-md border bg-white transition
                ${
                  errors.password
                    ? "border-red-500"
                    : "border-slate-300 focus-within:border-indigo-500"
                }`}
              >

                <Lock
                  size={17}
                  className="absolute left-3 text-slate-400"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-11 w-full rounded-md bg-transparent pl-10 pr-11 text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message:
                        "Password must be at least 8 characters",
                    },
                  })}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* =================================================
                CONFIRM PASSWORD
            ================================================= */}

            <div>
              <label
                htmlFor="confirmPassword"
                className={`mb-1.5 block font-mono text-sm font-medium ${
                  errors.confirmPassword
                    ? "text-red-600"
                    : "text-[#17233c]"
                }`}
              >
                Confirm password
              </label>

              <div
                className={`relative flex items-center rounded-md border bg-white transition
                ${
                  errors.confirmPassword
                    ? "border-red-500 bg-red-50/30"
                    : "border-slate-300 focus-within:border-indigo-500"
                }`}
              >

                <Lock
                  size={17}
                  className={`absolute left-3 ${
                    errors.confirmPassword
                      ? "text-red-500"
                      : "text-slate-400"
                  }`}
                />

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="••••••••"
                  className="h-11 w-full rounded-md bg-transparent pl-10 pr-11 text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password ||
                      "Passwords do not match",
                  })}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                  <span>ⓘ</span>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Server error */}
            {serverError && (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-600">
                {serverError}
              </div>
            )}

            {/* =================================================
                CREATE ACCOUNT
            ================================================= */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-indigo-600 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >

              {isSubmitting ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  Creating account...
                </>
              ) : (
                <>
                  Create Account

                  <ArrowRight size={17} />
                </>
              )}

            </button>

          </form>

          {/* Login */}
          <div className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <button
             onClick={()=>navigate('/')}
              type="button"
              className="font-medium text-indigo-600 transition hover:text-indigo-800"
            >
              Sign in
            </button>
          </div>

          {/* Security message */}
          <div className="mt-16 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck size={14} />

            <span>
              Your account is protected with secure authentication.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;