// import React from 'react'
// import Image from 'next/image'
// import { Button } from "@/components/ui/button"

// interface NavBarProps {
//   onLoginClick: () => void;
// }

// export default function NavBar({ onLoginClick }: NavBarProps = { onLoginClick: () => {} }) {
//   return (
//     <nav className="bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex-shrink-0 flex items-center">
//             <Image
//               src="/logo-placeholder.svg"
//               alt="Logo"
//               width={40}
//               height={40}
//               className="h-8 w-auto"
//             />
//             <span className="ml-2 text-xl font-semibold text-gray-900">Your Company</span>
//           </div>
//           <div className="flex items-center">
//             <Button onClick={onLoginClick} className="ml-4">
//               Login
//             </Button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }