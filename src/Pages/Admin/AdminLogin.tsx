// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUsers, } from "react-icons/fa";
// import { FiPackage, FiBarChart2 ,FiTrendingUp,FiShield,FiArrowRight} from "react-icons/fi";
// import { RiAdminFill } from "react-icons/ri";

// const AdminLogin = () => {
//   const navigate = useNavigate();

//   const [credentials, setCredentials] = useState({
//     email: "admin@darlingdesire.com",
//     password: "admin123",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setCredentials((prev) => ({ ...prev, [name]: value }));
//     if (error) setError("");
//   };

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!credentials.email || !credentials.password) {
//       setError("Please enter both email and password.");
//       return;
//     }
//     setLoading(true);
//     setTimeout(() => {
//       if (
//         credentials.email === "admin@darlingdesire.com" &&
//         credentials.password === "admin123"
//       ) {
//         localStorage.setItem("adminLoggedIn", "true");
//         localStorage.setItem("adminEmail", credentials.email);
//         navigate("/admin/dashboard");
//       } else {
//         setError("Invalid email or password.");
//         setLoading(false);
//       }
//     }, 1200);
//   };

//   const features = [
//     {
//       icon: FaUsers,
//       title: "Seller Management",
//       desc: "Control approvals & monitor activities",
//     },
//     {
//       icon: FiPackage,
//       title: "Product Oversight",
//       desc: "Manage & review luxury collections",
//     },
//     {
//       icon: FiBarChart2,
//       title: "Analytics",
//       desc: "Track sales, orders & insights",
//     },
//   ];

//   return (
//     <div className="min-h-screen flex overflow-hidden bg-linear-to-br from-[#2b0017] via-[#4a0328] to-[#1b0010]">
//       {/* LEFT SIDE - Admin Features */}
//       <div className="hidden lg:flex w-[45%] relative px-10 py-10 flex-col justify-between">
//         {/* Background effects */}
//         <div className="absolute top-[-100px] left-[-100px] w-[280px] h-[280px] rounded-full bg-pink-500/10 blur-3xl" />
//         <div className="absolute bottom-[-100px] right-[-100px] w-[280px] h-[280px] rounded-full bg-fuchsia-500/10 blur-3xl" />
//         <div className="absolute inset-0 opacity-[0.03]">
//           <svg width="100%" height="100%">
//             <defs>
//               <pattern
//                 id="grid"
//                 width="40"
//                 height="40"
//                 patternUnits="userSpaceOnUse"
//               >
//                 <path
//                   d="M 40 0 L 0 0 0 40"
//                   fill="none"
//                   stroke="white"
//                   strokeWidth="0.5"
//                 />
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#grid)" />
//           </svg>
//         </div>

//         <div className="relative z-10">
//   {/* Welcome Badge */}
//   <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-">
//     <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
//     <span className="text-[10px] font-medium text-white/80 tracking-wide">
//       SYSTEM ONLINE
//     </span>
//   </div>

//   {/* Main Heading */}
//   <div className="mt-2">
//     <h1 className="text-4xl font-bold  font-google text-white leading-tight" >
//       Welcome Back,
//       <br />
//       <span className="text-3xl text-white/70 font-normal mt-1 block">
//         Administrator
//       </span>
//     </h1>
//     <div className="flex items-center gap-2 mt-3">
//       <div className="w-10 h-px bg-linear-to-r from-pink-400 to-transparent" />
//       <p className="text-sm text-white/50">
//         Secure access to your dashboard
//       </p>
//     </div>
//   </div>

//   {/* Stats Cards - Modern Design */}
//   <div className="grid grid-cols-3 gap-3 mt-8">
    
//     <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 p-3 hover:border-pink-400/30 transition-all duration-300 group">
//       <div className="absolute inset-0 bg-linear-to-r from-pink-500/0 via-pink-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//       <p className="text-[10px] uppercase tracking-wider text-pink-400/70 font-semibold">Total Sellers</p>
//       <p className="text-2xl font-bold text-white mt-1">248</p>
//       <p className="text-[10px] text-white/40 mt-1 flex items-center gap-1">
//         <FiTrendingUp size={10} className="text-white" />
//         <span className="text-white">+12%</span>
//         <span>this month</span>
//       </p>
//     </div>
    
//     <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 p-3 hover:border-pink-400/30 transition-all duration-300 group">
//       <div className="absolute inset-0 bg-linear-to-r from-pink-500/0 via-pink-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//       <p className="text-[10px] uppercase tracking-wider text-pink-400/70 font-semibold">Active Products</p>
//       <p className="text-2xl font-bold text-white mt-1">4.8K</p>
//       <p className="text-[10px] text-white/40 mt-1 flex items-center gap-1">
//         <FiTrendingUp size={10} className="text-white" />
//         <span className="text-white">+5.2%</span>
//       </p>
//     </div>
    
//     <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 p-3 hover:border-pink-400/30 transition-all duration-300 group">
//       <div className="absolute inset-0 bg-linear-to-r from-pink-500/0 via-pink-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//       <p className="text-[10px] uppercase tracking-wider text-pink-400/70 font-semibold">Revenue</p>
//       <p className="text-2xl font-bold text-white mt-1">₹13.2L</p>
//       <p className="text-[10px] text-white/40 mt-1 flex items-center gap-1">
//         <FiTrendingUp size={10} className="text-white" />
//         <span className="text-white">+18%</span>
//       </p>
//     </div>
//   </div>

//   {/* Features - Premium Cards */}
//   <div className="mt-8 space-y-2.5">
//     <p className="text-[10px] uppercase tracking-wider text-white/40 font-semibold mb-2 flex items-center gap-2">
//       <span className="w-4 h-px bg-pink-400/50" />
//       QUICK ACTIONS
//     </p>
    
//     {features.map((f) => (
//       <div
//         key={f.title}
//         className="group relative overflow-hidden rounded-xl bg-linear-to-r from-white/5 to-white/0 backdrop-blur-sm border border-white/10 p-3.5 cursor-pointer hover:border-pink-400/40 transition-all duration-300"
//       >
//         <div className="absolute inset-0 bg-linear-to-r from-pink-600/0 via-pink-600/10 to-pink-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 rounded-lg bg-pink-500/20 border border-pink-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//             <f.icon className="text-pink-400 text-sm font-google" />
//           </div>
//           <div className="flex-1">
//             <h3 className="text-white text-sm font-semibold font-google">{f.title}</h3>
//             <p className="text-[10px] text-white/40">{f.desc}</p>
//           </div>
//           <FiArrowRight className="text-white/30 group-hover:text-pink-400 group-hover:translate-x-1 transition-all duration-300" size={14} />
//         </div>
//       </div>
//     ))}
//   </div>


// </div>
//       </div>

//       {/* RIGHT SIDE - Login Form */}
//       <div className="flex-1 flex items-center justify-center px-3 py-8 bg-cover bg-center bg-no-repeat relative">
//         <div className="w-full max-w-[70%]">
//           {/* Login Card */}
//           <div className="relative rounded-2xl border border-gray-300 bg-white/90 backdrop-blur-xl shadow-xl px-10 py-7">
//             {/* Header */}
//             <div className="text-center">
//               <div className="w-14 h-14 mx-auto rounded-full border border-pink-300 flex items-center justify-center shadow-md">
//                 <RiAdminFill className="text-pink-300 text-2xl" />
//               </div>
//               <p className="mt-3 uppercase tracking-[0.2em] text-pink-400 text-[9px] font-semibold">
//                 Secure Access
//               </p>
//               <h2
//                 className="mt-1 text-2xl font-bold text-[#4b1832]"
//                 style={{ fontFamily: "'Cormorant Garamond', serif" }}
//               >
//                 Admin Login
//               </h2>
//               <p className="mt-1 text-xs text-gray-500">
//                 Sign in to access your dashboard
//               </p>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleLogin} className="mt-6 space-y-4">
//               {/* Email */}
//               <div>
//                 <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-pink-500 mb-1">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400 text-xs" />
//                   <input
//                     type="email"
//                     name="email"
//                     value={credentials.email}
//                     onChange={handleChange}
//                     placeholder="admin@darlingdesire.com"
//                     disabled={loading}
//                     className="w-full h-10 rounded-lg border border-pink-100 bg-white pl-9 pr-3 text-xs text-gray-700 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all"
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-pink-500 mb-1">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400 text-xs" />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={credentials.password}
//                     onChange={handleChange}
//                     placeholder="Enter your password"
//                     disabled={loading}
//                     className="w-full h-10 rounded-lg border border-pink-100 bg-white pl-9 pr-9 text-xs text-gray-700 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-600 transition"
//                   >
//                     {showPassword ? (
//                       <FaEyeSlash size={12} />
//                     ) : (
//                       <FaEye size={12} />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Options */}
//               <div className="flex items-center justify-between">
//                 <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
//                   <input type="checkbox" className="accent-pink-500 w-3 h-3" />
//                   <span className="text-[11px]">Remember me</span>
//                 </label>
//                 <button
//                   type="button"
//                   className="text-[11px] font-medium text-pink-500 hover:text-pink-600 transition"
//                 >
//                   Forgot Password?
//                 </button>
//               </div>

//               {/* Error */}
//               {error && (
//                 <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-500 text-xs">
//                   {error}
//                 </div>
//               )}

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full h-10 rounded-lg bg-linear-to-r from-pink-500 to-fuchsia-600 text-white font-semibold tracking-wide text-xs shadow-md hover:scale-[1.02] transition-all disabled:opacity-60"
//               >
//                 {loading ? "SIGNING IN..." : "LOGIN"}
//               </button>
//             </form>

//             {/* Demo Credentials */}
//             <div className="mt-5 pt-4 border-t border-gray-100">
//               <p className="text-center text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
//                 Demo Credentials
//               </p>
//               <div className="bg-gray-50 rounded-lg p-2">
//                 <div className="flex justify-between text-[10px] mb-1">
//                   <span className="text-gray-500">Email:</span>
//                   <span className="text-gray-700 font-mono text-[10px]">
//                     admin@darlingdesire.com
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-[10px]">
//                   <span className="text-gray-500">Password:</span>
//                   <span className="text-gray-700 font-mono text-[10px]">
//                     admin123
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}
//             <p className="text-center text-[9px] text-gray-400 mt-4">
//               Secure Admin Authentication
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;























  

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUsers,FaShieldAlt } from "react-icons/fa";
// import { FiPackage, FiBarChart2, FiTrendingUp, FiShield, FiArrowRight, FiLock, FiServer, FiActivity } from "react-icons/fi";
// import { RiAdminFill } from "react-icons/ri";

// const AdminLogin = () => {
//   const navigate = useNavigate();

//   const [credentials, setCredentials] = useState({
//     email: "admin@darlingdesire.com",
//     password: "admin123",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setCredentials((prev) => ({ ...prev, [name]: value }));
//     if (error) setError("");
//   };

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!credentials.email || !credentials.password) {
//       setError("Please enter both email and password.");
//       return;
//     }
//     setLoading(true);
//     setTimeout(() => {
//       if (
//         credentials.email === "admin@darlingdesire.com" &&
//         credentials.password === "admin123"
//       ) {
//         localStorage.setItem("adminLoggedIn", "true");
//         localStorage.setItem("adminEmail", credentials.email);
//         navigate("/admin/dashboard");
//       } else {
//         setError("Invalid email or password.");
//         setLoading(false);
//       }
//     }, 1200);
//   };

//   const features = [
//     { icon: FaUsers, title: "Seller Management", desc: "Control approvals & monitor activities" },
//     { icon: FiPackage, title: "Product Oversight", desc: "Manage & review luxury collections" },
//     { icon: FiBarChart2, title: "Analytics", desc: "Track sales, orders & insights" },
//   ];

//   return (
//     <div className="min-h-screen flex overflow-hidden relative bg-linear-to-br from-pink-100 via-pink-50 to-purple-100">
      
//       {/* Decorative Background Icons */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 text-pink-200/30 text-6xl">
//           <FiShield />
//         </div>
//         <div className="absolute bottom-20 right-10 text-purple-200/30 text-6xl">
//           <FiLock />
//         </div>
//         <div className="absolute top-1/3 right-1/4 text-pink-200/20 text-4xl">
//           <FiServer />
//         </div>
//         <div className="absolute bottom-1/3 left-1/4 text-purple-200/20 text-5xl">
//           <FiActivity />
//         </div>
//         <div className="absolute top-40 right-20 text-pink-200/15 text-3xl">
//           <FaShieldAlt />
//         </div>
//       </div>

//       {/* LEFT SIDE - Admin Features */}
//       <div className="hidden lg:flex w-[45%] relative px-10 py-10 flex-col justify-between">
//         {/* Soft blur background for left panel */}
//         <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-r-3xl" />
        
//         {/* Background decorative elements */}
//         <div className="absolute top-[-100px] left-[-100px] w-[280px] h-[280px] rounded-full bg-pink-300/20 blur-3xl" />
//         <div className="absolute bottom-[-100px] right-[-100px] w-[280px] h-[280px] rounded-full bg-purple-300/20 blur-3xl" />
        
//         <div className="relative z-10">
//           {/* Welcome Badge */}
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-pink-200 mb-6">
//             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
//             <span className="text-[10px] font-medium text-pink-700 tracking-wide">
//               SYSTEM ONLINE
//             </span>
//           </div>

//           {/* Main Heading */}
//           <div className="mt-2">
//             <h1 className="text-4xl font-bold text-gray-800 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
//               Welcome Back,
//               <br />
//               <span className="text-3xl text-gray-500 font-normal mt-1 block">
//                 Administrator
//               </span>
//             </h1>
//             <div className="flex items-center gap-2 mt-3">
//               <div className="w-10 h-px bg-linear-to-r from-pink-400 to-transparent" />
//               <p className="text-sm text-gray-500">
//                 Secure access to your dashboard
//               </p>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-3 gap-3 mt-8">
//             <div className="relative overflow-hidden rounded-xl bg-white/50 backdrop-blur-sm border border-pink-100 p-3 hover:border-pink-300 transition-all duration-300 group">
//               <div className="absolute inset-0 bg-linear-to-r from-pink-500/0 via-pink-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//               <p className="text-[10px] uppercase tracking-wider text-pink-600 font-semibold">Total Sellers</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">248</p>
//               <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
//                 <FiTrendingUp size={10} className="text-green-500" />
//                 <span className="text-green-600">+12%</span>
//                 <span className="text-gray-400">this month</span>
//               </p>
//             </div>
            
//             <div className="relative overflow-hidden rounded-xl bg-white/50 backdrop-blur-sm border border-pink-100 p-3 hover:border-pink-300 transition-all duration-300 group">
//               <div className="absolute inset-0 bg-linear-to-r from-pink-500/0 via-pink-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//               <p className="text-[10px] uppercase tracking-wider text-pink-600 font-semibold">Active Products</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">4.8K</p>
//               <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
//                 <FiTrendingUp size={10} className="text-green-500" />
//                 <span className="text-green-600">+5.2%</span>
//               </p>
//             </div>
            
//             <div className="relative overflow-hidden rounded-xl bg-white/50 backdrop-blur-sm border border-pink-100 p-3 hover:border-pink-300 transition-all duration-300 group">
//               <div className="absolute inset-0 bg-linear-to-r from-pink-500/0 via-pink-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//               <p className="text-[10px] uppercase tracking-wider text-pink-600 font-semibold">Revenue</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">₹13.2L</p>
//               <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
//                 <FiTrendingUp size={10} className="text-green-500" />
//                 <span className="text-green-600">+18%</span>
//               </p>
//             </div>
//           </div>

//           {/* Features */}
//           <div className="mt-8 space-y-2.5">
//             <p className="text-[10px] uppercase tracking-wider text-pink-500 font-semibold mb-2 flex items-center gap-2">
//               <span className="w-4 h-px bg-pink-300" />
//               QUICK ACTIONS
//             </p>
            
//             {features.map((f) => (
//               <div
//                 key={f.title}
//                 className="group relative overflow-hidden rounded-xl bg-white/50 backdrop-blur-sm border border-pink-100 p-3.5 cursor-pointer hover:border-pink-300 transition-all duration-300"
//               >
//                 <div className="absolute inset-0 bg-linear-to-r from-pink-600/0 via-pink-600/5 to-pink-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                 <div className="flex items-center gap-3">
//                   <div className="w-9 h-9 rounded-lg bg-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                     <f.icon className="text-pink-600 text-sm" />
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-gray-800 text-sm font-semibold">{f.title}</h3>
//                     <p className="text-[10px] text-gray-500">{f.desc}</p>
//                   </div>
//                   <FiArrowRight className="text-gray-400 group-hover:text-pink-500 group-hover:translate-x-1 transition-all duration-300" size={14} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="relative z-10 mt-8 pt-4 border-t border-pink-100">
//           <div className="flex items-center gap-2">
//             <FiShield className="text-pink-400 text-xs" />
//             <span className="text-[9px] text-gray-500 uppercase tracking-wider">Secure Admin Access</span>
//           </div>
//         </div>
//       </div>

    //   {/* RIGHT SIDE - Login Form */}
    //   <div className="flex-1 flex items-center justify-center px-3 py-8 relative">
    //     {/* Decorative circle behind login card */}
    //     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-pink-200/20 blur-3xl pointer-events-none" />
        
    //     <div className="w-full max-w-[70%] relative z-10">
    //       {/* Login Card - Glassy Effect */}
    //       <div className="relative rounded-2xl border border-white/30 bg-white/40 backdrop-blur-xl shadow-2xl px-10 py-7 overflow-hidden">
    //         {/* Glass reflection effect */}
    //         <div className="absolute top-0 left-0 right-0 h-20 bg-linear-to-b from-white/20 to-transparent pointer-events-none" />
            
    //         {/* Decorative icons inside card */}
    //         <div className="absolute top-4 right-4 text-pink-200/40 text-3xl">
    //           <FiLock />
    //         </div>
    //         <div className="absolute bottom-4 left-4 text-purple-200/40 text-2xl">
    //           <FiShield />
    //         </div>

    //         {/* Header */}
    //         <div className="text-center">
    //           <div className="w-14 h-14 mx-auto rounded-full bg-linear-to-r from-pink-100 to-purple-100 flex items-center justify-center shadow-md border border-pink-200">
    //             <RiAdminFill className="text-pink-500 text-2xl" />
    //           </div>
    //           <p className="mt-3 uppercase tracking-[0.2em] text-pink-500 text-[9px] font-semibold">
    //             Secure Access
    //           </p>
    //           <h2 className="mt-1 text-2xl font-bold text-gray-800" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
    //             Admin Login
    //           </h2>
    //           <p className="mt-1 text-xs text-gray-500">
    //             Sign in to access your dashboard
    //           </p>
    //         </div>

    //         {/* Form */}
    //         <form onSubmit={handleLogin} className="mt-6 space-y-4">
    //           {/* Email */}
    //           <div>
    //             <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-pink-600 mb-1">
    //               Email Address
    //             </label>
    //             <div className="relative">
    //               <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400 text-xs" />
    //               <input
    //                 type="email"
    //                 name="email"
    //                 value={credentials.email}
    //                 onChange={handleChange}
    //                 placeholder="admin@darlingdesire.com"
    //                 disabled={loading}
    //                 className="w-full h-10 rounded-lg border border-pink-200 bg-white/60 backdrop-blur-sm pl-9 pr-3 text-xs text-gray-700 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all"
    //               />
    //             </div>
    //           </div>

    //           {/* Password */}
    //           <div>
    //             <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-pink-600 mb-1">
    //               Password
    //             </label>
    //             <div className="relative">
    //               <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400 text-xs" />
    //               <input
    //                 type={showPassword ? "text" : "password"}
    //                 name="password"
    //                 value={credentials.password}
    //                 onChange={handleChange}
    //                 placeholder="Enter your password"
    //                 disabled={loading}
    //                 className="w-full h-10 rounded-lg border border-pink-200 bg-white/60 backdrop-blur-sm pl-9 pr-9 text-xs text-gray-700 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all"
    //               />
    //               <button
    //                 type="button"
    //                 onClick={() => setShowPassword(!showPassword)}
    //                 className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-600 transition"
    //               >
    //                 {showPassword ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
    //               </button>
    //             </div>
    //           </div>

    //           {/* Options */}
    //           <div className="flex items-center justify-between">
    //             <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
    //               <input type="checkbox" className="accent-pink-500 w-3 h-3" />
    //               <span className="text-[11px]">Remember me</span>
    //             </label>
    //             <button type="button" className="text-[11px] font-medium text-pink-600 hover:text-pink-700 transition">
    //               Forgot Password?
    //             </button>
    //           </div>

    //           {/* Error */}
    //           {error && (
    //             <div className="rounded-lg border border-red-200 bg-red-50/80 backdrop-blur-sm px-3 py-2 text-red-500 text-xs">
    //               {error}
    //             </div>
    //           )}

    //           {/* Submit Button */}
    //           <button
    //             type="submit"
    //             disabled={loading}
    //             className="w-full h-10 rounded-lg bg-linear-to-r from-pink-500 to-purple-600 text-white font-semibold tracking-wide text-xs shadow-md hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-60"
    //           >
    //             {loading ? "SIGNING IN..." : "LOGIN"}
    //           </button>
    //         </form>

    //         {/* Demo Credentials */}
    //         <div className="mt-5 pt-4 border-t border-pink-100">
    //           <p className="text-center text-[9px] font-semibold text-pink-500 uppercase tracking-wider mb-2">
    //             Demo Credentials
    //           </p>
    //           <div className="bg-pink-50/80 backdrop-blur-sm rounded-lg p-2">
    //             <div className="flex justify-between text-[10px] mb-1">
    //               <span className="text-gray-500">Email:</span>
    //               <span className="text-gray-700 font-mono text-[10px]">admin@darlingdesire.com</span>
    //             </div>
    //             <div className="flex justify-between text-[10px]">
    //               <span className="text-gray-500">Password:</span>
    //               <span className="text-gray-700 font-mono text-[10px]">admin123</span>
    //             </div>
    //           </div>
    //         </div>

    //         {/* Footer */}
    //         <p className="text-center text-[9px] text-gray-400 mt-4">
    //           Secure Admin Authentication
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
//   );
// };

// export default AdminLogin;
















// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import { FiShield, FiLock, FiServer, FiActivity } from "react-icons/fi";
// import { RiAdminFill } from "react-icons/ri";

// const AdminLogin = () => {
//   const navigate = useNavigate();

//   const [credentials, setCredentials] = useState({
//     email: "admin@darlingdesire.com",
//     password: "admin123",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setCredentials((prev) => ({ ...prev, [name]: value }));
//     if (error) setError("");
//   };

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!credentials.email || !credentials.password) {
//       setError("Please enter both email and password.");
//       return;
//     }
//     setLoading(true);
//     setTimeout(() => {
//       if (
//         credentials.email === "admin@darlingdesire.com" &&
//         credentials.password === "admin123"
//       ) {
//         localStorage.setItem("adminLoggedIn", "true");
//         localStorage.setItem("adminEmail", credentials.email);
//         navigate("/admin/dashboard");
//       } else {
//         setError("Invalid email or password.");
//         setLoading(false);
//       }
//     }, 1200);
//   };

//   return (
//     <div className="min-h-screen flex overflow-hidden relative bg-linear-to-br from-[#ffc4ff] via-[#fce6ff] to-[#dfa2df]">
      
//       {/* Decorative Background Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 text-pink-500/10 text-7xl">
//           <FiShield />
//         </div>
//         <div className="absolute bottom-20 right-10 text-purple-500/10 text-7xl">
//           <FiLock />
//         </div>
//         <div className="absolute top-1/3 right-1/4 text-pink-500/5 text-5xl">
//           <FiServer />
//         </div>
//         <div className="absolute bottom-1/3 left-1/4 text-purple-500/5 text-6xl">
//           <FiActivity />
//         </div>
//         {/* Grid pattern overlay */}
//         <div className="absolute inset-0 opacity-5">
//           <svg width="100%" height="100%">
//             <defs>
//               <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
//                 <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" strokeWidth="0.5" />
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#grid)" />
//           </svg>
//         </div>
//       </div>

//       {/* LEFT SIDE - Admin Image & Welcome Text */}
//       <div className="hidden lg:flex w-[50%] relative items-center justify-center p-0">
//         {/* Dark overlay for image section */}
//         <div className="absolute inset-0 bg-linear-to-br from-pink-900/30 via-purple-900/30 to-transparent rounded-r-3xl" />
        
//         <div className="relative z-10 w-full max-w-lg items-center justify-center flex flex-col">
//        <img src="/login.png" className="h-100 w-100" />

//           {/* Welcome Text Overlay */}
//           <div className="text-center mt-6">
//             <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
//               Admin Portal
//             </h2>
//             <p className="text-white/60 text-sm leading-relaxed">
//               Complete control over sellers, products, orders, and platform analytics
//             </p>
//             <div className="flex items-center justify-center gap-2 mt-4">
//               <div className="w-8 h-px bg-linear-to-r from-transparent to-pink-500" />
//               <FiShield className="text-pink-500/50 text-xs" />
//               <div className="w-8 h-px bg-linear-to-l from-transparent to-purple-500" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* RIGHT SIDE - Login Form */}
//       {/* RIGHT SIDE - Login Form */}
//       <div className="flex-1 flex items-center justify-center px-3 py-8 relative bg-white">
//         {/* Decorative circle behind login card */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-pink-200/60  blur-3xl pointer-events-none" />
        
//         <div className="w-full max-w-[70%] relative z-10">
//           {/* Login Card - Glassy Effect */}
//           <div className="relative rounded-2xl border border-[#D9DBDE] bg-white/40 backdrop-blur-xl shadow-2xl px-10 py-7 overflow-hidden">
//             {/* Glass reflection effect */}
//             <div className="absolute top-0 left-0 right-0 h-20 bg-linear-to-b from-white/20 to-transparent pointer-events-none" />
            
//             {/* Decorative icons inside card */}
//             <div className="absolute top-4 right-4 text-pink-200/40 text-3xl">
//               <FiLock />
//             </div>
//             <div className="absolute bottom-4 left-4 text-purple-200/40 text-2xl">
//               <FiShield />
//             </div>

//             {/* Header */}
//             <div className="text-center">
//               <div className="w-14 h-14 mx-auto rounded-full bg-linear-to-r from-pink-100 to-purple-100 flex items-center justify-center shadow-md border border-pink-200">
//                 <RiAdminFill className="text-pink-500 text-2xl" />
//               </div>
//               <p className="mt-3 uppercase tracking-[0.2em] text-pink-500 text-[9px] font-semibold">
//                 Secure Access
//               </p>
//               <h2 className="mt-1 text-2xl font-bold text-gray-800" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
//                 Admin Login
//               </h2>
//               <p className="mt-1 text-xs text-gray-500">
//                 Sign in to access your dashboard
//               </p>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleLogin} className="mt-6 space-y-4">
//               {/* Email */}
//               <div>
//                 <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-pink-600 mb-1">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400 text-xs" />
//                   <input
//                     type="email"
//                     name="email"
//                     value={credentials.email}
//                     onChange={handleChange}
//                     placeholder="admin@darlingdesire.com"
//                     disabled={loading}
//                     className="w-full h-10 rounded-lg border border-pink-200 bg-white/60 backdrop-blur-sm pl-9 pr-3 text-xs text-gray-700 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all"
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-pink-600 mb-1">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400 text-xs" />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={credentials.password}
//                     onChange={handleChange}
//                     placeholder="Enter your password"
//                     disabled={loading}
//                     className="w-full h-10 rounded-lg border border-pink-200 bg-white/60 backdrop-blur-sm pl-9 pr-9 text-xs text-gray-700 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-600 transition"
//                   >
//                     {showPassword ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
//                   </button>
//                 </div>
//               </div>

//               {/* Options */}
//               <div className="flex items-center justify-between">
//                 <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
//                   <input type="checkbox" className="accent-pink-500 w-3 h-3" />
//                   <span className="text-[11px]">Remember me</span>
//                 </label>
//                 <button type="button" className="text-[11px] font-medium text-pink-600 hover:text-pink-700 transition">
//                   Forgot Password?
//                 </button>
//               </div>

//               {/* Error */}
//               {error && (
//                 <div className="rounded-lg border border-red-200 bg-red-50/80 backdrop-blur-sm px-3 py-2 text-red-500 text-xs">
//                   {error}
//                 </div>
//               )}

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full h-10 rounded-lg bg-linear-to-r from-pink-500 to-purple-600 text-white font-semibold tracking-wide text-xs shadow-md hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-60"
//               >
//                 {loading ? "SIGNING IN..." : "LOGIN"}
//               </button>
//             </form>

//             {/* Demo Credentials */}
//             <div className="mt-5 pt-4 border-t border-pink-100">
//               <p className="text-center text-[9px] font-semibold text-pink-500 uppercase tracking-wider mb-2">
//                 Demo Credentials
//               </p>
//               <div className="bg-pink-50/80 backdrop-blur-sm rounded-lg p-2">
//                 <div className="flex justify-between text-[10px] mb-1">
//                   <span className="text-gray-500">Email:</span>
//                   <span className="text-gray-700 font-mono text-[10px]">admin@darlingdesire.com</span>
//                 </div>
//                 <div className="flex justify-between text-[10px]">
//                   <span className="text-gray-500">Password:</span>
//                   <span className="text-gray-700 font-mono text-[10px]">admin123</span>
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}
//             <p className="text-center text-[9px] text-gray-400 mt-4">
//               Secure Admin Authentication
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
   
//   );
// };

// export default AdminLogin;















import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FiShield, FiLock, FiServer, FiActivity, FiArrowRight } from "react-icons/fi";
import { RiAdminFill } from "react-icons/ri";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "admin@darlingdesire.com",
    password: "admin123",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (
        credentials.email === "admin@darlingdesire.com" &&
        credentials.password === "admin123"
      ) {
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("adminEmail", credentials.email);
        navigate("/admin/dashboard");
      } else {
        setError("Invalid email or password.");
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex overflow-hidden relative bg-linear-to-br from-pink-50 via-white to-purple-50">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-pink-200/30 text-7xl">
          <FiShield />
        </div>
        <div className="absolute bottom-20 right-10 text-purple-200/30 text-7xl">
          <FiLock />
        </div>
        <div className="absolute top-1/3 right-1/4 text-pink-200/20 text-5xl">
          <FiServer />
        </div>
        <div className="absolute bottom-1/3 left-1/4 text-purple-200/20 text-6xl">
          <FiActivity />
        </div>
      </div>

      {/* LEFT SIDE - Admin Image */}
      <div className="hidden lg:flex w-[50%] relative items-center justify-center p-0 bg-pink-100 from-purple-200">
        <div className="absolute inset-0 bg-linear-to-br from-pink-100/50 via-purple-100/30 to-transparent rounded-r-3xl" />
        
        <div className="relative z-10 w-full max-w-lg flex flex-col items-center justify-center">
          <img src="/login.png" alt="Admin Dashboard" className="w-100 h-100 " />

          {/* Welcome Text Overlay */}
          <div className="text-center mt-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Admin Portal
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Complete control over sellers, products, orders, and platform analytics
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-8 h-px bg-linear-to-r from-transparent to-pink-400" />
              <FiShield className="text-pink-400/70 text-xs" />
              <div className="w-8 h-px bg-linear-to-l from-transparent to-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-0 relative">
        <div className="w-full max-w-md relative z-10">
          {/* Login Card - White/Pink Theme */}
          <div className="relative rounded-2xl border border-[#D9DBDE] bg-white shadow-xl p-8 overflow-hidden">
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-pink-500 to-purple-600" />
            
            {/* Decorative icons inside card */}
            <div className="absolute top-4 right-4 text-pink-100 text-4xl">
              <FiLock />
            </div>
            <div className="absolute bottom-4 left-4 text-purple-100 text-3xl">
              <FiShield />
            </div>

            {/* Header */}
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-linear-to-r from-pink-100 to-purple-100 flex items-center justify-center shadow-md border border-pink-200">
                <RiAdminFill className="text-pink-500 text-2xl" />
              </div>
              <p className="mt-3 uppercase tracking-[0.2em] text-pink-500 text-[9px] font-semibold">
                Secure Access
              </p>
              <h2 className="mt-1 text-2xl font-bold text-gray-800" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Admin Login
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Sign in to access your dashboard
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              {/* Email */}
              <div>
                <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-pink-600 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400 text-xs" />
                  <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="admin@darlingdesire.com"
                    disabled={loading}
                    className="w-full h-10 rounded-lg border border-pink-200 bg-white pl-9 pr-3 text-xs text-gray-700 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-pink-600 mb-1">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400 text-xs" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    disabled={loading}
                    className="w-full h-10 rounded-lg border border-pink-200 bg-white pl-9 pr-9 text-xs text-gray-700 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-600 transition"
                  >
                    {showPassword ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
                  <input type="checkbox" className="accent-pink-500 w-3 h-3" />
                  <span className="text-[11px]">Remember me</span>
                </label>
                <button type="button" className="text-[11px] font-medium text-pink-600 hover:text-pink-700 transition">
                  Forgot Password?
                </button>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-500 text-xs">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-10 rounded-lg bg-linear-to-r from-pink-500 to-purple-600 text-white font-semibold tracking-wide text-xs shadow-md hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-60"
              >
                {loading ? "SIGNING IN..." : "LOGIN"}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-5 pt-4 border-t border-pink-100">
              <p className="text-center text-[9px] font-semibold text-pink-500 uppercase tracking-wider mb-2">
                Demo Credentials
              </p>
              <div className="bg-pink-50 rounded-lg p-2">
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-gray-500">Email:</span>
                  <span className="text-gray-700 font-mono text-[10px]">admin@darlingdesire.com</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-gray-500">Password:</span>
                  <span className="text-gray-700 font-mono text-[10px]">admin123</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-[9px] text-gray-400 mt-4">
              Secure Admin Authentication
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;