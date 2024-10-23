'use client';

import { useUser } from '@/context/user.context'
import Link from 'next/link';
import { Button } from "@/components/ui/button"; 
import { signOut } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading placeholder
  }

  const isEditPage = pathname.endsWith('/edit');

  return (
    <div className="flex justify-between items-center p-4 bg-black text-white">
      <div>
        <Link href={user ? `/${user.user_metadata.display_name}` : '/'} className="text-2xl font-bold">
          MyDevSpace
        </Link>
      </div>

      <div className="flex items-center space-x-4 text-black">
        {user && !isEditPage && (
          <Button asChild variant="outline">
            <Link href={`/${user.user_metadata.display_name}/edit`}>
              Edit
            </Link>
          </Button>
        )}

        {user ? (
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        ) : (
          <Button asChild>
            <Link href="/auth">
              Sign In
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
