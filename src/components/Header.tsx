// import { Link } from "@tanstack/react-router"
// import { useState } from "react"
// // import ThemeToggle from "./ThemeToggle"
// // import SearchBar from "./SearchBar"
// // import { useDolar } from "../hooks/useDolar"
// // import { useAuthStore } from "../stores/useAuthStore"
// import {
//   Menu,
//   X,
//   User,
//   LogIn,
//   ShoppingCart,
//   LayoutDashboard,
//   Tag,
//   LogOut,
//   Forklift,
//   Layers,
//   ReceiptText,
//   Package,
// } from "lucide-react"

// export function Header() {
//   // const { dolarData } = useDolar()
//   // const { user, logout } = useAuthStore()
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   // const isLoggedIn = !!user

//   // function verifications() {
//   // Corrección: Guardamos el rol y lo comparamos correctamente
//   //   const role = user?.role?.toUpperCase()
//   //   if (role === "STAFF" || role === "ADMIN") {
//   //     console.log({ role })
//   //   } else {
//   //     console.log({ role })
//   //   }
//   // }

//   // Función para cerrar el menú móvil al hacer click en un link
//   const closeMenu = () => setIsMenuOpen(false)

//   return (
//     <nav className="bg-base-200 shadow-md mb-5 sticky top-0 z-50">
//       {/* --- CONTENEDOR PRINCIPAL --- */}
//       <div className="max-w-7xl mx-auto p-2 md:px-4">
//         <div className="flex items-center gap-4">
//           {/* LOGO: Siempre visible */}
//           <Link to="/" className="shrink-0">
//             <button
//               className="btn btn-ghost text-primary normal-case text-xl px-2"
//               // onClick={verifications}
//             >
//               Comercial Vuelvan Cara
//             </button>
//           </Link>

//           {/* BARRA DE BÚSQUEDA: Se expande para ocupar el centro */}
//           <div className="grow">
//             <input type="text" />
//           </div>

//           {/* ACCIONES ESCRITORIO (Solo >= 1024px) */}
//           <div className="hidden lg:flex items-center gap-4">
//             <div className="flex flex-col items-end leading-tight border-x px-4 border-base-300">
//               <span className="text-xs opacity-60">Dólar</span>
//               <span className="text-sm font-bold">
//                 {/* {dolarData ? `${Number(dolarData).toFixed(2)} Bs.` : "Bs. N/A"} */}
//               </span>
//             </div>

//             {/* Corrección: Lógica del Avatar en Escritorio */}
//             {/* {isLoggedIn ? (
//               <div className="btn btn-outline btn-circle overflow-hidden">
//                 <Link
//                   to="/Profile"
//                   className="w-full h-full flex items-center justify-center"
//                 >
//                   {user?.avatar ? (
//                     <img
//                       src={user.avatar}
//                       alt="Avatar"
//                       className="w-8 h-8 object-cover rounded-full"
//                     />
//                   ) : (
//                     <User className="size-6" />
//                   )}
//                 </Link>
//               </div>
//                 ) : (
//               <Link to="/Auths" className="btn btn-ghost btn-circle">
//                 <User className="size-6" />
//               </Link>
//             )}

//             <Link to="/cart" className="btn btn-ghost btn-circle">
//               <ShoppingCart className="size-6" />
//             </Link>
//           </div>

//           {/* BOTÓN BURGER (Solo < 1024px) */}
//           <button
//             className="lg:hidden btn btn-ghost btn-circle"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? (
//               <X className="size-6" />
//             ) : (
//               <Menu className="size-6" />
//             )}
//           </button>
//         </div>

//         {/* --- FILA INFERIOR (Solo Escritorio) --- */}
//         {/* Enlace EXTRA solo para ADMIN o STAFF */}
//         <div className="hidden lg:flex justify-center gap-8 mt-2 pb-2 border-t border-base-300 pt-2">
//           {(user?.role?.toLowerCase() === "staff" ||
//             user?.role?.toLowerCase() === "admin") && (
//             <div className="dropdown dropdown-hover dropdown-end">
//               <div tabIndex={0} role="button" className="btn btn-outline gap-2">
//                 <LayoutDashboard size={18} /> Administración
//               </div>
//               <ul
//                 tabIndex={0}
//                 className="dropdown-content z-60 menu p-2 shadow bg-base-100 rounded-box w-64 border border-base-300"
//                 onClick={() => {
//                   const elem = document.activeElement
//                   if (elem instanceof HTMLElement) elem.blur()
//                 }}
//               >
//                 <li>
//                   <Link
//                     to="/Dashboard/Logistics"
//                     className="flex items-center gap-3 py-3"
//                   >
//                     <Forklift className="size-5 text-primary" />
//                     <div className="flex flex-col">
//                       <span className="font-bold">Estadísticas</span>
//                       <span className="text-[10px] opacity-60">
//                         Logística y envíos
//                       </span>
//                     </div>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/Dashboard/Finances"
//                     className="flex items-center gap-3 py-3"
//                   >
//                     <Layers className="size-5 text-secondary" />
//                     <div className="flex flex-col">
//                       <span className="font-bold">Finanzas</span>
//                       <span className="text-[10px] opacity-60">
//                         Balance y cuentas
//                       </span>
//                     </div>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/Dashboard/Reports"
//                     className="flex items-center gap-3 py-3"
//                   >
//                     <ReceiptText className="size-5 text-accent" />
//                     <div className="flex flex-col">
//                       <span className="font-bold">Reportes</span>
//                       <span className="text-[10px] opacity-60">
//                         Gestión de pedidos
//                       </span>
//                     </div>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/Dashboard/Items"
//                     className="flex items-center gap-3 py-3"
//                   >
//                     <Package className="size-5 text-info" />
//                     <div className="flex flex-col">
//                       <span className="font-bold">
//                         Administración de Artículos
//                       </span>
//                       <span className="text-[10px] opacity-60">
//                         Inventario y stock
//                       </span>
//                     </div>
//                   </Link>
//                 </li>
//                 <div className="divider my-0"></div>
//                 <li>
//                   <Link
//                     to="/Dashboard"
//                     className="justify-center font-bold text-xs hover:bg-base-200 py-2"
//                   >
//                     Ver Panel General
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           )}
//           {/* Enlaces visibles para TODOS (Clientes y Admin) */}
//           <Link to="/Offers" className="btn btn-outline">
//             <Tag size={18} /> Ofertas
//           </Link>
//         </div>
//       </div>

//       {/* --- MENÚ MÓVIL (OVERLAY) --- */}
//       <div
//         className={`
//         fixed inset-0 bg-base-100 z-40 transform transition-transform duration-300 ease-in-out lg:hidden
//         ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
//       `}
//         style={{ top: "64px" }}
//       >
//         <div className="p-6 flex flex-col gap-6">
//           {/* Sección Usuario en Móvil */}
//           <div className="bg-base-200 p-4 rounded-2xl">
//             {isLoggedIn ? (
//               <div className="flex items-center gap-4">
//                 <div className="btn btn-ghost btn-circle btn-md overflow-hidden bg-base-300">
//                   <div className="flex items-center justify-center w-full h-full">
//                     <Link to="/Profile" onClick={closeMenu}>
//                       {/* Corrección: Fallback del Avatar en Móvil */}
//                       {user?.avatar ? (
//                         <img
//                           src={user.avatar}
//                           alt="Avatar"
//                           className="w-full h-full object-cover cursor-pointer"
//                         />
//                       ) : (
//                         <User className="size-6 cursor-pointer" />
//                       )}
//                     </Link>
//                   </div>
//                 </div>
//                 <div>
//                   <p className="font-bold text-lg">
//                     Hola,{" "}
//                     {user?.first_name
//                       ? `${user.first_name} ${user.last_name || ""}`
//                       : "Usuario"}
//                     !
//                   </p>
//                   <p>{user?.username}</p>
//                   <p className="text-sm opacity-60">{user?.email}</p>
//                   <button
//                     onClick={() => {
//                       logout()
//                       closeMenu()
//                     }}
//                     className="btn btn-outline btn-sm mt-2"
//                   >
//                     <LogOut size={14} /> Cerrar Sesión
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex flex-col gap-3">
//                 <p className="font-bold text-center">¡Bienvenido!</p>
//                 <Link
//                   to="/Auths"
//                   onClick={closeMenu}
//                   className="btn btn-primary w-full"
//                 >
//                   {" "}
//                   <LogIn size={18} /> Iniciar Sesión
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Enlaces de Navegación Móvil */}
//           {user?.role?.toLowerCase() === "staff" ||
//           user?.role?.toLowerCase() === "admin" ? (
//             <div className="flex flex-col gap-2">
//               <Link
//                 to="/Dashboard"
//                 onClick={closeMenu}
//                 className="btn btn-ghost justify-start gap-4 text-lg bg-base-200"
//               >
//                 <LayoutDashboard /> Administración
//               </Link>
//               <div className="grid grid-cols-2 gap-2 pl-4 mt-2">
//                 <Link
//                   to="/Dashboard/Logistics"
//                   onClick={closeMenu}
//                   className="btn btn-ghost btn-sm justify-start gap-2 h-auto py-2"
//                 >
//                   <Forklift size={16} />{" "}
//                   <span className="text-xs">Estadísticas</span>
//                 </Link>
//                 <Link
//                   to="/Dashboard/Finances"
//                   onClick={closeMenu}
//                   className="btn btn-ghost btn-sm justify-start gap-2 h-auto py-2"
//                 >
//                   <Layers size={16} /> <span className="text-xs">Finanzas</span>
//                 </Link>
//                 <Link
//                   to="/Dashboard/Reports"
//                   onClick={closeMenu}
//                   className="btn btn-ghost btn-sm justify-start gap-2 h-auto py-2"
//                 >
//                   <ReceiptText size={16} />{" "}
//                   <span className="text-xs">Reportes</span>
//                 </Link>
//                 <Link
//                   to="/Dashboard/Items"
//                   onClick={closeMenu}
//                   className="btn btn-ghost btn-sm justify-start gap-2 h-auto py-2"
//                 >
//                   <Package size={16} />{" "}
//                   <span className="text-xs">Artículos</span>
//                 </Link>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-2">
//               <Link
//                 to="/cart"
//                 onClick={closeMenu}
//                 className="btn btn-ghost justify-start gap-4 text-lg"
//               >
//                 <ShoppingCart /> Mi Carrito
//               </Link>

//               <Link
//                 to="/Offers"
//                 onClick={closeMenu}
//                 className="btn btn-ghost justify-start gap-4 text-lg"
//               >
//                 <Tag /> Ofertas
//               </Link>
//             </div>
//           )}

//           {/* Info del Dólar en Móvil */}
//           <div className="mt-auto border-t pt-4 text-center text-sm">
//             Tasa del día $:{" "}
//             <span className="font-bold text-base-content">
//               {dolarData ? `${Number(dolarData).toFixed(3)} Bs.` : "N/A"}
//             </span>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }
