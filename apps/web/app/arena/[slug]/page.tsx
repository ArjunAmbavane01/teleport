import { requireAuth } from '@/lib/auth/requireAuth'
import React from 'react'
import ArenaWrapper from './_components/ArenaWrapper';
import { getArenaIdFromSlug } from '@/actions/arenaActions';

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const user = await requireAuth();
  const { slug } = await params;
  const res = await getArenaIdFromSlug(slug);
  if (!res) return <div>Arena not found</div>
  return (<ArenaWrapper userId={user.id as string} arenaId={res.id} />)
}

export default page
