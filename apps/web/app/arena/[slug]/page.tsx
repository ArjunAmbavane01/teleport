import { requireAuth } from '@/lib/auth/requireAuth'
import { getArenaIdFromSlug } from '@/actions/arenaActions';
import { createWsToken } from '@workspace/common/utils/jwt';
import ArenaWrapper from './_components/ArenaWrapper';

interface PageProps { params: Promise<{ slug: string }> }

const Page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const user = await requireAuth();
  const { slug } = await params;
  const res = await getArenaIdFromSlug(slug);
  if (!res) return <div>Arena not found</div>

  const wsToken = createWsToken(user.id as string, res.id);
  if (!wsToken) return <div>Some Internal Error Occurred</div>

  return (<ArenaWrapper wsToken={wsToken} />)
}

export default Page;
