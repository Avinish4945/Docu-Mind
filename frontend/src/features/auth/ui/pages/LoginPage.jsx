import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  
  ShieldCheck,
  FileSearch,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { AuthHook } from "../../hooks/AuthHook";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  let{navigate,handleLogin}=AuthHook();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  

  return (
    <div className="min-h-screen bg-[#f5f7fc] flex">

      {/* ================= LEFT PANEL ================= */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-[#1e2b4d] text-white">

        {/* Background decoration */}
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full border border-white" />
          <div className="absolute top-32 right-10 h-48 w-48 rounded-full border border-white" />
          <div className="absolute bottom-[-100px] left-20 h-72 w-72 rounded-full border border-white" />
        </div>

        <div className="relative z-10 flex w-full flex-col px-12 py-12">

          {/* Brand */}
          <div className="mb-10">
            <h1 className="text-2xl font-bold tracking-tight">
              KMRL Document Intelligence
            </h1>
          </div>

          {/* Hero text */}
          <div className="max-w-xl">
            <h2 className="text-[48px] leading-[1.1] font-bold tracking-tight">
              Understand
              <br />
              documents.
              <br />
              Discover insights.
              <br />
              Act faster.
            </h2>
          </div>

          {/* Features */}
          <div className="mt-10 space-y-5">

            <Feature
            //   icon={<Brain size={22} />}
              title="AI-Powered Document Intelligence"
              description="Extract structured data from complex unstructured documents automatically."
            />

            <Feature
              icon={<ShieldCheck size={22} />}
              title="Secure Enterprise Knowledge"
              description="Your data remains isolated and protected with enterprise-grade security protocols."
            />

            <Feature
              icon={<FileSearch size={22} />}
              title="Source-Backed Answers"
              description="Every insight is directly linked to its source document for complete verifiability."
            />

          </div>

          {/* Footer */}
          <div className="mt-auto pt-10">
            <p className="text-xs tracking-[0.18em] text-slate-400">
              © 2026 KMRL DOCUMENT INTELLIGENCE. ENTERPRISE GRADE SECURITY.
            </p>
          </div>
        </div>
      </div>

      {/* ================= RIGHT PANEL ================= */}
      <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8">

        <div className="w-full max-w-[448px] rounded-2xl border border-slate-200 bg-white px-8 py-9 shadow-[0_12px_40px_rgba(30,43,77,0.08)] sm:px-8">

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-[#10203a]">
              Welcome back
            </h2>

            <p className="mt-2 text-base text-slate-500">
              Sign in to your KMRL workspace
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="mt-8 space-y-5"
          >

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#17233c]"
              >
                Email Address
              </label>

              <div
                className={`relative flex items-center rounded-lg border bg-[#f8f9fd] transition
                ${
                  errors.email
                    ? "border-red-400"
                    : "border-slate-300 focus-within:border-indigo-500"
                }`}
              >
                <Mail
                  size={20}
                  className="absolute left-4 text-slate-400"
                />

                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  className="h-12 w-full rounded-lg bg-transparent pl-11 pr-4 text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value:
                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
              </div>

              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#17233c]"
              >
                Password
              </label>

              <div
                className={`relative flex items-center rounded-lg border bg-[#f8f9fd] transition
                ${
                  errors.password
                    ? "border-red-400"
                    : "border-slate-300 focus-within:border-indigo-500"
                }`}
              >
                <Lock
                  size={20}
                  className="absolute left-4 text-slate-400"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 w-full rounded-lg bg-transparent pl-11 pr-12 text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message:
                        "Password must be at least 6 characters",
                    },
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-200 hover:text-slate-600"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">

              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-indigo-600"
                  {...register("remember")}
                />

                Remember me
              </label>

              <button
                type="button"
                className="text-sm font-medium text-indigo-600 transition hover:text-indigo-800"
              >
                Forgot password?
              </button>

            </div>

            {/* Server error */}
            {serverError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {serverError}
              </div>
            )}

            {/* Submit */}
            <button
           
              type="submit"
              disabled={isSubmitting}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

          </form>

          {/* Register */}
          <div className="mt-8 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <button
             onClick={()=>navigate('/register')}
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-800"
            >
              Create account
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 border-t border-slate-100 pt-6">
            <div className="flex justify-center gap-6 text-xs text-slate-500">
              <button className="hover:text-slate-800">
                Privacy
              </button>

              <button className="hover:text-slate-800">
                Terms
              </button>

              <button className="hover:text-slate-800">
                Help
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};


/* ================= FEATURE COMPONENT ================= */

const Feature = ({ icon, title, description }) => {
  return (
    <div className="flex gap-4">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-indigo-200 backdrop-blur-sm">
        {icon}
      </div>

      <div>
        <h3 className="font-mono text-sm font-semibold tracking-wide text-white">
          {title}
        </h3>

        <p className="mt-1 max-w-md text-sm leading-5 text-slate-300">
          {description}
        </p>
      </div>

    </div>
  );
};

export default LoginPage;